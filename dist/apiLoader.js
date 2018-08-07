"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import api from '../api';
const lodash_1 = __importDefault(require("lodash"));
const debug_1 = __importDefault(require("debug"));
const serverAddress_1 = require("./serverAddress");
const _d = debug_1.default('app:apiLoader');
function apiLoader(moduleName, api) {
    // 加载HttpApi
    for (const name of Object.keys(api)) {
        console.log('load http api:1', name);
        const __api = api;
        // 设置 api post 函数
        __api[name] = async (data) => {
            const url = `${serverAddress_1.serverAddress(moduleName)}/api/${lodash_1.default.kebabCase(moduleName)}/${lodash_1.default.kebabCase(name)}`;
            const response = await fetch(url, {
                body: JSON.stringify(data),
                cache: 'no-cache',
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST',
                mode: 'cors',
                redirect: 'follow',
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
exports.apiLoader = apiLoader;
//# sourceMappingURL=apiLoader.js.map