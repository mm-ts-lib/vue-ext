// 自动设置后台服务器地址：
// 如果是本机地址：localhost，则后台服务器设定同一地址
// 如果是IP，则设定为同一地址
// 如果是域名，则设定为域名前缀+api作为后台地址，如：mshow.magic-cloud.cn为访问域名，则后台地址为:mshowapi.magic-cloud.cn
// 如果配置有 localStorage.server 对象，则使用此对象作为后台服务器地址
// 注意：协议总是和当前访问协议一致，如当前为http，则后台也为http，如当前为https，则后台也为https
import _ from 'lodash';
import debug from 'debug';
import debugSessionStorage from './DebugSessionStorage';
const _d = debug('@serverAddress');

export function serverAddress(moduleName?: string) {
  // 检测是否在调试组件里
  if (moduleName) {
    const port = debugSessionStorage.getDebugModulePort(moduleName);
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
