# React 移动端项目模板 - TypeScript

## 快速开始

```bash
yarn global add violet-cli
violet init your-app # 选择「React移动端模板」
```

## 目录结构

```bash
├── README.md         # 自述文件
├── config            # 开发及打包相关配置 无需关心
├── iris.config.js    # 配置文件，详细内容见下文
├── mock              # mock文件夹
├── package.json      # package.json
├── src               # 项目原文件
│   ├── app.tsx
│   ├── common        # 公用脚本、样式文件、图片
│   ├── components    # 公用组件
│   ├── enum          # 枚举值及常量
│   ├── index.tsx     # 入口
│   ├── layouts       # 布局layouts相关
│   ├── models        # 数据层-存放effects以及reducers等rematch相关文件
│   ├── router        # 路由配置定义
│   ├── schemas       # 后端接口类型定义
│   ├── services      # 请求方法
│   ├── store.ts      # 全局store
│   ├── typings       # 为第三方库编写的声明文件
│   ├── utils         # 工具方法
│   └── views         # 页面组件
├── tsconfig.json     # typescript编译相关配置（vscode）
└── yarn.lock         # 依赖锁定
```

## 基本命令

**安装依赖**

```bash
yarn
```

**开发**

```bash
yarn start

# or

yarn dev
```

**打包**

```bash
yarn build:test # 测试环境打包

yarn build:uat  # 预发环境打包

yarn build:prod # 生产环境打包
```

**打包分析**

```bash
yarn build:analyze
```

**Commit**

```bash
yarn commit # 交互式生成符合规范的commit message
```

## 项目配置

```ts
interface irisConfig {
  /* 打包输出文件夹 默认为'dist' */
  output: string;

  /* 静态资源地址 */
  publicPath: {
    test: string;
    uat: string;
    prod: string;
  };

  /* 注入环境变量
   * 业务代码中通过process.env[key]获取
   */
  define: {
    // 请勿更改REACT_APP_ENV的值，否则会影响正常构建流程和运行
    // 注入环境变量
    [key: string]: string;
  };

  /* 接口转发
   * Options配置详见[官方文档](https://github.com/chimurai/http-proxy-middleware)
   */
  proxy: {
    // 示例一： 使用options
    [route: string]: Options;
    // 示例二： 快速配置转发
    '/api': {
      target: 'www.target.com'; // url中带'/api'的请求，代理至域名'www.target.com'
      changeOrigin: true; // http请求头中的 Host 改为'www.target.com'
    };
  };
}
```

## 基础

模板中有一 `demo`，请仔细留意。

### 数据 mock

在 `mock` 文件夹编写相关接口，记得 `mock/index.js` 导出。详情查阅`mock/demo.js`以及`mock/index.js`

### 接口 proxy

基于[http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)，参见项目配置中的 proxy 字段，更多内容可参阅官方文档。

### 状态管理

选用[rematch](https://rematch.gitbook.io/handbook/)作为状态管理工具，类似于`dva`，使用简单。

基于[该文章](https://zhuanlan.zhihu.com/p/78741920)，修复 rematch 类型问题，达到基本完美的类型自动推导与提示。

同时使用了[@rematch/loading]插件，注入异步请求`loading`状态，更多可查阅官方文档以及查看`demo`。

### 移动端适配

`rem`布局，配合`postcss-plugin-px2rem`插件将`px`转为`rem`，而无需使用预处理器。

在`.postcssrc.js`文件中根据视觉稿配置好`rootValue`字段即可。

- 一倍图配置为`37.5`
- 二倍图配置为`75`

> 注意：如不想转为`rem`，请用`PX`作为单位，在相应 css 代码上加上 `/* prettier-ignore */`注释，避免被格式化为`px`。

### 请求规范

确保后端业务返回字段为以下形式：

```ts
interface Response {
  code: number; // 一般约定0为业务正常code，非零为业务异常
  msg: string;
  data: any;
}
```

与业务无关的错误通过`HTTP CODE`返回即可。

更多可参阅`src/utils/request.ts`以及`demo`。

### polyfill

- 默认使用以下 polyfill 库，效果等同于已启用`@babel/polyfill`。

```js
import 'core-js/stable';
import 'regenerator-runtime/runtime';
```

- 配置`@babel/preset-env`配置`useBuiltIns:'entry'`。

- 配置`package.json`中`browserslist`字段。

效果：根据配置的最低浏览器版本进行所需 polyfill 引入。

> 注：`useBuiltIns`为`usage`时可根据使用的 API 特性以及配置的`browserslist`字段达到按需 polyfill 引入，但目前为实验特性，暂未开启。

### 代码自动格式化-VSCode

安装`Eslint`以及`Prettier - Code formatter`插件。

在`settings.json`文件中写入以下配置：

```json
{
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,
  "editor.formatOnSave": true,
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "typescript",
      "autoFix": true
    },
    {
      "language": "typescriptreact",
      "autoFix": true
    },
    {
      "language": "vue",
      "autoFix": true
    }
  ],
  "prettier.disableLanguages": []
}
```

即可`cmd+s`达到自动格式化效果。

### import sorted

页面顶部`import`排序推荐遵循以下原则：

1. `node_modules`
2. 别名模块，以`@/components`等开头
3. 相对模块
4. 样式以及图片等静态资源

```ts
/* node_modules */
import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js/stable';
import 'react-hot-loader';
import 'regenerator-runtime/runtime';

/* 别名模块 */
import { env } from '@/utils';
import { disableSlideClose, initSDK, setNavRight } from '@/utils/jssdk';

/* 相对模块 */
import App from './app';

/* 样式以及图片等静态资源 */
import '@/common/scripts/rem';
import '@/common/styles/index.scss';
```

## 常见问题

### Typescript Error: redux connect 报错

现象：经`connect()`包裹的组件提示需要注入`mapStateToProps`以及`mapDispatchToProps`中的属性。

原因：`connect()`返回的组件类型定义中没有剔除该高阶组件自身注入的内容，因此 Typescript 编译器认为需要在外部手动注入高阶组件的属性，其实不然，我们需要手动剔除高阶组件注入的 props，使编译器能够正常提示和处理目标组件的属性。

借助`utility-types`这个库剔除对外暴露的 Props 定义即可，如下：

```ts
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Subtract } from 'utility-types';

import { RootDispatch, RootState } from '@/store';

const mapStateToProps = (state: RootState) => ({
  a: 'a',
});

const mapDispatchToProps = ({ b }: RootDispatch) => ({ b });

// 1. 注入的Props
type InjectedProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

// 2. 组件获得的所有Props
type Props = {} & InjectedProps;

class Demo extends Component<Props> {}

// 3. 使用 Subtract 剔除无关属性
export default connect(
  mapStateToProps as any,
  mapDispatchToProps as any,
)((Demo as any) as React.ComponentType<Subtract<Props, InjectedProps>>);
```
