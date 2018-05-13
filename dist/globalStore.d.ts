import Vue from "vue";
import { Store } from "vuex";
export interface IModuleInfo {
    name: string;
    version: string;
    title: string;
    icon: string;
    index: number;
    pages: {
        [p: string]: Vue;
    };
    components: {
        [c: string]: Vue;
    };
}
export interface IModules {
    [k: string]: IModuleInfo;
}
export declare const store: Store<{
    entry: string;
    moduleRegister: IModules;
}>;
