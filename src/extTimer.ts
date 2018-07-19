import Vue, { VueConstructor } from 'vue';
import debug from 'debug';
const _d = debug('app:globalStore');

// 创建自动销毁的定时器组件
Vue.use({
  install(Vue) {
    // console.warn('INIT VUE PLUGIN TIMER');
    // 3. 注入组件
    Vue.mixin({
      data: function() {
        return {
          _runningStatus: false, // 当前页面运行状态，防止重复加载loading页时，关闭上一个页面时，正在await中，无法停止timer
          _timerId: -1, // 定时器id
          _timerCounter: 0 // 定时器执行计数器
        };
      },
      computed: {
        $timerCounter() {
          const _this: any = this;
          return _this.$data._timerCounter;
        }
      },
      created: async function() {
        const _this: any = this;
        _this._runningStatus = true;
        if (_this.$options && _this.$options.onTimer) {
          const timerFunc: Function = _this.$options.onTimer.bind(_this);
          //计算
          const interval = _this.$options.timerInterval ? _this.$options.timerInterval : 1000;
          const _tmpFunc: Function = async () => {
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
      destroyed: function() {
        const _this: any = this;
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

declare module 'vue/types/vue' {
  interface Vue {
    $timerCounter: number;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    timerInterval?: number;
    onTimer?: Function;
  }
}
