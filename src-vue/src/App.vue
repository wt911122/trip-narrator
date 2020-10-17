<template>
  <div id="app">
      <main class="main">
        <router-view v-if="data"></router-view>
      </main>
    <footer class="footer">
        <a href="http://beian.miit.gov.cn" target="_blank">浙ICP备2020037195号</a>
    </footer>
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
.footer{
    background: #fff;
    font-size: 12px;
    text-align: center;
    height: 1.5em;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.main{
    width: 100%;
    height: calc(100vh - 1.5em);
    flex: 1;
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
