import Vuex from 'vuex';
import Vue from 'vue';
import users from './modules/index';

// Load vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    users
  }
});
