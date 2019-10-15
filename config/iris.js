const irisConfig = require('../iris.config');
const _ = require('lodash');

const defaultConfig = {
  proxy: {},
  define: {}
};

module.exports = _.merge(defaultConfig, irisConfig);
