declare const glaucoma_risk_quiz_engine: glaucoma_risk_quiz_engine.glaucoma_risk_quiz_engine;

declare module glaucoma_risk_quiz_engine {
    export interface glaucoma_risk_quiz_engine {
        in_range(range: string, num: number);
        risk_from_study(risk_json: IRiskJson, input: IInput);
    }

    export interface IInput {
        study: 'framingham'|'olmsted'|'barbados';
        age: number;
        gender?: string;
        _meta?: string[];
        _extra?: any[];
    }

    export interface IRiskJson {
        default_expr: {},
        studies: {
            olmsted: IOlmsted,
            framingham: IFramingham,
            barbados: IBarbados;
        }
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
