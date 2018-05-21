import { VueConstructor } from 'vue';
import { Store } from 'vuex';
export interface IPageInfo {
    name: string;
    title: string;
    icon: string;
    index: number;
    permissions: [string];
}
export interface IModuleInfo {
    name: string;
    version: string;
    title: string;
    icon: string;
    index: number;
    permissions: [string];
    pages: {
        [p: string]: IPageInfo;
    };
    components: {
        [c: string]: VueConstructor;
    };
}
export interface IModules {
    [k: string]: IModuleInfo;
}
export interface IUser {
    id: string;
    name: string;
    avatar: string;
    permissions: [string];
}
export declare const store: Store<{
    user: IUser;
    moduleList: IModules;
}>;
