import Vue from 'vue';
import VueConfetti from 'vue-confetti';
import App from './App.vue';
import './main.css';

Vue.config.productionTip = false;
Vue.use(VueConfetti);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
