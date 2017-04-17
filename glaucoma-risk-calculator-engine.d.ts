/// <reference types="mathjs" />

export interface IDictOfStringArray {
    [study: string]: string[];
}

export interface IInput {
    study: 'framingham' | 'olmsted' | 'barbados';
    age: number;
    gender?: string;
    sibling?: boolean;
    parent?: boolean;
    _meta?: string[];
    _extra?: any[];
}

export interface IRiskJson {
    default_expr: {};
    default_family_history: {
        from_study: string;
        sibling_pc: number;
        parents_pc: number;
        ref: Array<{}>;
    };
    studies: {
        olmsted: IOlmsted,
        framingham: IFramingham,
        barbados: IBarbados;
    };
}

interface IStudy {
    n: number;
    ethnicities: string[];
    expr: Array<{
        key: string,
        take: number,
        type?: string,
        filter?: string[],
        extract?: string
    }>;
    ref: Array<{}>;
}

export interface IOlmsted extends IStudy {
    age: { [idx: string]: number };
    agenda?: undefined;
}

export interface IFramingham extends IStudy {
    age: { [idx: string]: number };
    agenda: Array<{
        gender: 'male' | 'female',
        age: string,
        n: number,
        oags: number,
        meth2_prevalence: number;
        meth3_prevalence: number;
    }>;
}

export interface IBarbados extends IStudy {
    normal_tension: boolean;
    agenda: Array<{
        gender: 'male' | 'female',
        age: string,
        'n over n at Risk': string,
        'Incidence, % (95% CI)': string,
        max_incidence: number
    }>;
}

import MathType = mathjs.MathType;
export interface IObjectCtor extends ObjectConstructor {
    assign(target: any, ...sources: any[]): any;
    values<T>(o: {
        [s: string]: T;
    }): T[];
}
export declare const ethnicities_pretty: (ethnicities: any) => any;
export declare const s_col_to_s: (s: string) => string;
export declare const in_range: (range: string, num: number) => boolean;
export declare const lowest_range: (ranges: string[]) => number;
export declare const uniq: (a: any[]) => any[];
export declare const uniq2: (arr: Array<{}>) => Array<{}>;
export declare const preprocess_studies: (risk_json: any) => any;
export declare const sort_ranges: (ranges: string[]) => string[];
export declare const risk_from_study: (risk_json: any, input: any) => number;
export declare const familial_risks_from_study: (risk_json: any, input: any, warn?: boolean) => number[];
export declare const combined_risk: (familial_risks_from_study_l: number[], risk_from_studies: number) => MathType;
export declare const risks_from_study: (risk_json: any, input: any) => number[];
export declare const place_in_array: (entry: any, a: any[]) => number;
export declare const pos_in_range: (ranges: string[], num: number) => number;
export declare const list_ethnicities: (risk_json: any) => any;
