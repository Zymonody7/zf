import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import HeadBar from '@/components/HeadBar.vue'
import FooterBar from '@/components/FooterBar.vue'
import dayjs from 'dayjs' // 引入时间插件

// 全局注册 HeadBar 组件
Vue.component('headBar', HeadBar)
Vue.component('footerBar', FooterBar)

// 数值格式化
Vue.filter('numFormat', (number) => {
  if (number >= 100000000) {
    return (number / 100000000).toFixed(2) + '亿'
  } else if (number >= 10000) {
    return (number / 10000).toFixed(2) + '万'
  } else {
    return number
  }
})

// 时间格式化
Vue.filter('timeFormat', (time) => {
  return dayjs.unix(time).format('YYYY-MM-DD') 
})

// 时长格式化
Vue.filter('durationFormat', (duration) => {
  function fillZero(num) {
    return num > 10 ? num : '0' + num
  }

  let h = fillZero(Math.floor(duration / 60 / 60))
  let m = fillZero(Math.floor((duration / 60) % 60))
  let s = fillZero(duration % 60)

  if (h > 0) {
    return `${h}:${m}:${s}`
  }
  return `${m}:${s}`
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
