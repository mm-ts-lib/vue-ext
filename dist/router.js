"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_router_1 = __importDefault(require("vue-router"));
const debug_1 = __importDefault(require("debug"));
const globalStore_1 = require("./globalStore");
const Loading_vue_1 = __importDefault(require("./Loading.vue"));
const _d = debug_1.default('app:router');
const MAIN_PAGE = '/loading/home/main-page';
const routes = [
    {
        // 主页
        path: '/',
        component: HomePage,
    },
    {
        // 加载中页面
        path: '/loading/:type/:mod/:page',
        component: Loading_vue_1.default,
    },
    // 全部未匹配，尝试加载组件页面，跳转到loading,直接跳转到首页
    {
        path: '*',
        redirect: function (to) {
            _d('unmached path:', to.path);
            const m = to.path.match(/^\/(.+?)\/(.+)/);
            if (!m || m.length != 3) {
                _d('parse path error:', to.path);
                return '/';
            }
            if (m[1] === 'loading') {
                _d('can not redirect path: loading,go home:');
                return '/';
            }
            _d('path match:', m, m[1], m[2]);
            // 查询字符串自动附加后面
            return `/loading/go/${m[1]}/${m[2]}`;
        },
    },
];
const globalRouter = new vue_router_1.default({
    routes,
});
exports.default = globalRouter;
/**
 * 请求获取指定组件，如module不存在，则自动跳转loading页面进行加载
 * @param module 模块名
 * @param component 组件名
 */
function externComponent(moduleName, componentName) {
    const mod = globalStore_1.store.state.moduleList[moduleName];
    if (mod && mod.components) {
        return mod.components[componentName];
    }
    // 尝试加载新mod
    _d('externComponent load module:', moduleName, componentName, globalRouter.currentRoute.path);
    globalRouter.replace(`/loading/back/${moduleName}/${encodeURIComponent(globalRouter.currentRoute.fullPath)}`);
    return null;
}
exports.externComponent = externComponent;
//# sourceMappingURL=router.js.map