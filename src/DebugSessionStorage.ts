import debug from 'debug';
import _ from 'lodash';
const _d = debug('app:developDebugger');

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

  //   public debugModuleList = [] as DebugModule_T[];
  public debugModuleList = {} as { [k: string]: DebugModule_T };
  public portMap = {} as { [k: number]: DebugModule_T };
  public nameMap = {} as { [k: string]: DebugModule_T };

  constructor() {
    this._read();
    this._makeMap();
  }
  private _makeMap() {
    this.portMap = _.keyBy(this.debugModuleList, 'port');
    // this.nameMap = _.keyBy(this.debugModuleList, 'modName');
    this.nameMap = this.debugModuleList;
  }
  private _read() {
    try {
      const str = sessionStorage.getItem(this._storKey);
      //   console.log('====1111111', str, this._storKey, sessionStorage);
      if (!str) {
        return [];
      }
      this.debugModuleList = JSON.parse(str);
      //   console.log('====2222222222', this.debugModuleList);
    } catch (e) {
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
  findDebugModuleByName(moduleName: string) {
    console.log('====findDebugModuleByName', this.nameMap);
    return this.nameMap[moduleName];
  }
  findDebugModuleByPort(port: number) {
    return this.portMap[port];
  }
}

export default new DebugSessionStorage();
