# BlockDesigner
for find all the components of React , and create them !

# 核心功能
 * 一个设计方法，用来理清楚项目中需要开发哪些组件
 * 根据理出来的组件，一键创建你的React项目

# 项目选型
 * webpack + less + react

# 项目结构
 * dist——目标文件 
 * src——源文件
   * VIEW——页面
   * Components——组件（积木）
     * Base 不含组件的组件
     * Unity 含组件的组件
     * Layout 模板布局
     * Icon 图标
     * HOC 拓展组件
   * index.js——入口js
   * index.less——入口js的less

# 界面设计

# json
描述组件结构及页面关系，用来生成React代码
 * 组件 json
   * 名字
   * 属性
   * 事件
   * 拓展
  