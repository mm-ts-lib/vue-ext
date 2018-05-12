"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
const debug_1 = __importDefault(require("debug"));
const _d = debug_1.default("app:vueExt");
// 初始化store
const globalStore_1 = require("./globalStore");
var globalStore_2 = require("./globalStore");
exports.store = globalStore_2.store;
_d("init vueExt...");
// 初始化定时器
require("./extTimer");
// 初始化vue扩展
vue_1.default.extendVue = function (options) {
    // 如果option中有page选项，则注册为page，否则注册为component
    const VueExt = vue_1.default.extend(options);
    if (options) {
        globalStore_1.store.commit(`registerVueComponents`, {
            module: options.module,
            name: options.name,
            components: options.components,
            page: options.page
        });
    }
    return VueExt;
};
exports.default = vue_1.default;
//# sourceMappingURL=vueExt.js.map