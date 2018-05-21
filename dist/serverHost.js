"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 自动设置后台服务器地址：
// 如果是本机地址：localhost，则后台服务器设定同一地址
// 如果是IP，则设定为同一地址
// 如果是域名，则设定为域名前缀+api作为后台地址，如：mshow.magic-cloud.cn为访问域名，则后台地址为:mshowapi.magic-cloud.cn
// 如果配置有 localStorage.server 对象，则使用此对象作为后台服务器地址
// 注意：协议总是和当前访问协议一致，如当前为http，则后台也为http，如当前为https，则后台也为https
const lodash_1 = __importDefault(require("lodash"));
let serverHost = '';
if (lodash_1.default.isString(localStorage.server) && !lodash_1.default.isEmpty(localStorage.server)) {
    serverHost = `${location.protocol}//${localStorage.server}`;
}
else {
    const m = location.host.match(/^(.+?)\.(.+)$/);
    if (m && m.length === 3) {
        serverHost = `${location.protocol}//${m[1]}api.${m[2]}`;
    }
}
if (lodash_1.default.isEmpty(serverHost)) {
    serverHost = `${location.protocol}//${location.host}`;
}
console.log('server adderss:', serverHost);
exports.default = serverHost;
//# sourceMappingURL=serverHost.js.map