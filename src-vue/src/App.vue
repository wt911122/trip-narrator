<template>
  <div id="app">
    <router-view v-if="data"></router-view>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    computed: mapState({
        data: state => state.data,
    }),
    created(){
        console.log('getData')
        this.$store.dispatch('getData');
    }
}
</script>
<style>
body {
    padding: 0;
    margin: 0;
    width: 100vw;
    height: 100vh;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    height: 100%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
