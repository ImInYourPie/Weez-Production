import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import VueMoment from "vue-moment"
import { sync } from 'vuex-router-sync'
import 'bulma-helpers/css/bulma-helpers.min.css'
import InfiniteLoading from 'vue-infinite-loading';


const moment = require("moment")
require("moment/locale/pt")

Vue.use(InfiniteLoading, { /* options */ });
Vue.use(Buefy)
Vue.use(VueMoment, {
  moment
})

Vue.config.productionTip = false

sync(store, router)

new Vue({
  router,
  store,
  render: h => h(App),

}).$mount('#app')
