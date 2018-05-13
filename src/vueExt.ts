import Vue, { VueConstructor, FunctionalComponentOptions } from "vue";
import "vuex";

import { ExtendedVue } from "vue/types/vue";

import _ from "lodash";
import debug from "debug";
const _d = debug("app:vueExt");

// 初始化store
import { store } from "./globalStore";
export { store } from "./globalStore";

// 初始化定时器
import "./extTimer";

_d("init vueExt...");

export type FN_EXTERN = typeof Vue.extend;
export function _extend(options: any) {
  const vue = Vue.extend.apply(Vue, arguments);

  if (options && options.module && options.name) {
    store.commit(`registerVueComponents`, {
      module: options.module,
      name: options.name,
      components: vue,
      page: options.page
    });
  }
  return vue;
}
// 初始化vue扩展

Vue.extendVue = _extend as FN_EXTERN;

declare module "vue/types/vue" {
  interface VueConstructor {
    extendVue: FN_EXTERN;
  }
}

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    module?: string;
    index?: number;
    page?: string;
    icon?: string;
    timerInterval?: number;
    onTimer?: Function;
  }
}

export default Vue;
