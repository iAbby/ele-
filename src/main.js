
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import center from './common/notificationCenter.js'
import axios from 'axios'

Vue.prototype.$axios = axios;
Vue.prototype.$event = center;

new Vue({
	el:'#app',
	router,
	store,
	render:h=>h(App)
})
