import debug from 'debug';
import _ from 'lodash';
const _d = debug('@developDebugger');

export type DebugModule_T = {
  // name
  name: string;
  // 调试端口
  port: number;
  // 是否打开html调试
  html: boolean;
  // 是否打开服务端调试
  server: boolean;
};

export class DebugSessionStorage {
  private _storKey = 'debugModules';

  public debugModuleList = [] as DebugModule_T[];
  public portMap = {} as { [k: number]: DebugModule_T };
  public nameMap = {} as { [k: string]: DebugModule_T };

  constructor() {
    this._read();
    this._makeMap();
  }
  private _makeMap() {
    this.portMap = _.keyBy(this.debugModuleList, 'port');
    this.nameMap = _.keyBy(this.debugModuleList, 'modName');
  }
  private _read() {
    try {
      const str = sessionStorage.getItem(this._storKey);
      if (!str) {
        return [];
      }
      this.debugModuleList = JSON.parse(str);
    } catch (e) {
      this.debugModuleList = [];
      _d('sessionStorage.debugModules Invalid,reset to {}');
    }
  }
  // setDebugModulePort(moduleName: string, localPort: number) {
  //   const debugModules = this._read();
  //   debugModules[moduleName] = { port: localPort, html: false, server: false };
  //   sessionStorage.setItem(this._storKey, JSON.stringify(debugModules));
  // }
  findDebugModuleByName(moduleName: string) {
    return this.nameMap[moduleName];
  }
  findDebugModuleByPort(port: number) {
    return this.portMap[port];
  }
}

export default new DebugSessionStorage();
