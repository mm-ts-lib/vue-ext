import Vue, { VueConstructor } from "vue";

import { ExtendedVue } from "vue/types/vue";
import { ComponentOptions } from "vue/types/options";

import _ from "lodash";
import debug from "debug";
const _d = debug("app:vueExt");

export interface ExtOptions {
  module: string;
  name: string;
  index?: number;
  page?: string;
  icon?: string;
  timerInterval?: number;
  onTimer?: Function;
}
// 初始化store
import { store } from "./globalStore";
export { store } from "./globalStore";
_d("init vueExt...");

// 初始化定时器
import "./extTimer";
// 初始化vue扩展
Vue.extendVue = function(options?: ExtOptions & ComponentOptions<Vue>) {
  // 如果option中有page选项，则注册为page，否则注册为component
  const VueExt = Vue.extend(options);
  if (options) {
    store.commit(`registerVueComponents`, {
      module: options.module,
      name: options.name,
      components: options.components,
      page: options.page
    });
  }
  return VueExt;
};

/**
 * 定义扩展方法
 */
declare module "vue/types/vue" {
  interface VueConstructor<V extends Vue> {
    extendVue(
      options?: ExtOptions & ComponentOptions<V>
    ): ExtendedVue<V, {}, {}, {}, {}>;
  }
}

export default Vue;
