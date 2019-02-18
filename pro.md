---
title: "开发文档"
export_on_save:
  html: true
---
# 1. 目的和原则
抽重到组件库
减少业务线工作量
减少业务线之间的重复代码
单个组件不要贪多，组件设计最好简单清晰强壮
复杂的组件，通过组合简单组件完成

# 2. 依赖说明
## 2.1. babel
babel系列，为了支持ES6和react的jsx语法

    @babel/cli
    @babel/core
    @babel/preset-env
    @babel/preset-react


## 2.2. webpack
webpack暂时仅需要这个

    babel-loader  

## 2.3. eslint
代码检查相关

    babel-eslint 
    eslint 
    eslint-plugin-import 
    eslint-plugin-jsx-a11y
    eslint-plugin-react
    eslint-watch

## 2.4. react
项目依赖，后期根据需要，加入antd，作为组件库，为了通用性，尽量不要依赖太多东西

    react 
    react-dom 

## 2.5. 其它
prop-types是用来做类型检查的，polished和styled-components都是为了方便用js直接写样式，前者在于提供了计算方法，后者在于模板字符串写法

    polished 
    prop-types 
    styled-components 

例如：

```
// 两者结合起来可以这么写
// styled.div``是styled-components的方法，用于创建带css的标签
// between()方法是polished提供的计算方法，详情见两者的官网

const div = styled.div`
  fontSize: ${between('20px', '100px', '400px', '1000px')};
  fontSize: ${between('20px', '100px')}
`
```
# 3. 项目结构
组件开发都在lib目录下：
* 其中 elements 为基础组件，比如按钮、下拉框、表格等，类似antd。建议我们公司，这块不用写，直接用antd就行了，主要精力放到开发 components 上
* 另外 components 为业务组件，比如选书框、图书详情弹窗
* 最后 styles 里面是全局的样式，建议把颜色定义放到这里，其它的就算了

```
--lib
----elements
----components
----styles
```

# 4. 开发流程

该框架库的开发过程中，不需要安装到业务项目下

在 ella-ui 项目下运行``` npm link ```
在 业务 项目下运行 ``` npm link ella-ui && [项目启动命令] ```

对于业务开发人员，最好是直接``` npm i ella-ui -D ```安装该库

* 在 组件开发+业务开发 两个团队的模式下，每次业务需要新组件，建议同时开发，最好是组件能够提前开发
* 在 一个团队的模式下，建议直接写业务，在业务完成后，花一点时间抽取代码到组件库中，再二次修改原代码

第二种模式看起来麻烦一点，但是能保证业务先上线，同时开发者在二次抽取组件的过程中是个自我走读代码的过程，对于代码品质提升比较便利

# 5. 注意事项
* 命名：组件命名尽量优雅，后期不适合频繁更改组件名
* 内聚：作为组件，把内聚发挥到极致，我们只需要两个东西，输入和输出，输入即配置，输出即结果。例如，图书选择框，我们输入的配置应该是接口地址，输出应该是选择的图书code数组。
