/* node_modules模块 */
import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'react-hot-loader';

/* alias模块 */
import { env } from '@/utils';

/* 相对模块 */
import App from './app';

/* 图片以及样式等静态资源 */
import '@/common/scripts/rem';
import '@/common/styles/index.scss';

if (!env.isProd) {
  // 动态import vconsole，避免打包到同一个vendor，影响打包体积
  // 虽然打包了 但prod环境永远不会加载这部分js
  (async () => {
    const { default: VConsole } = await import(/* webpackChunkName: "vconsole" */ 'vconsole');
    new VConsole();
  })();
}

ReactDOM.render(<App />, document.getElementById('root'));
