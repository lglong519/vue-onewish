import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';
Vue.use(Router);

const router = new Router({
	// mode: 'history',
	routes
});

router.afterEach((to, from, next) => {
	document.title = to.name;
});

export default router;
