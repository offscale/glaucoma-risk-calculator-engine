import { isArray, isNullOrUndefined, isNumber } from 'util';
import { exists, readFile, writeFile } from 'fs';
import { DictOfStringArray, IBarbados, IInput, IRiskJson } from './glaucoma-risk-quiz-engine';
import * as assert from 'assert';

export interface IObjectCtor extends ObjectConstructor {
    assign(target: any, ...sources: any[]): any;
    values<T>(o: { [s: string]: T }): T[];
}

declare const Object: IObjectCtor;

interface Array<T> extends ArrayConstructor {
    find(predicate: (search: T) => boolean): T;
}

export function ethnicities_pretty(ethnicities: DictOfStringArray | any): DictOfStringArray {
    return ethnicities.map(study =>
        (study_name => `${study_name}: ${study[study_name].join(', ')}`)(Object.keys(study)[0])
    );
}

export function s_col_to_s(s: string): string {
    return s.slice(0, s.indexOf(':'));
}

export function in_range(range: string, num: number): boolean {
    if (range === 'all' || range[0] === '_') return false;
    const dash = range.indexOf('-');

    if (dash !== -1)
        return num >= parseInt(range.slice(0, dash - range.length)) && num <= parseInt(range.slice(-dash));

    let last = range.slice(-2);
    if (!isNaN(parseInt(last[0]))) last = last[1];

    if (isNaN(parseInt(last))) {
        const rest = parseInt(range);
        const operators = Object.freeze({
            '>': num > rest,
            '+': num >= rest,
            '>=': num >= rest,
            '=>': num >= rest
        });
        if (Object.keys(operators).indexOf(last) === -1)
            throw TypeError(`Invalid operation of \`${last}\``);
        return operators[last];
    }
    const op = range.slice(0, 2), rest = parseInt(range.slice(2));

    if (op === '<=' || op === '=<')
        return num <= rest;
    else if (op[0] === '<')
        return num < parseInt(range.slice(1));
    else if (op === '>=' || op === '=>')
        return num >= rest;

    return <any>range === num;
}

export function lowest_range(ranges: string[]): number {
    return ranges.reduce((prevNum: number, currentValue: string): number => {
        const curNum: number = parseInt(currentValue);
        return curNum < prevNum ? curNum : prevNum;
    }, 100);
}

export function uniq(a: any[]): any[] {
    const seen = {};
    return a.filter(function (item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    }).filter(k => k !== undefined);
}

export function uniq2(arr: {}[]): {}[] {
    const keys = arr.length === 0 ? [] : Object.keys(arr[0]);
    const seen = new Map();
    arr.forEach((a) => {
        const key = keys.map(k => a[k]).join('|');
        if (!seen.has(key))
            seen.set(key, a);
    });
    return Array.from(seen.values());
}

export function preprocess_studies(risk_json: IRiskJson): IRiskJson {
    /* Preprocesses studies in risk_json.
     *
     * Currently:
     *  - Sorts ages and assigns a lower bound equal to the next lowest bound (if lower bound not present)
     */
    Object.keys(risk_json.studies).forEach(study_name => {
        if (risk_json.studies[study_name].hasOwnProperty('age')) {
            const sr: string[] = sort_ranges(Object.keys(risk_json.studies[study_name].age));

            // Lower bound
            if (sr[0][0] !== '<') {
                const lt = `<${parseInt(sr[0])}`;
                risk_json.studies[study_name].age = Object.assign(
                    {[lt]: risk_json.studies[study_name].age[sr[0]]},
                    risk_json.studies[study_name].age
                );
            }

            // Upper bound
            if (['>', '+'].indexOf(sr[sr.length - 1][0].slice(-1)) === -1) {
                const top_bars = sr.map(r => [parseInt(r.indexOf('-') === -1 ? r : r.split('-')[1]), r]).filter(
                    (n: [number, string]) => !isNaN(n[0])).sort();
                const top_bar: [number, string] = top_bars[top_bars.length - 1] as [number, string];
                if (['>', '+'].indexOf(top_bar[1].slice(-1)) === -1)
                    risk_json.studies[study_name].age[`${top_bar}+`] = risk_json.studies[study_name].age[top_bar[1]];
            }
        }

        if (risk_json.studies[study_name].hasOwnProperty('agenda')) {
            const all_genders_seen: string[] = uniq(risk_json.studies[study_name].agenda.map(
                agenda => agenda.gender
            ));

            let gendersAssigned: number = 0;
            all_genders_seen.forEach(gender => {
                const sr: string[] = sort_ranges(risk_json.studies[study_name].agenda.filter(agenda =>
                    agenda.gender === gender
                ).map(agenda => agenda.age)) as any;

                if (sr.length) {
                    // Lower bound
                    const lowest_bar: string = sr.find(
                        o => ['=<', '<='].indexOf(o.slice(0, 2)) === -1 && ['<', '>'].indexOf(o[0][0]) === -1
                    );
                    gendersAssigned++;

                    const lt = parseInt(lowest_bar);
                    assert(!isNaN(lt), `${lowest_bar} unexpectedly pareses to NaN`);
                    risk_json.studies[study_name].agenda.unshift(
                        Object.assign({},
                            risk_json.studies[study_name].agenda.filter(
                                agenda => agenda.age === lowest_bar && agenda.gender === gender)[0],
                            {age: `<${lt}`}
                        )
                    );

                    // Upper bound
                    const top_bars = sr.map(r => [parseInt(r.indexOf('-') === -1 ? r : r.split('-')[1]), r]).filter(
                        (n: [number, string]) => !isNaN(n[0])).sort();
                    const top_bar = top_bars[top_bars.length - 1];
                    if (top_bar)
                        risk_json.studies[study_name].agenda.push(
                            risk_json.studies[study_name].agenda.filter(
                                agenda => agenda.age === top_bar[1] && agenda.gender === gender
                            ).map(o => Object.assign({}, o, {age: `${top_bar[0]}+`}))[0]
                        )
                }
            });
            assert.equal(gendersAssigned, all_genders_seen.length, 'Genders assigned != all genders');

            risk_json.studies[study_name].agenda = uniq2(risk_json.studies[study_name].agenda);
        }
    });

    return risk_json;
}

