// 自动设置后台服务器地址：
// 如果是本机地址：localhost，则后台服务器设定同一地址
// 如果是IP，则设定为同一地址
// 如果是域名，则设定为域名前缀+api作为后台地址，如：mshow.magic-cloud.cn为访问域名，则后台地址为:mshowapi.magic-cloud.cn
// 如果配置有 localStorage.server 对象，则使用此对象作为后台服务器地址
// 注意：协议总是和当前访问协议一致，如当前为http，则后台也为http，如当前为https，则后台也为https
import _ from 'lodash';
import debug from 'debug';
import debugSessionStorage from './DebugSessionStorage';
const _d = debug('app:serverAddress');

function getDebugPort() {
  const m = location.pathname.match(/^\/(\d+)\//);
  if (m && m.length === 2) {
    return m[1];
  }
  return null;
}

export function serverAddress(moduleName?: string) {
  // 检测是否为调试组件
  // 检测是否为主页调试模式，即以一个域名是否使用debug
  if (location.hostname.match(/^debug\./)) {
    if (moduleName) {
      const debugModule = debugSessionStorage.findDebugModuleByName(moduleName);
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
