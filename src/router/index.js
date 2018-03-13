import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: index
    }
  ]
})
