/**
 * Created by robert on 22/06/17.
 */
// 从angular animations module 导入需要的动画方法
import {animate, style, transition, trigger} from "@angular/animations";
export const fadeInAnimation =
  // 触发器名称，附加这个动画到元素上使用[@triggerName]语法
  trigger('fadeInAnimation', [
    // 路由 '进入' 过渡
    transition(':enter', [
      // 在过渡刚开始时的样式
      style({opacity: 0}),
      // 动画和过渡结束时的样式
      animate('.3s', style({opacity: 1}))
    ])
  ]);
