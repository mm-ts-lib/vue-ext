"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
const debug_1 = __importDefault(require("debug"));
const _d = debug_1.default('app:globalStore');
// 创建自动销毁的定时器组件
vue_1.default.use({
    install(Vue) {
        // console.warn('INIT VUE PLUGIN TIMER');
        // 3. 注入组件
        Vue.mixin({
            data: function () {
                return {
                    _runningStatus: false,
                    _timerId: -1,
                    _timerCounter: 0 // 定时器执行计数器
                };
            },
            computed: {
                $timerCounter() {
                    const _this = this;
                    return _this.$data._timerCounter;
                }
            },
            created: async function () {
                const _this = this;
                _this._runningStatus = true;
                if (_this.$options && _this.$options.onTimer) {
                    const timerFunc = _this.$options.onTimer.bind(_this);
                    //计算
                    const interval = _this.$options.timerInterval ? _this.$options.timerInterval : 1000;
                    const _tmpFunc = async () => {
                        // 初始化运行一次，每秒执行一次
                        await timerFunc();
                        // 设置超时 // 防止destroyed之后仍然启动timer
                        if (_this._runningStatus) {
                            _this.$data._timerId = setTimeout(async () => {
                                _this.$data._timerCounter++;
                                await _tmpFunc();
                            }, interval);
                            _d('SET Vue Timer', _this.$data._timerId);
                        }
                    };
                    await _tmpFunc();
                    // 用来显示秒
                    // _this.$data._timerInterval = setInterval(() => {
                    //   _this.$data._timerCounter++;
                    // }, interval);
                }
            },
            destroyed: function () {
                const _this = this;
                _this._runningStatus = false; // 防止destroyed之后仍然启动timer
                if (_this.$data._timerId >= 0) {
                    //   clearInterval(_this.$data._timerId);
                    clearTimeout(_this.$data._timerId);
                    _d('Clear Vue Timer:', _this.$data._timerId);
                }
            }
        });
    }
});
//# sourceMappingURL=extTimer.js.map