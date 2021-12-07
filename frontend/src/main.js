import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// use checkbox
Vue.config.productionTip = false
import PrettyCheckbox from 'pretty-checkbox-vue';


// use element
import { Input, InputNumber, Button, ButtonGroup, Notification } from 'element-ui';
import { TimePicker, TimeSelect } from 'element-ui';
import { Radio, RadioGroup, RadioButton, Dropdown, DropdownMenu, DropdownItem } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(InputNumber);
Vue.use(Input);
Vue.use(TimePicker);
Vue.use(TimeSelect);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);

Vue.prototype.$notify = Notification;


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