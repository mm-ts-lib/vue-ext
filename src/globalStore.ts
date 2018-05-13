import Vue, { VueConstructor } from "vue";

import Vuex, { Store, Module } from "vuex";

import _ from "lodash";
import debug from "debug";
const _d = debug("app:globalStore");

// 挂载vue store 扩展
Vue.use(Vuex);

export interface IModules {
  [k: string]: {
    pages: {
      [p: string]: Vue;
    };
    components: {
      [c: string]: Vue;
    };
  };
}

// 初始化全局store
export const store = new Vuex.Store({
  state: {
    login: {},
    modules: {} as IModules // 已加载的组件列表
  },

  mutations: {
    login(state, value) {
      state.login = value;
    },
    logout(state) {
      state.login = {};
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
      if (_.isEmpty(state.modules[mod])) {
        //初始化创建组件信息
        state.modules[mod] = { pages: {}, components: {} };
      }
      if (_.isEmpty(pg)) {
        _d("global store: registerVueComponents Error,name is empty:", pg);
        return;
      }
      // 注册组件
      if (value.page) {
        // 注册为页面组件
        _d("register page:", mod, pg);
        state.modules[mod].pages[pg] = value.components;
      } else {
        // 注册为通用组件
        _d("register components:", mod, pg);
        state.modules[mod].components[pg] = value.components;
      }
    }
  }
});
