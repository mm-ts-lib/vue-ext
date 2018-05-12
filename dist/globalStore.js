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
        login: {},
        modules: {} // 已加载的组件列表
    },
    mutations: {
        login(state, value) {
            state.login = value;
        },
        logout(state) {
            state.login = {};
        },
        registerVueComponents(state, value) {
            if (lodash_1.default.isEmpty(state.modules[value.module])) {
                //初始化创建组件信息
                state.modules[value.module] = { pages: {}, components: {} };
            }
            if (lodash_1.default.isEmpty(value.name)) {
                _d("global store: registerVueComponents Error,name is empty:", value);
                return;
            }
            // 注册组件
            if (value.page) {
                // 注册为页面组件
                _d("register page:", value.module, value.name);
                state.modules[value.module].pages[value.name] = value.components;
            }
            else {
                // 注册为通用组件
                _d("register components:", value.module, value.name);
                state.modules[value.module].components[value.name] = value.components;
            }
        }
    }
});
//# sourceMappingURL=globalStore.js.map