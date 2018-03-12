import VueRouter from 'vue-router';
import Home from '@/components/containers/home'
import Edit from '@/components/containers/edit/'

export default new VueRouter({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Edit
    },

  ]
})
