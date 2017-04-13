declare const glaucoma_risk_quiz_engine: glaucoma_risk_quiz_engine.glaucoma_risk_quiz_engine;

/* tslint:disable:no-namespace no-internal-module */
declare module glaucoma_risk_quiz_engine {
    /* tslint:disable:interface-name class-name */
    export interface glaucoma_risk_quiz_engine {
        risk_json: IRiskJson;
        in_range(range: string, num: number): boolean;
        risk_from_study(risk_json: IRiskJson, input: IInput): number;
        risks_from_study(risk_json: IRiskJson, input: IInput): number[];
        familial_risks_from_study(risk_json: IRiskJson, input: IInput, warn: boolean): number[];
        combined_risk(familial_risks_from_study_l: number[], risk_from_study: number): number;
        list_ethnicities(risk_json: IRiskJson): DictOfStringArray;
        ethnicities_pretty(ethnicities: DictOfStringArray | any);
        place_in_array(entry: any, a: any[]): number;
        s_col_to_s(s: string): string;
        pos_in_range(ranges: string[], num: number): number;
    }

    export interface DictOfStringArray {
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
            from_study: string,
            sibling_pc: number,
            parents_pc: number,
            ref: Array<{}>
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
}

export = glaucoma_risk_quiz_engine;
