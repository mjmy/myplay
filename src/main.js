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


//mixis
import callApi from "./mixins/callApi";
require('video.js/dist/video-js.css');
require('vue-video-player/src/custom-theme.css');
Vue.use(VideoPlayer);
Vue.use(VuePlyr);
Vue.mixin(callApi);
Vue.prototype.$http = axios;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

