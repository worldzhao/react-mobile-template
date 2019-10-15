# React 移动端项目模板 - TypeScript

> 本模板基于`create-react-app`修改。

## 目录结构

```bash
├── README.md         # 自述文件
├── config            # 开发及打包相关配置 无需关心
├── iris.config.js    # 配置文件，详细内容见下文
├── mock              # mock文件夹
├── package.json      # package.json
├── src               # 项目原文件
│   ├── common        # 公用script/style或通用常量
│   ├── components    # 业务组件
│   ├── index.tsx     # 项目入口
│   ├── layouts       # 布局layouts相关
│   ├── models        # 数据层-存放effects以及reducers等rematch相关文件
│   ├── router        # 路由配置定义
│   ├── schemas       # 页面接口数据定义
│   ├── services      # 请求层-存放请求相关方法
│   ├── store.ts      # 全局store
│   ├── typings       # 为第三方库编写的声明文件
│   ├── utils         # 工具方法 重点关心request.ts逻辑
│   └── views         # 页面层
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
  /* 应用名称 无默认值 */
  appName: string;

  /* 打包输出文件夹 默认为'dist' */
  output: string;

  /* 静态资源地址 */
  publicPath: {
    test: string;
    uat: string;
    prod: string;
  };

  /* 环境变量注入 业务代码中通过process.env.key获取 */
  define: {
    // 默认注入REACT_APP_ENV，值为prod/uat/test 不可更改 会影响到publicPath sourcemap以及部分业务代码，如src/utils/env.ts
    REACT_APP_ENV: string;
    // 注入其他环境变量
    [key: string]: string;
  };

  /* 接口转发 基于http-proxy-middleware */
  // Options配置详见[官方文档](https://github.com/chimurai/http-proxy-middleware)
  proxy: {
    [route: string]: Options;
    [route: string]: {
      target: string; // 代理目标域名
      changeOrigin: boolean; // 把 请求头（request header）的中的 Host 变成 target URL
    };
  };
}
```

## 其他补充

模板中有一 `demo`，请仔细留意。

### 路由配置

声明式的路由配置，见`src/router/router.js`

```js
import { RouteProps } from 'react-router';
import Demo from '@/views/demo';

export const routerConfig: RouteProps[] = [
  {
    exact: true,
    path: '/',
    component: Demo
  }
];
```

### Layout

根据不同的路由前缀可包裹不同的 layout，见`src/layouts/index.jsx`

```tsx
import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import BasicLayout from './basicLayout';

const Layout: React.FC<RouteComponentProps> = props => {
  const { children } = props;
  // 可以根据 pathname 自定义选择layout组件
  // console.log(props.location.pathname);
  return <BasicLayout>{children}</BasicLayout>;
};

export default withRouter(Layout);
```

### 状态管理

选用[rematch](https://rematch.gitbook.io/handbook/)作为状态管理工具，类似于`dva`，使用简单。

基于[该文章](https://zhuanlan.zhihu.com/p/78741920)，修复 rematch 类型问题，达到基本完美的类型自动推导与提示。

同时使用了[@rematch/loading]插件，注入异步请求`loading`状态，更多可查阅官方文档以及查看`demo`。

### 数据 mock

在 `mock` 文件夹编写相关接口，记得 `mock/index.js` 导出。详情查阅`mock/demo.js`以及`mock/index.js`

### 接口 proxy

基于[http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)，参见项目配置中的 proxy 字段，更多内容可参阅官方文档。

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

### 移动端适配

`rem`布局，配合`postcss-plugin-px2rem`插件将`px`转为`rem`，而无需使用预处理器。

在`.postcssrc.js`文件中根据视觉稿配置好`rootValue`字段即可。

- 一倍图配置为`37.5`
- 二倍图配置为`75`

> 注意：如不想转为`rem`，请用`PX`作为单位，在相应 css 代码上加上 `/* prettier-ignore */`注释，避免被格式化为`px`。

根节点`#root`样式如下：

`src/common/styles/index.scss`

```css
/* prettier-ignore */
#root {
  min-height: 100vh;
  font-size: 12PX;
  max-width: 540PX;
  min-width: 320PX;
  margin: 0 auto;
}
```

### 代码自动格式化

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
  "prettier.eslintIntegration": true,
  "prettier.disableLanguages": []
}
```

即可`cmd+s`达到自动格式化效果。
