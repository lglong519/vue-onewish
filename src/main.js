import Vue from 'vue';
import App from './App';
import router from './router';
import Vuetify from 'vuetify';
// import VueLazyload from 'vue-lazyload'
import store from './store';

import vueCordova from 'vue-cordova';
Vue.use(vueCordova);

// css
import colors from 'vuetify/es5/util/colors';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons/iconfont/material-icons.css';
import '@/assets/style/weui.css';
import '@/assets/style/color.css';
import '@/assets/style/topology.css';

// component
import TheFooter from '@/components/TheFooter';
Vue.component('the-footer', TheFooter);

// use
Vue.use(colors);
Vue.use(Vuetify);

/*
Vue.use(VueLazyload, {
  loading: require('./assets/images/qrcode.jpg')
})
*/

Vue.config.productionTip = false;

new Vue({
	el: '#onewish',
	router,
	store,
	render: h => h(App)
});
