import Vue from 'vue';
import { ValidationObserver, ValidationProvider, extend, localize, setInteractionMode } from 'vee-validate';
import { required, email, min , confirmed} from 'vee-validate/dist/rules';
import ja from 'vee-validate/dist/locale/ja.json';

localize('ja', ja);
setInteractionMode('eager');

extend('required', required);
extend('email', email);
extend('min', min);
extend('confirmed', confirmed);

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
