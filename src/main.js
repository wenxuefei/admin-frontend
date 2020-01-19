import Vue from 'vue'
import App from './App.vue'

import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import '@/styles/index.scss'
import './icons'
import store from './store'
import './permission'

Vue.use(ElementUI)



Vue.config.productionTip = false


new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App),
}).$mount('#app')
