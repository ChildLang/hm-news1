import Vue from 'vue'
import 'amfe-flexible'
// 导入样式
import './styles/common.less'
import './styles/iconfont.less'
// 按需导入vant组件
import { Form, Button, Field, Toast, Grid, GridItem, NavBar } from 'vant'
// 导入根组件
import App from './App.vue'
// 导入路由配置文件
import router from './router'
// 导入通用组件
import NewLogo from './components/NewsLogo.vue'
// 导入axios
import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:3000'
// 初始化组件库
Vue.use(Button)
Vue.use(Form)
Vue.use(Field)
Vue.use(Toast)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(NavBar)

// 注册通用组件
Vue.component('news-logo', NewLogo)
new Vue({
  render: c => c(App),
  router
}).$mount('#app')
