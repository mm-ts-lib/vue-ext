"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
const vuex_1 = __importDefault(require("vuex"));
const lodash_1 = __importDefault(require("lodash"));
const debug_1 = __importDefault(require("debug"));
const _d = debug_1.default('app:globalStore');
// 挂载vue store 扩展
vue_1.default.use(vuex_1.default);
// 初始化全局store
exports.store = new vuex_1.default.Store({
    state: {
        moduleList: {},
    },
    mutations: {
        registerModule(state, modInfo) {
            const m = {};
            m[modInfo.name] = modInfo;
            state.moduleList = Object.assign(m, modInfo);
        },
        registerVueComponents(state, value) {
            // 获取实例名称
            const mod = state.moduleList[value.module];
            if (lodash_1.default.isEmpty(mod)) {
                //初始化创建组件信息
                _d('Invalid Module for registerVueComponents:', value);
                return;
            }
            const pageName = value.vueClass.options.name;
            if (lodash_1.default.isEmpty(pageName)) {
                _d('registerVueComponents ,No Define Page Name:', value);
                return;
            }
            const page = mod.pages[pageName];
            if (lodash_1.default.isEmpty(page)) {
                _d('registerVueComponents ,not defined Page:', pageName);
                return;
            }
            // 注册组件
            mod.components = mod.components || {};
            mod.components[pageName] = value.vueClass;
            _d('register Vue components successed:', value.module, pageName);
            // 强制进行变更
            state.moduleList = Object.assign({}, state.moduleList);
        },
    },
});
// 设置全局对象
const w = window;
w.__global_store = exports.store;
//# sourceMappingURL=globalStore.js.map