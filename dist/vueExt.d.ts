import V, { VueConstructor } from 'vue';
import './extTimer';
import './extTaskCmpt';
export { store } from './globalStore';
export { default as debugSessionStorage } from './DebugSessionStorage';
export { serverAddress } from './serverAddress';
export { apiLoader } from './apiLoader';
export declare const Vue: VueConstructor<V>;
export declare function extendVue(module: string, vueClass: VueConstructor): VueConstructor<V>;
