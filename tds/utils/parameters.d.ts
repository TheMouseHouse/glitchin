export declare type Parameter = {
    r?: number;
    g?: number;
    b?: number;
    a?: number;
};
export default class Parameters {
    static createRgbParameters(range?: number): Parameter;
    static hasRgbParameter(offset?: Parameter): boolean;
}
