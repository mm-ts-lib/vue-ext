"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
require("vuex");
const debug_1 = __importDefault(require("debug"));
const _d = debug_1.default("app:vueExt");
// 初始化store
const globalStore_1 = require("./globalStore");
var globalStore_2 = require("./globalStore");
exports.store = globalStore_2.store;
// 初始化定时器
require("./extTimer");
_d("init vueExt...");
function _extend(options) {
    const vue = vue_1.default.extend.apply(vue_1.default, arguments);
    if (options && options.module && options.name) {
        globalStore_1.store.commit(`registerVueComponents`, {
            module: options.module,
            name: options.name,
            components: vue,
            page: options.page
        });
    }
    return vue;
}
exports._extend = _extend;
// 初始化vue扩展
vue_1.default.extendVue = _extend;
exports.default = vue_1.default;
//# sourceMappingURL=vueExt.js.map