import V, { VueConstructor } from 'vue';
import './extTimer';
export { store } from './globalStore';
export declare const Vue: VueConstructor<V>;
export declare function extendVue(module: string, vueClass: VueConstructor): VueConstructor<V>;
