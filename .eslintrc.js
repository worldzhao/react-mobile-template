// @ts-nocheck
const { strictEslint } = require('@umijs/fabric');

module.exports = {
  ...strictEslint,
  globals: {},
  rules: {
    ...strictEslint.rules,
    '@typescript-eslint/no-unused-vars': 1,
    'jsx-a11y/img-redundant-alt': 0,
    'no-unused-expressions': 0,
    'no-new': 0,
    'react/sort-comp': 0,
    'react/jsx-boolean-value': 0,
    'react/no-did-update-set-state': 1,
    'react/no-array-index-key': 1,
    'react/self-closing-comp': 1,
  },
};
