const proxy = require('http-proxy-middleware');
const mocker = require('mocker-api');
const path = require('path');
const _ = require('lodash');
const paths = require('./paths');

const proxyConfig = _.get(require(paths.irisConfig), 'proxy', {}) || {};

module.exports = function(app) {
  Object.keys(proxyConfig).forEach(pattern => {
    app.use(pattern, proxy(proxyConfig[pattern]));
  });
  mocker(app, path.resolve(__dirname, '../mock'));
};
