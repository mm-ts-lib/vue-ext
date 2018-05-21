"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const _d = debug_1.default('@serverAddress');
function getServer() {
    let _server = '';
    // 首先检测是否定义localstrage
    const localServer = localStorage.getItem('server');
    if (localServer) {
        _server = localServer;
        _d('using local server:', _server);
        return;
    }
    // 检测是否为本机地址或者IP，直接访问本机作为服务器
    if (location.hostname.match(/^\d+?\.\d+?\.\d+?\.\d+?$/)) {
        _server = `${location.protocol}//${location.host}`;
        _d('using ip server:', _server);
        return;
    }
    // 检测是否为本机地址或者IP，直接访问本机作为服务器
    if (location.hostname.match(/^localhost$/)) {
        _server = `${location.protocol}//${location.host}`;
        _d('using localhost server:', _server);
        return;
    }
    // 否则返回api.域名
    _server = `${location.protocol}//api.${location.host}`;
    _d('using api server: ', _server);
    return _server;
}
exports.serverAddress = getServer();
//# sourceMappingURL=serverAddress.js.map