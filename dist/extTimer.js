"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
const debug_1 = __importDefault(require("debug"));
const _d = debug_1.default("app:globalStore");
// 创建自动销毁的定时器组件
vue_1.default.use({
    install(Vue) {
        // console.warn('INIT VUE PLUGIN TIMER');
        // 3. 注入组件
        Vue.mixin({
            data: function () {
                return {
                    _timerId: -1,
                    $timerCounter: 0 // 定时器执行计数器
                };
            },
            created: function () {
                const _this = this;
                _this.$timerCounter = _this.$data.$timerCounter;
                if (_this.$options && _this.$options.onTimer) {
                    const timerFunc = _this.$options.onTimer.bind(_this);
                    // 初始化运行一次，每秒执行一次
                    timerFunc();
                    //计算
                    const interval = _this.$options.timerInterval
                        ? _this.$options.timerInterval
                        : 1000;
                    // 设置超时
                    _this.$data._timerId = setInterval(() => {
                        timerFunc();
                    }, interval);
                    _d("SET Vue Timer", _this.$data._timerId);
                }
            },
            destroyed: function () {
                const _this = this;
                if (_this.$data._timerId >= 0) {
                    clearInterval(_this.$data._timerId);
                    _d("Clear Vue Timer:", _this.$data._timerId);
                }
            }
        });
    }
});
//# sourceMappingURL=extTimer.js.map