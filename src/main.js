import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import VideoPlayer from 'vue-video-player'
import 'videojs-contrib-hls'

import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'
import axios from 'axios';

import firebase from 'firebase/app';
import 'firebase/database';
//mixis
import callApi from "./mixins/callApi";
// import './firebase';

import anime from 'animejs/lib/anime.es.js';

import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS

require('video.js/dist/video-js.css');
require('vue-video-player/src/custom-theme.css');
Vue.use(VideoPlayer);
Vue.use(VuePlyr);
Vue.use(iView);
Vue.mixin(callApi);
Vue.prototype.$http = axios;
Vue.config.productionTip = false;

Vue.prototype.$anime = anime; 

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");

