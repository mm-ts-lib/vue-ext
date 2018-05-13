import Vue, { VueConstructor, FunctionalComponentOptions } from "vue";
import "vuex";

import { ExtendedVue } from "vue/types/vue";

import _ from "lodash";
import debug from "debug";
const _d = debug("app:vueExt");
_d("init vueExt...");

// 初始化store
import { store } from "./globalStore";
export { store } from "./globalStore";

// 初始化定时器
import "./extTimer";
// 创建export导出函数
export type FN_EXTERN = typeof Vue.extend;
export function _export(options: any) {
  const VueInstance = Vue.extend.apply(Vue, arguments);

  if (options && options.module && options.name) {
    store.commit(`registerVueComponents`, VueInstance);
  }
  return VueInstance;
}
// 初始化vue扩展
Vue.export = _export as FN_EXTERN;

declare module "vue/types/vue" {
  interface VueConstructor {
    export: FN_EXTERN;
  }
}

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    timerInterval?: number;
    onTimer?: Function;
  }
}

export default Vue;
