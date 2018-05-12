import Vue from "vue";
import { ComponentOptions } from "vue/types/options";
export interface ExtOptions {
    module: string;
    name: string;
    index?: number;
    page?: string;
    icon?: string;
    timerInterval?: number;
    onTimer?: Function;
}
export { store } from "./globalStore";
import "./extTimer";
/**
 * 定义扩展方法
 */
declare module "vue/types/vue" {
    interface VueConstructor<V extends Vue> {
        extendVue(options?: ExtOptions & ComponentOptions<V>): ExtendedVue<V, {}, {}, {}, {}>;
    }
}
export default Vue;
