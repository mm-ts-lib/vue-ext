export interface ILoadOptions {
    async?: boolean;
    attrs?: {
        [k: string]: string;
    };
    charset?: string;
    text?: string;
    type?: string;
}
export declare type LOAD_CALLBACK_T = (err: Error | null, script: HTMLScriptElement) => any;
export declare function loadScript(src: string, opts: ILoadOptions | LOAD_CALLBACK_T, cb?: LOAD_CALLBACK_T): void;
export interface ILoadScriptPromise {
    (url: string): Promise<HTMLScriptElement>;
}
declare const _default: ILoadScriptPromise;
export default _default;
