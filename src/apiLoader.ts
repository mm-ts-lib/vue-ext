// import api from '../api';
import _ from 'lodash';
import debug from 'debug';

import { serverAddress } from './serverAddress';

const _d = debug('app:apiLoader');

export function apiLoader(moduleName: string, api: any) {
  // 加载HttpApi
  for (const name of Object.keys(api)) {
    console.log('load http api:1', name);
    const __api: any = api;
    // 设置 api post 函数
    __api[name] = async (data: any) => {
      const url = `${serverAddress(moduleName)}/api/${_.kebabCase(moduleName)}/${_.kebabCase(name)}`;
      const response = await fetch(url, {
        body: JSON.stringify(data), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, same-origin, *omit
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer' // *client, no-referrer
      });
      if (response.ok) {
        return await response.json();
      }

      const text = await response.text();
      throw new Error(`HTTP API Fail: ${response.status} , ${text}`);
    };
  }
}
