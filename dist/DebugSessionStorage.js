"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const lodash_1 = __importDefault(require("lodash"));
const _d = debug_1.default('app:developDebugger');
class DebugSessionStorage {
    constructor() {
        this._storKey = 'debugModules';
        //   public debugModuleList = [] as DebugModule_T[];
        this.debugModuleList = {};
        this.portMap = {};
        this.nameMap = {};
        this._read();
        this._makeMap();
    }
    _makeMap() {
        this.portMap = lodash_1.default.keyBy(this.debugModuleList, 'port');
        // this.nameMap = _.keyBy(this.debugModuleList, 'modName');
        this.nameMap = this.debugModuleList;
    }
    _read() {
        try {
            const str = sessionStorage.getItem(this._storKey);
            //   console.log('====1111111', str, this._storKey, sessionStorage);
            if (!str) {
                return [];
            }
            this.debugModuleList = JSON.parse(str);
            //   console.log('====2222222222', this.debugModuleList);
        }
        catch (e) {
            //   this.debugModuleList = [];
            this.debugModuleList = {};
            _d('sessionStorage.debugModules Invalid,reset to {}');
        }
    }
    // setDebugModulePort(moduleName: string, localPort: number) {
    //   const debugModules = this._read();
    //   debugModules[moduleName] = { port: localPort, html: false, server: false };
    //   sessionStorage.setItem(this._storKey, JSON.stringify(debugModules));
    // }
    findDebugModuleByName(moduleName) {
        console.log('====findDebugModuleByName', this.nameMap);
        return this.nameMap[moduleName];
    }
    findDebugModuleByPort(port) {
        return this.portMap[port];
    }
}
exports.DebugSessionStorage = DebugSessionStorage;
exports.default = new DebugSessionStorage();
//# sourceMappingURL=DebugSessionStorage.js.map