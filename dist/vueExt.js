"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
const debug_1 = __importDefault(require("debug"));
const _d = debug_1.default('app:vueExt');
_d('init vueExt...');
// 初始化store
const globalStore_1 = require("./globalStore");
// 初始化定时器
require("./extTimer");
// 扩展任务组件属性
require("./extTaskCmpt");
// 导出全局store
var globalStore_2 = require("./globalStore");
exports.store = globalStore_2.store;
var DebugSessionStorage_1 = require("./DebugSessionStorage");
exports.debugSessionStorage = DebugSessionStorage_1.default;
var serverAddress_1 = require("./serverAddress");
exports.serverAddress = serverAddress_1.serverAddress;
var apiLoader_1 = require("./apiLoader");
exports.apiLoader = apiLoader_1.apiLoader;
// 导出Vue对象
exports.Vue = vue_1.default;
// 返回Vue创建工厂函数
function extendVue(module, vueClass) {
    const v = vueClass;
    if (v.options && v.name) {
        globalStore_1.store.commit(`registerVueComponents`, {
            module,
            vueClass
        });
    }
    return vueClass;
}
exports.extendVue = extendVue;
//# sourceMappingURL=vueExt.js.map