/**
 * 扩展任务组件属性
 */
import Vue, { VueConstructor } from 'vue';
export { VueConstructor };
export interface IEditor_Param {
  // 定义editor参数类型(固定参数名称，不能修改)
  /***************************** 文本编辑参数 ****************/
  text?: string;
  size?: number;
  color?: { rgba: { r: number; g: number; b: number; a: number } };
  weight?: number;
  align?: 'flex-start' | 'center' | 'flex-end';
  vertical?: 'flex-start' | 'center' | 'flex-end';
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    display?: string;
    icon?: string;
    editor?: { [name: string]: VueConstructor };
    defaultParams?: { [name: string]: IEditor_Param };
  }
}