export function sort_ranges(ranges: string[]): string[] {
    const collator = new Intl.Collator(undefined, {
        numeric: true,
        sensitivity: 'base',
        ignorePunctuation: true
    });
    return ranges.sort((a: string, b: string): number =>
        a[0] === '>' && !isNaN(parseInt(b[0])) ? 1 : collator.compare(a, b)
    );
}

function ensure_map(k): boolean {
    if (k === 'map') return true;
    throw TypeError(`Expected map, got ${k}`)
}

export function risk_from_study(risk_json: IRiskJson, input: IInput): number {
    if (isNullOrUndefined(risk_json)) throw TypeError('`risk_json` must be defined');
    else if (isNullOrUndefined(input)) throw TypeError('`input` must be defined');

    preprocess_studies(risk_json);
    const study: IBarbados = risk_json.studies[input.study] as IBarbados;
    const study_vals = study[study.expr[0].key];

    const out = isArray(study_vals) ? study_vals.filter(o =>
        study.expr[0].filter.every(k =>
            k === 'age' ? in_range(o.age, input.age) : input.hasOwnProperty(k) ? o[k] === input[k] : true
        )
    )[study.expr[0].take > 0 ? study.expr[0].take - 1 : 0]
        : study_vals[ensure_map(study.expr[0].type) && Object.keys(study_vals).filter(k =>
            in_range(k, input[study.expr[0].key])
        )[study.expr[0].take - 1]];

    if (!out) throw TypeError('Expected out to match something');
    return isNumber(out) ? out : out[study.expr[0].extract];
}

export function risks_from_study(risk_json: IRiskJson, input: IInput): number[] {
    if (isNullOrUndefined(risk_json)) throw TypeError('`risk_json` must be defined');
    else if (isNullOrUndefined(input)) throw TypeError('`input` must be defined');

    preprocess_studies(risk_json);
    const study: IBarbados = risk_json.studies[input.study] as IBarbados;
    const study_vals = study[study.expr[0].key];

    const out = isArray(study_vals) ?
        study_vals.filter(o => input.gender ? o.gender === input.gender : true).map(o => o[study.expr[0].extract])
        : ensure_map(study.expr[0].type) && Object.keys(study_vals).filter(
            k => ['a', '_'].indexOf(k[0]) === -1).map(k => study_vals[k]);

    if (!out) throw TypeError('Expected out to match something');
    return uniq(out);
}

export function place_in_array(entry: any, a: any[]): number {
    if (isNullOrUndefined(entry)) throw TypeError('`entry` must be defined');
    else if (isNullOrUndefined(a)) throw TypeError('`a` must be defined');

    const sortedA = a.sort();
    for (let i = 0; i < sortedA.length; i++)
        if (sortedA[i] === entry) return i;
    return -1;
}

export function list_ethnicities(risk_json: IRiskJson): DictOfStringArray {
    if (isNullOrUndefined(risk_json)) throw TypeError('`risk_json` must be defined');
    return <any>Object.keys(risk_json.studies).map(k => {
        return {[k]: risk_json.studies[k].ethnicities}
    });
}

if (require.main === module) {
    exists('./risk.json', fs_exists => {
        console.error(`fs_exists = ${fs_exists}`);
        writeFile("/tmp/a.txt", `fs_exists = ${fs_exists}`, err => {
            if (err) throw err;
            console.info('saved');
            readFile('./risk.json', 'utf8', (err, data) => {
                if (err) throw err;
                console.info(data)
            })
            //fs_exists && console.info(JSON.stringify(require('./risk'), null, '\t'))
        });
    });
}
