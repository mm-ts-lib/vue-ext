import Vue from "vue";
import "vuex";
export { store } from "./globalStore";
import "./extTimer";
export declare type FN_EXTERN = typeof Vue.extend;
export declare function _extend(options: any): any;
declare module "vue/types/vue" {
    interface VueConstructor {
        extendVue: FN_EXTERN;
    }
}
declare module "vue/types/options" {
    interface ComponentOptions<V extends Vue> {
        module?: string;
        index?: number;
        page?: string;
        icon?: string;
        accessGroup?: [string];
        timerInterval?: number;
        onTimer?: Function;
    }
}
export default Vue;
