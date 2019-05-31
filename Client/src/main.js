import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import { sync } from 'vuex-router-sync'
import 'bulma-helpers/css/bulma-helpers.min.css'



Vue.use(Buefy)

Vue.config.productionTip = false

sync(store, router)

new Vue({
  router,
  store,
  render: h => h(App),

}).$mount('#app')
