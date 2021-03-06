let views = {
   index: 'onewish',
   articles: '文章',
   music: '音乐',
   play: '正在播放'
};  // ,'play','music','account'
let routes = Object.keys(views).map(item => {
   return {
      path: `/${item}`,
      name: `${views[item]}`,
      component: () => import('../views/' + item + '/index.vue')
   }
})
routes.unshift({
   path: '',
   redirect: `/${Object.keys(views)[0]}`
});
export default routes;