"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const _d = debug_1.default('@developDebugger');
class DebugSessionStorage {
    constructor(key) {
        this._key = key;
    }
    _read() {
        try {
            const str = sessionStorage.getItem(this._key);
            if (!str) {
                return {};
            }
            return JSON.parse(str);
        }
        catch (e) {
            _d('sessionStorage.debugModules Invalid,reset to {}');
            return {};
        }
    }
    setDebugModulePort(moduleName, localPort) {
        const debugModules = this._read();
        debugModules[moduleName] = localPort;
        sessionStorage.setItem(this._key, JSON.stringify(debugModules));
    }
    getDebugModulePort(moduleName) {
        const debugModules = this._read();
        return debugModules[moduleName];
    }
}
exports.DebugSessionStorage = DebugSessionStorage;
exports.default = new DebugSessionStorage('debugModules');
//# sourceMappingURL=DebugSessionStorage.js.map