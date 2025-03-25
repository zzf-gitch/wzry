<template>
  <div id="app">
    <router-view></router-view>
  </div>

</template>

<style>
* {
  margin: 0;
  padding: 0;
}

body,
html {
  width: 100%;
  height: 100%;
  /* // background-image: url(assets/wappler.jpg); */
  /* // background-repeat: no-repeat; */
  /* // background-size: 100% 100%; */
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* // text-align: center; */
  color: #2c3e50;
  height: 100%;
  margin: 0;
  padding: 0;
}

#nprogress {
  pointer-events: none;
}

#nprogress .bar {
  background-image: linear-gradient(45deg, #30cfd0 0%, #330867 100%);
  opacity: 0.75;
  position: fixed;
  z-index: 1031;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
}
</style>
