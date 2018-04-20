import VueRouter from 'vue-router'
import store from '../store'
import Home from '@/components/containers/home'
import Peoject from '@/components/containers/project'
import Edit from '@/components/containers/edit/'
import { getProject } from '@/service/home'

export default new VueRouter({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: Edit,
      beforeEnter: (to, from, next) => {
        let pId = to.params.id
        getProject(pId, (res) => {
          if (res.body.code) {
            let pages = JSON.parse(res.body.msg)
            store.commit('initStore', pages)
            next()
          }
        })
      }
    },
    {
      path: '/project/:id',
      name: 'project',
      component: Peoject,
      beforeEnter: (to, from, next) => {
        let pId = to.params.id
        getProject(pId, (res) => {
          if (res.body.code) {
            let pages = JSON.parse(res.body.msg)
            store.commit('initStore', pages)
            next()
          }
        })
      }
    }

  ]
})
