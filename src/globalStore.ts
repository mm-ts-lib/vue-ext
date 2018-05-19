import Vue, { VueConstructor } from 'vue';

import Vuex, { Store, Module } from 'vuex';

import _ from 'lodash';
import debug from 'debug';
const _d = debug('app:globalStore');

// 挂载vue store 扩展
Vue.use(Vuex);

export interface IPageInfo {
  name: string;
  title: string;
  icon: string;
  index: number; // 排序
  accessGroup: [string];
}
export interface IModuleInfo {
  name: string;
  version: string;
  title: string;
  icon: string;
  index: number; // 排序
  accessGroup: [string];
  pages: {
    // 导出页面信息列表
    [p: string]: IPageInfo;
  };
  components: {
    // 导出组件列表，组件实例
    [c: string]: VueConstructor;
  };
}

export interface IModules {
  [k: string]: IModuleInfo;
}

// 初始化全局store
export const store = new Vuex.Store({
  state: {
    user: {}, // 当前登录用户信息
    moduleList: {} as IModules, // 已加载的组件列表
  },

  mutations: {
    /**
     * 更新当前用户信息
     * @param state
     * @param value
     */
    updateUser(state, value) {
      state.user = value;
    },
    registerModule(state, modInfo: IModuleInfo) {
      const m: any = {};
      m[modInfo.name] = modInfo;
      state.moduleList = Object.assign({}, state.moduleList, m);
    },
    registerVueComponents(
      state,
      value: {
        module: string;
        vueClass: VueConstructor & { options: { name: string } };
      },
    ) {
      // 获取实例名称
      const mod = state.moduleList[value.module];
      if (_.isEmpty(mod)) {
        //初始化创建组件信息
        _d('Invalid Module for registerVueComponents:', value);
        return;
      }
      const modName = value.vueClass.options.name;
      if (_.isEmpty(modName)) {
        _d('registerVueComponents ,No Define Page Name:', value);
        return;
      }
      const page = mod.pages[modName];
      if (_.isEmpty(page)) {
        _d('registerVueComponents ,as components', modName);
      } else {
        _d('registerVueComponents ,as page', modName);
      }
      // 注册组件
      mod.components = mod.components || {};
      mod.components[modName] = value.vueClass;
      _d('register Vue components successed:', value.module, modName);
      // 强制进行变更
      state.moduleList = Object.assign({}, state.moduleList);
    },
  },
});

// 设置全局对象
const w: any = window;
w.__global_store = store;
