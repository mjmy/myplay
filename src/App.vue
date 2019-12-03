<template>
  <div id="app">
    <div id="nav" v-if="$route.path != '/iView'">
      <router-link to="/">Home</router-link> |
      <router-link to="/Myhome">myhome</router-link> |
      <router-link to="/Talkbox">TalkBox</router-link> |
      <router-link to="/Banner">Banner</router-link> |
      <router-link to="/Canvas">Canvas</router-link> |
      <router-link to="/Anime">Anime</router-link> |
      <router-link to="/iView">iView</router-link> |
      <router-link to="/mescroll">mescroll</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/maps">Map</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  position: absolute;
}
#nav {
  padding: 30px;

  background: -webkit-linear-gradient(
    top,
    rgba(0, 0, 0, 0) -1%,
    rgba(0, 0, 0, 0) 1%,
    rgba(0, 0, 0, 0) 5%,
    rgba(0, 0, 0, 0.65) 100%
  ); /* Chrome10-25,Safari5.1-6 */

  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
