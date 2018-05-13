import Vue, { VueConstructor } from "vue";
import debug from "debug";
const _d = debug("app:globalStore");

// 创建自动销毁的定时器组件
Vue.use({
  install(Vue) {
    // console.warn('INIT VUE PLUGIN TIMER');
    // 3. 注入组件
    Vue.mixin({
      data: function() {
        return {
          _timerId: -1, // 定时器id
          $timerCounter: 0 // 定时器执行计数器
        };
      },
      created: function() {
        const _this: any = this;
        _this.$timerCounter = _this.$data.$timerCounter;

        if (_this.$options && _this.$options.onTimer) {
          const timerFunc: Function = _this.$options.onTimer.bind(_this);
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
      destroyed: function() {
        const _this: any = this;
        if (_this.$data._timerId >= 0) {
          clearInterval(_this.$data._timerId);
          _d("Clear Vue Timer:", _this.$data._timerId);
        }
      }
    });
  }
});

declare module "vue/types/vue" {
  interface Vue {
    $timerCounter: number;
  }
}
