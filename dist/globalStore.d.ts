import Vue from "vue";
import { Store } from "vuex";
export interface IComponentInfo {
    module: string;
    name: string;
    page: string;
    icon: string;
    index: number;
    accessGroup: [string];
    Instance: Vue;
}
export interface IModuleInfo {
    name: string;
    version: string;
    title: string;
    icon: string;
    index: number;
    pages: {
        [p: string]: IComponentInfo;
    };
    components: {
        [c: string]: IComponentInfo;
    };
}
export interface IModules {
    [k: string]: IModuleInfo;
}
export declare const store: Store<{
    entry: string;
    moduleRegister: IModules;
}>;
