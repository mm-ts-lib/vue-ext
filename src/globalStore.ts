import Vue, { VueConstructor } from "vue";

import Vuex, { Store, Module } from "vuex";

import _ from "lodash";
import debug from "debug";
const _d = debug("app:globalStore");

// 挂载vue store 扩展
Vue.use(Vuex);

export interface IModuleInfo {
  name: string;
  version: string;
  title: string;
  icon: string;
  index: number; // 排序
  pages: {
    [p: string]: Vue;
  };
  components: {
    [c: string]: Vue;
  };
}

export interface IModules {
  [k: string]: IModuleInfo;
}

// 初始化全局store
export const store = new Vuex.Store({
  state: {
    entry: "pc", // 类型入口，默认为pc
    moduleRegister: {} as IModules // 已加载的组件列表
  },

  mutations: {
    setEntry(state, value) {
      state.entry = value;
    },
    registerModule(state, modInfo: IModuleInfo) {
      // 转换大小写
      modInfo.name = _.camelCase(modInfo.name);
      modInfo.pages = modInfo.pages || {};
      modInfo.components = modInfo.components || {};
      state.moduleRegister[modInfo.name] = modInfo;
    },
    registerVueComponents(
      state,
      value: {
        module: string;
        name: string;
        components: Vue;
        page: string;
      }
    ) {
      const mod = _.camelCase(value.module);
      const pg = _.camelCase(value.name);
      if (_.isEmpty(state.moduleRegister[mod])) {
        //初始化创建组件信息
        _d("Invalid or Unregister Module:", mod);
        return;
      }
      if (_.isEmpty(pg)) {
        _d("registerVueComponents Error,name is empty:", pg);
        return;
      }
      // 注册组件
      if (value.page) {
        // 注册为页面组件
        _d("register page:", mod, pg);
        state.moduleRegister[mod].pages[pg] = value.components;
      } else {
        // 注册为通用组件
        _d("register components:", mod, pg);
        state.moduleRegister[mod].components[pg] = value.components;
      }
    }
  }
});

// 设置全局对象
const w: any = window;
w.__global_store = store;
