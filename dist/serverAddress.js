"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const DebugSessionStorage_1 = __importDefault(require("./DebugSessionStorage"));
const _d = debug_1.default('@serverAddress');
function serverAddress(moduleName) {
    // 检测是否在调试组件里
    if (moduleName) {
        const port = DebugSessionStorage_1.default.getDebugModulePort(moduleName);
        if (port) {
            return `http://localhost:${port}`;
        }
    }
    // 首先检测是否定义localstrage
    const localServer = localStorage.getItem('server');
    if (localServer) {
        _d('using local server:', localServer);
        return localServer;
    }
    // 检测是否为本机地址或者IP，直接访问本机作为服务器
    if (location.hostname.match(/^\d+?\.\d+?\.\d+?\.\d+?$/)) {
        const ipServer = `${location.protocol}//${location.host}`;
        _d('using ip server:', ipServer);
        return ipServer;
    }
    // 检测是否为本机地址或者IP，直接访问本机作为服务器
    if (location.hostname.match(/^localhost$/)) {
        const localhost = `${location.protocol}//${location.host}`;
        _d('using localhost server:', localhost);
        return localhost;
    }
    // 否则返回api.域名
    const apiServer = `${location.protocol}//api.${location.host}`;
    _d('using api server: ', apiServer);
    return apiServer;
}
exports.serverAddress = serverAddress;
//# sourceMappingURL=serverAddress.js.map