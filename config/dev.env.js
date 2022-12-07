'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
  // BASE_API: '"http://localhost:9001"',
  BASE_API: '"http://101.37.12.216:8001"',

  //src/utils/request 那个请求才是首页登录的跳转路径
})
