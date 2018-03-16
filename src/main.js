import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'

//css
import colors from 'vuetify/es5/util/colors'
import 'vuetify/dist/vuetify.min.css'
import "material-design-icons/iconfont/material-icons.css";
import "@/assets/style/color.css";
import "@/assets/style/topology.css";
import "@/assets/style/weui.css";

//component
import TheFooter from "@/components/TheFooter";
Vue.component('the-footer', TheFooter);

//use
Vue.use(colors)
Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#onewish',
  router,
  components: { App },
  template: '<App/>'
})
