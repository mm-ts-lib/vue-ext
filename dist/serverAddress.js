"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const DebugSessionStorage_1 = __importDefault(require("./DebugSessionStorage"));
const _d = debug_1.default('app:serverAddress');
function getDebugPort() {
    const m = location.pathname.match(/^\/(\d+)\//);
    if (m && m.length === 2) {
        return m[1];
    }
    return null;
}
function serverAddress(moduleName) {
    // 检测是否为调试组件
    // 检测是否为主页调试模式，即以一个域名是否使用debug
    if (location.hostname.match(/^debug\./)) {
        if (moduleName) {
            const debugModule = DebugSessionStorage_1.default.findDebugModuleByName(moduleName);
            console.log('=================debugModule', debugModule, moduleName);
            if (debugModule && debugModule.server) {
                // 调试模式，所有api请求发送到调试端口映射路径
                return `${location.protocol}//${location.hostname}:${location.port}/${debugModule.port}`;
            }
        }
        // console.log('=================moduleName', moduleName, location.hostname);
        // 调试模式，无端口，所有api请求发送到调试域名服务器
        return `${location.protocol}//${location.hostname}:${location.port}`;
    }
    // 否则返回api.域名
    return `${location.protocol}//api.${location.hostname}:${location.port}`;
}
exports.serverAddress = serverAddress;
//# sourceMappingURL=serverAddress.js.map