// 环境变量
const REACT_APP_ENV = process.env.REACT_APP_ENV;

// 应用名称
const appName = 'react-template-mobile';

// 输出目录
const output = 'dist';

module.exports = {
  appName,
  output,

  // 静态资源引用路径
  publicPath: {
    test: `/`,
    uat: `/`,
    prod: `/`
  },

  // 定义环境变量 注入前端应用
  define: { REACT_APP_ENV },

  // 接口代理
  proxy: {
    '/api/*': {
      target: 'http://gank.io',
      changeOrigin: true
    }
  }
};
