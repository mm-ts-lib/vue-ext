import Vue, { VueConstructor } from "vue";

import { ExtendedVue } from "vue/types/vue";
import { ThisTypedComponentOptionsWithArrayProps, ThisTypedComponentOptionsWithRecordProps, FunctionalComponentOptions, RecordPropsDefinition, ComponentOptions } from "vue/types/options";
import Vuex,{ Store, Module } from 'vuex'

import _ from 'lodash';
import debug from 'debug';
const _d = debug('vueExt');

// 挂载vue store 扩展
Vue.use(Vuex);

export interface ExtOptions {
    module:string,
    index?: number,
    page?: string,
    icon?: string,
    description: string,
    onTimer?: Function,
}

export type EXT_VUE_T = VueConstructor<ExtOptions & Vue>;

export interface IModules {
    [k:string]:{
        pages:{
            [p: string]: EXT_VUE_T
        },
        components:{
            [c: string]: EXT_VUE_T
        }
    }
}

// 初始化全局store
export const store = new Vuex.Store({
    state: {
        router: {
            module: '',// 当前组件
            page: '', // 当前页面
        },
        login: {},
        modules: {} as IModules// 已加载的组件列表
    },

    mutations: {
        login(state, value) {
            state.login = value;
        },
        logout(state) {
            state.login = {};
        },
        setRouter(state, value: {module:string,page:string}) {
            state.router = value;
        },
        registerPage(state, value: EXT_VUE_T){
            state.modules
        },

    }
});

// 初始化
Vue.extendVue = function (moduleName:string,options: any) {

    // 如果option中有page选项，则注册为page，否则注册为component
    const VueExt = Vue.extend(options);
    if (_.isEmpty(options.name)) {
        console.error('define vue Component error', options);
        throw new Error('export Component MUST have name :');
    }

    if (options.page) {
        console.log('----', options.page);
        store.commit(`${moduleName}/registerPage`, VueExt);
    } else {
        store.commit(`${moduleName}/registerComponent`, VueExt);
    }
    return VueExt;

}


// const abc = new VueX();

// 创建自动销毁的定时器组件
Vue.use({
    install(Vue) {
        // console.warn('INIT VUE PLUGIN TIMER');
        // 3. 注入组件
        Vue.mixin({
            data: function () {
                return {
                    _timerId: -1, // 定时器id
                    _timerCounter:0,// 定时器执行计数器
                }
            },
            created: function () {
                const _this: any = this;
                if (_this.$options && _this.$options.onTimer) {
                    // debugger;
                    const timerFunc: Function = _this.$options.onTimer.bind(_this);
                    // 初始化运行一次，每秒执行一次
                    timerFunc();
                    _this.$data._timerId = setInterval(() => {
                        timerFunc();
                    }, 1000);
                    _d('SET Vue Timer', _this.$data._timerId);
                }

            },
            destroyed: function () {
                const _this: any = this;
                if (_this.$data._timerId>=0) {
                    clearInterval(_this.$data._timerId);
                    _d('Clear Vue Timer:', _this.$data._timerId);
                }
            }
        })
    }
})

/**
 * 定义扩展方法
 */
declare module "vue/types/vue" {
    interface VueConstructor<V extends Vue> {
        extendVue<Data, Methods, Computed, PropNames extends string = never>
            (moduleName: string,options?: ExtOptions & ThisTypedComponentOptionsWithArrayProps<V, Data, Methods, Computed, PropNames>): ExtendedVue<V, Data, Methods, Computed, Record<PropNames, any>>;
        extendVue<Data, Methods, Computed, Props>
            (moduleName: string,options?: ExtOptions & ThisTypedComponentOptionsWithRecordProps<V, Data, Methods, Computed, Props>): ExtendedVue<V, Data, Methods, Computed, Props>;
        extendVue<PropNames extends string = never>
            (moduleName: string,definition: FunctionalComponentOptions<Record<PropNames, any>, PropNames[]>): ExtendedVue<V, {}, {}, {}, Record<PropNames, any>>;
        extendVue<Props>
            (moduleName: string,definition: FunctionalComponentOptions<Props, RecordPropsDefinition<Props>>): ExtendedVue<V, {}, {}, {}, Props>;
        extendVue(moduleName:string,options?: ExtOptions & ComponentOptions<V>): ExtendedVue<V, {}, {}, {}, {}>;
    }
};

export default Vue;
