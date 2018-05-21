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
        user: {},
        moduleList: {},
    },
    mutations: {
        /**
         * 更新当前用户信息
         * @param state
         * @param value
         */
        updateUser(state, value) {
            state.user = value;
        },
        registerModule(state, modInfo) {
            const m = {};
            m[modInfo.name] = modInfo;
            state.moduleList = Object.assign({}, state.moduleList, m);
        },
        registerVueComponents(state, value) {
            // 获取实例名称
            const mod = state.moduleList[value.module];
            if (lodash_1.default.isEmpty(mod)) {
                //初始化创建组件信息
                _d('Invalid Module for registerVueComponents:', value);
                return;
            }
            const modName = value.vueClass.options.name;
            if (lodash_1.default.isEmpty(modName)) {
                _d('registerVueComponents ,No Define Page Name:', value);
                return;
            }
            const page = mod.pages[modName];
            if (lodash_1.default.isEmpty(page)) {
                _d('registerVueComponents ,as components', modName);
            }
            else {
                _d('registerVueComponents ,as page', modName);
            }
            // 注册组件
            mod.components = mod.components || {};
            mod.components[modName] = value.vueClass;
            _d('register Vue components successed:', value.module, modName);
            // 强制进行变更
            state.moduleList = Object.assign({}, state.moduleList);
        },
    },
});
// 设置全局对象
const w = window;
w.__global_store = exports.store;
//# sourceMappingURL=globalStore.js.map