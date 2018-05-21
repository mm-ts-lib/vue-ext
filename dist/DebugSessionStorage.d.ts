export interface ISessionStoreDebugModule {
    [key: string]: number;
}
export declare class DebugSessionStorage {
    private _key;
    constructor(key: string);
    private _read();
    setDebugModulePort(moduleName: string, localPort: number): void;
    getDebugModulePort(moduleName: string): number;
}
declare const _default: DebugSessionStorage;
export default _default;
