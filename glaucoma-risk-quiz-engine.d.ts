/// <reference types="mathjs" />
import { DictOfStringArray, IInput, IRiskJson } from './glaucoma-risk-quiz-engine';
import MathType = mathjs.MathType;
export interface IObjectCtor extends ObjectConstructor {
    assign(target: any, ...sources: any[]): any;
    values<T>(o: {
        [s: string]: T;
    }): T[];
}
export declare const ethnicities_pretty: (ethnicities: any) => DictOfStringArray;
export declare const s_col_to_s: (s: string) => string;
export declare const in_range: (range: string, num: number) => boolean;
export declare const lowest_range: (ranges: string[]) => number;
export declare const uniq: (a: any[]) => any[];
/* tslint:disable:array-type */
export declare const uniq2: (arr: {}[]) => {}[];
export declare const preprocess_studies: (risk_json: IRiskJson) => IRiskJson;
export declare const sort_ranges: (ranges: string[]) => string[];
export declare const risk_from_study: (risk_json: IRiskJson, input: IInput) => number;
export declare const familial_risks_from_study: (risk_json: IRiskJson, input: IInput, warn?: boolean) => number[];
export declare const combined_risk: (familial_risks_from_study_l: number[], risk_from_studies: number) => MathType;
export declare const risks_from_study: (risk_json: IRiskJson, input: IInput) => number[];
export declare const place_in_array: (entry: any, a: any[]) => number;
export declare const pos_in_range: (ranges: string[], num: number) => number;
export declare const list_ethnicities: (risk_json: IRiskJson) => DictOfStringArray;
