let views = ['index', 'articles'];  // ,'play','music','account'
let routes = views.map(item => {
   return {
      path: `/${item}`,
      name: `${item.toUpperCase()}`,
      component: () => import('../views/' + item + '/index.vue')
   }
})
routes.unshift({
   path: '',
   redirect: `/${views[0]}`
});
export default routes;