export declare type DebugModule_T = {
    name: string;
    port: number;
    html: boolean;
    server: boolean;
};
export declare class DebugSessionStorage {
    private _storKey;
    debugModuleList: {
        [k: string]: DebugModule_T;
    };
    portMap: {
        [k: number]: DebugModule_T;
    };
    nameMap: {
        [k: string]: DebugModule_T;
    };
    constructor();
    private _makeMap;
    private _read;
    findDebugModuleByName(moduleName: string): DebugModule_T;
    findDebugModuleByPort(port: number): DebugModule_T;
}
declare const _default: DebugSessionStorage;
export default _default;
