/**
 * 自动分配路由，实例化页面
 * 自动检测已经加载的所有页面组件，读取组件导出信息
 * 跳转到加载页，异步加载组件列表
 */
import { VueConstructor } from 'vue';
declare const globalRouter: any;
export default globalRouter;
/**
 * 请求获取指定组件，如module不存在，则自动跳转loading页面进行加载
 * @param module 模块名
 * @param component 组件名
 */
export declare function externComponent(moduleName: string, componentName: string): VueConstructor | null;
