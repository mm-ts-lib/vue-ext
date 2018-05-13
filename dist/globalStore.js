"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
const vuex_1 = __importDefault(require("vuex"));
const lodash_1 = __importDefault(require("lodash"));
const debug_1 = __importDefault(require("debug"));
const _d = debug_1.default("app:globalStore");
// 挂载vue store 扩展
vue_1.default.use(vuex_1.default);
// 初始化全局store
exports.store = new vuex_1.default.Store({
    state: {
        entry: "pc",
        moduleRegister: {} // 已加载的组件列表
    },
    mutations: {
        setEntry(state, value) {
            state.entry = value;
        },
        registerModule(state, modInfo) {
            // 转换大小写
            modInfo.name = lodash_1.default.camelCase(modInfo.name);
            modInfo.pages = modInfo.pages || {};
            modInfo.components = modInfo.components || {};
            state.moduleRegister[modInfo.name] = modInfo;
        },
        registerVueComponents(state, value) {
            const mod = lodash_1.default.camelCase(value.module);
            const pg = lodash_1.default.camelCase(value.name);
            if (lodash_1.default.isEmpty(state.moduleRegister[mod])) {
                //初始化创建组件信息
                _d("Invalid or Unregister Module:", mod);
                return;
            }
            if (lodash_1.default.isEmpty(pg)) {
                _d("registerVueComponents Error,name is empty:", pg);
                return;
            }
            // 注册组件
            if (value.page) {
                // 注册为页面组件
                _d("register page:", mod, pg);
                state.moduleRegister[mod].pages[pg] = value;
            }
            else {
                // 注册为通用组件
                _d("register components:", mod, pg);
                state.moduleRegister[mod].components[pg] = value;
            }
        }
    }
});
// 设置全局对象
const w = window;
w.__global_store = exports.store;
//# sourceMappingURL=globalStore.js.map