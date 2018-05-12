import Vue, { VueConstructor } from "vue";
import { ComponentOptions } from "vue/types/options";
import { Store } from 'vuex';
export interface ExtOptions {
    module: string;
    index?: number;
    page?: string;
    icon?: string;
    description: string;
    onTimer?: Function;
}
export declare type EXT_VUE_T = VueConstructor<ExtOptions & Vue>;
export interface IModules {
    [k: string]: {
        pages: {
            [p: string]: EXT_VUE_T;
        };
        components: {
            [c: string]: EXT_VUE_T;
        };
    };
}
export declare const store: Store<{
    router: {
        module: string;
        page: string;
    };
    login: {};
    modules: IModules;
}>;
/**
 * 定义扩展方法
 */
declare module "vue/types/vue" {
    interface VueConstructor<V extends Vue> {
        extendVue(options?: ExtOptions & ComponentOptions<V>): ExtendedVue<V, {}, {}, {}, {}>;
    }
}
export default Vue;
