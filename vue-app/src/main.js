// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vant from 'vant';
import 'vant/lib/index.css';
import 'amfe-flexible'
import Api from './api/api'
import store from './vuex'
import { TreeSelect } from 'vant';
import { post, get, patch, put } from './http'
var VueTouch = require('vue-touch')
import Vconsole from 'vconsole'

import './assets/stylus/reset.styl'
import './assets/styles/border.css'
import './assets/styles/reset.css'

let vConsole = new Vconsole()

Vue.config.productionTip = false;

// 定义全局变量
Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$patch = patch
Vue.prototype.$put = put

Vue.prototype.$req = Api;
Vue.use(ElementUI);
Vue.use(Vant);
Vue.use(VueTouch, { name: 'v-touch' })
Vue.use(TreeSelect);
// eslint-disable-next-line
/* eslint-disable */
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

