import V, { VueConstructor } from 'vue';
import _ from 'lodash';
import debug from 'debug';
const _d = debug('app:vueExt');
_d('init vueExt...');

// 初始化store
import { store } from './globalStore';
// 初始化定时器
import './extTimer';
// 导出全局store
export { store } from './globalStore';
export { serverAddress } from './serverAddress';
export { apiLoader } from './apiLoader';

// 导出Vue对象
export const Vue = V;

// 返回Vue创建工厂函数
export function extendVue(module: string, vueClass: VueConstructor) {
  const v: any = vueClass;
  if (v.options && v.name) {
    store.commit(`registerVueComponents`, {
      module,
      vueClass,
    });
  }
  return vueClass;
}
