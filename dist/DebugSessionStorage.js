"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const lodash_1 = __importDefault(require("lodash"));
const _d = debug_1.default('@developDebugger');
class DebugSessionStorage {
    constructor() {
        this._storKey = 'debugModules';
        this.debugModuleList = [];
        this.portMap = {};
        this.nameMap = {};
        this._read();
        this._makeMap();
    }
    _makeMap() {
        this.portMap = lodash_1.default.keyBy(this.debugModuleList, 'port');
        this.nameMap = lodash_1.default.keyBy(this.debugModuleList, 'modName');
    }
    _read() {
        try {
            const str = sessionStorage.getItem(this._storKey);
            if (!str) {
                return [];
            }
            this.debugModuleList = JSON.parse(str);
        }
        catch (e) {
            this.debugModuleList = [];
            _d('sessionStorage.debugModules Invalid,reset to {}');
        }
    }
    // setDebugModulePort(moduleName: string, localPort: number) {
    //   const debugModules = this._read();
    //   debugModules[moduleName] = { port: localPort, html: false, server: false };
    //   sessionStorage.setItem(this._storKey, JSON.stringify(debugModules));
    // }
    findDebugModuleByName(moduleName) {
        return this.nameMap[moduleName];
    }
    findDebugModuleByPort(port) {
        return this.portMap[port];
    }
}
exports.DebugSessionStorage = DebugSessionStorage;
exports.default = new DebugSessionStorage();
//# sourceMappingURL=DebugSessionStorage.js.map