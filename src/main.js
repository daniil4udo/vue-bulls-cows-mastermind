import Vue from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';

import '../node_modules/nprogress/nprogress.css';
import NProgress from 'nprogress';

Vue.config.productionTip = false;

router.beforeResolve((to, from, next) => {
    if (to.name) {
        NProgress.start();
    }
    next();
});

router.afterEach((to, from) => {
    setTimeout(() => {
        NProgress.done();
    }, 1000); 
});

Vue.filter('amendTheSentence', (s) => {
    if (!s) {return '';}
    s = s.charAt(0).toUpperCase() + s.slice(1);//first letter to uppercase
    return s.replace(/([A-Z])/g, ' $1').trim(); // make spaces 
});

import { mixinBullsCows } from '@/components/mixins';
Vue.mixin({
    mixins: [ mixinBullsCows ],
});

new Vue({
    router,
    store,
    render: h => h(App),
    
}).$mount('#app');
