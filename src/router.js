import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Find  from "./components/Search.vue";
import Talkbox from "./components/fireBase/Talkbox.vue";
import Canvas  from "./components/Canvas.vue";
import Anime  from "./components/Anime.vue"
import ivHome  from "./components/iview/ivHome.vue"
import mescroll  from "./components/mescroll.vue"
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/myhome",
      name: "myplay",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import("./views/Myhome.vue")
    },
    {
      path: "/Find",
      name: "Find",
      component: Find
    },
    {
      path:"/Talkbox",
      name:'Talkbox',
      component: Talkbox
    },
    {
      path:"/Banner",
      name:'Banner',
      component: () =>
        import("./components/Banner.vue")
    },
    {
      path:"/Canvas",
      name:"Canvas",
      component : Canvas
    },
    {
      path:"/Anime",
      name:"Anime",
      component : Anime
    },
    {
      path:'/iview',
      name:'ivHome',
      component:ivHome,
    },
    {
      path:'/mescroll',
      name:'mescroll',
      component:mescroll
    }

  ]
});
