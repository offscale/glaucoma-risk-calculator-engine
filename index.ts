import { isArray, isNullOrUndefined, isNumber } from 'util';
import { exists, readFile, writeFile } from 'fs';
import { DictOfStringArray, IBarbados, IInput, IRiskJson } from './glaucoma-risk-quiz-engine';

export function ethnicities_pretty(ethnicities: DictOfStringArray | any) {
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
        const options = {
            '>': num > rest,
            '+': num >= rest,
            '>=': num >= rest,
            '=>': num >= rest,
        };
        if (Object.keys(options).indexOf(last) === -1)
            throw TypeError(`Invalid operation of \`${last}\``);
        return options[last];
    }
    return <any>range == num;
}

export function risk_from_study(risk_json: IRiskJson, input: IInput): number {
    if (isNullOrUndefined(risk_json)) throw TypeError('`risk_json` must be defined');
    else if (isNullOrUndefined(input)) throw TypeError('`input` must be defined');

    function ensure_map(k): boolean {
        if (k === 'map') return true;
        throw TypeError(`Expected map, got ${k}`)
    }

    const study: IBarbados = risk_json.studies[input.study] as IBarbados;
    const out0 = study[study.expr[0].key];

    const out1 = isArray(out0) ? out0.filter(o =>
        study.expr[0].filter.every(k =>
            k === 'age' ? in_range(o.age, input[k]) : o[k] === input[k]
        )
    )[study.expr[0].take - 1] :
        out0[ensure_map(study.expr[0].type) && Object.keys(out0).filter(k =>
            in_range(k, input[study.expr[0].key]))[study.expr[0].take - 1]];
    if (!out1) throw TypeError('Expected out to match something');
    return isNumber(out1) ? out1 : out1[study.expr[0].extract];
}

export function risks_from_study(risk_json: IRiskJson, study: string): number[] {
    if (isNullOrUndefined(risk_json)) throw TypeError('`risk_json` must be defined');
    else if (isNullOrUndefined(study)) throw TypeError('`study` must be defined');

    function ensure_map(k): boolean {
        if (k === 'map') return true;
        throw TypeError(`Expected map, got ${k}`)
    }

    const study_: IBarbados = risk_json.studies[study] as IBarbados;
    const out0 = study_[study_.expr[0].key];
    return out0.map(k => k[study_.expr[0].extract]).filter(k => !isNullOrUndefined(k));
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
