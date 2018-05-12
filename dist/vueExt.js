"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
const vuex_1 = __importDefault(require("vuex"));
const debug_1 = __importDefault(require("debug"));
const _d = debug_1.default('app:vueExt');
// 挂载vue store 扩展
vue_1.default.use(vuex_1.default);
_d('init vueExt...');
// 初始化全局store
exports.store = new vuex_1.default.Store({
    state: {
        router: {
            module: '',
            page: '',
        },
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
        setRouter(state, value) {
            state.router = value;
        },
        registerPage(state, value) {
            state.modules;
        },
    }
});
// 初始化
vue_1.default.extendVue = function (options) {
    // 如果option中有page选项，则注册为page，否则注册为component
    const VueExt = vue_1.default.extend(options);
    if (options) {
        if (options.page) {
            console.log('----', options.page);
        }
        else {
            exports.store.commit(`${options.module}/registerComponent`, VueExt);
        }
    }
    return VueExt;
};
// const abc = new VueX();
// 创建自动销毁的定时器组件
vue_1.default.use({
    install(Vue) {
        // console.warn('INIT VUE PLUGIN TIMER');
        // 3. 注入组件
        Vue.mixin({
            data: function () {
                return {
                    _timerId: -1,
                    _timerCounter: 0,
                };
            },
            created: function () {
                const _this = this;
                if (_this.$options && _this.$options.onTimer) {
                    // debugger;
                    const timerFunc = _this.$options.onTimer.bind(_this);
                    // 初始化运行一次，每秒执行一次
                    timerFunc();
                    _this.$data._timerId = setInterval(() => {
                        timerFunc();
                    }, 1000);
                    _d('SET Vue Timer', _this.$data._timerId);
                }
            },
            destroyed: function () {
                const _this = this;
                if (_this.$data._timerId >= 0) {
                    clearInterval(_this.$data._timerId);
                    _d('Clear Vue Timer:', _this.$data._timerId);
                }
            }
        });
    }
});
;
exports.default = vue_1.default;
//# sourceMappingURL=vueExt.js.map