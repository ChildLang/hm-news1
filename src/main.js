import Vue from 'vue'
import 'amfe-flexible'
// 导入样式
import './styles/common.less'
import './styles/iconfont.less'
// 按需导入vant组件
import {
  Form,
  Button,
  Field,
  Toast,
  Grid,
  GridItem,
  NavBar,
  Dialog,
  Uploader,
  RadioGroup,
  Radio,
  Cell,
  CellGroup
} from 'vant'

// 导入根组件
import App from './App.vue'
// 导入路由配置文件
import router from './router'
// 导入moment
import moment from 'moment'
// 导入通用组件
import NewLogo from './components/NewsLogo.vue'
import NewsNav from './components/NewsNav.vue'
// 导入axios
import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:3000'
// 配置axios的请求拦截器
axios.interceptors.request.use(function(config) {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
// 配置axios的响应拦截器
axios.interceptors.response.use(function(res) {
  const { statusCode, message } = res.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    console.log(123)
    Toast.fail(message)
    router.push('/login')
    localStorage.removeItem('id')
    localStorage.removeItem('token')
  }
  return res
})
// 配置图片地址
Vue.prototype.$url = function(url) {
  if (url.startsWith('http')) {
    return url
  } else {
    return axios.defaults.baseURL + url
  }
}
// 配置过滤器
Vue.filter('time', function(input) {
  return moment(input).format('YYYY-MM-DD')
})
// 初始化组件库
Vue.use(Button)
Vue.use(Form)
Vue.use(Field)
Vue.use(Toast)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(NavBar)
Vue.use(Dialog)
Vue.use(Uploader)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Cell)
Vue.use(CellGroup)

// 注册通用组件
Vue.component('news-logo', NewLogo)
Vue.component('news-nav', NewsNav)
new Vue({
  render: c => c(App),
  router
}).$mount('#app')
