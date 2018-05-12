import Vue from "vue";
import { Store } from "vuex";
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
export declare const store: Store<{
    login: {};
    modules: IModules;
}>;
