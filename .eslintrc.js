module.exports = {
  extends: ['react-app', 'plugin:prettier/recommended'],
  plugins: ['react'],
  rules: {
    'react/self-closing-comp': 1, // 防止没有children的组件的额外结束标签
    'react/sort-comp': 1 // 强制组件方法顺序
  }
};
