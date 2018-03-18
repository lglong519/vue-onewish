import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index/index.vue'
import articles from '@/views/articles/articles.vue'
// import index from '@/views/index/index.vue'
Vue.use(Router)


const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('../views/index/index.vue')
    },
    {
      path: '/articles',
      name: 'articles',
      component: articles
    }

  ]
})

router.afterEach((to, from, next) => {
  document.title = to.name;
})

export default router;
/**
  "pages/index/index",
        "pages/articles/articles",
        "pages/play/play",
        "pages/account/account",
        "pages/music/music"
 */