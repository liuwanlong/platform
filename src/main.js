// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'
import store from './store/index'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueResource)

Vue.directive('drag', function (el, param, vnode) {
  let oDiv = el
  oDiv.onmousedown = function (ev) {
    let disX = ev.clientX - oDiv.offsetLeft
    let disY = ev.clientY - oDiv.offsetTop
    let l = ''
    let t = ''
    let id = param.value

    document.onmousemove = function (ev) {
      l = ev.clientX - disX
      t = ev.clientY - disY

      oDiv.style.left = l + 'px'
      oDiv.style.top = t + 'px'
    }
    document.onmouseup = function () {
      if (l && t) {
        store.commit('setELPosition', {
          id: id,
          left: l + 'px',
          top: t + 'px'
        })
      }

      document.onmousemove = null
      document.onmouseup = null
    }
  }

})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})


