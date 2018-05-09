import Vue, { VueConstructor } from "vue";
import { ThisTypedComponentOptionsWithArrayProps, ThisTypedComponentOptionsWithRecordProps, FunctionalComponentOptions, RecordPropsDefinition, ComponentOptions } from "vue/types/options";
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
        extendVue<Data, Methods, Computed, PropNames extends string = never>(moduleName: string, options?: ExtOptions & ThisTypedComponentOptionsWithArrayProps<V, Data, Methods, Computed, PropNames>): ExtendedVue<V, Data, Methods, Computed, Record<PropNames, any>>;
        extendVue<Data, Methods, Computed, Props>(moduleName: string, options?: ExtOptions & ThisTypedComponentOptionsWithRecordProps<V, Data, Methods, Computed, Props>): ExtendedVue<V, Data, Methods, Computed, Props>;
        extendVue<PropNames extends string = never>(moduleName: string, definition: FunctionalComponentOptions<Record<PropNames, any>, PropNames[]>): ExtendedVue<V, {}, {}, {}, Record<PropNames, any>>;
        extendVue<Props>(moduleName: string, definition: FunctionalComponentOptions<Props, RecordPropsDefinition<Props>>): ExtendedVue<V, {}, {}, {}, Props>;
        extendVue(moduleName: string, options?: ExtOptions & ComponentOptions<V>): ExtendedVue<V, {}, {}, {}, {}>;
    }
}
export default Vue;
