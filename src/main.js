import Vue from 'vue'
import App from './App.vue'

if (!String.prototype.ltrim) {
    String.prototype.ltrim = function(charlist) {
        'use strict';
        charlist = !charlist ? ' \s\xA0' : charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\$1');
        let re = new RegExp('^[' + charlist + ']+', 'g');
        return this.replace(re, '');
    };
}

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app')
