import { IBarbados, IInput, IRiskJson } from './glaucoma-risk-quiz-engine';
import { isArray, isNumber } from 'util';

export function in_range(range: string, num: number) {
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

export function risk_from_study(risk_json: IRiskJson, input: IInput) {
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
    return isNumber(out1)? out1: out1[study.expr[0].extract];
}
