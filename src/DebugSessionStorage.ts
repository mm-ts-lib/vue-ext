import debug from 'debug';
const _d = debug('@developDebugger');

export interface ISessionStoreDebugModule {
  [key: string]: number;
}

export class DebugSessionStorage {
  private _key: string;
  constructor(key: string) {
    this._key = key;
  }
  private _read(): ISessionStoreDebugModule {
    try {
      const str = sessionStorage.getItem(this._key);
      if (!str) {
        return {};
      }

      return JSON.parse(str);
    } catch (e) {
      _d('sessionStorage.debugModules Invalid,reset to {}');
      return {};
    }
  }
  setDebugModulePort(moduleName: string, localPort: number) {
    const debugModules = this._read();
    debugModules[moduleName] = localPort;
    sessionStorage.setItem(this._key, JSON.stringify(debugModules));
  }
  getDebugModulePort(moduleName: string) {
    const debugModules = this._read();
    return debugModules[moduleName];
  }
}

export default new DebugSessionStorage('debugModules');
