import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// use checkbox
Vue.config.productionTip = false
import PrettyCheckbox from 'pretty-checkbox-vue';


// use element
import { InputNumber } from 'element-ui';
import { TimePicker, TimeSelect } from 'element-ui';
import { Radio, RadioGroup, RadioButton } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(InputNumber);
Vue.use(TimePicker);
Vue.use(TimeSelect);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);


// bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)



Vue.use(PrettyCheckbox);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')