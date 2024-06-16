<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/user">Usuario</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/register">Registro</router-link>
  </nav>
  <router-view/>
  <MarketFooter />
</template>

<script>

  import MarketFooter from './components/MarketFooter.vue';

  export default {
    components: {
      MarketFooter
    }
  };

</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #363636;
    min-height: 100vh;
  }

  nav {
    padding: 30px;
    background-color: #E2BBE9;
  }

  nav a {
    font-weight: bold;
    color: #7776B3;

    &:hover{
      color: #5A639C;
    }
  }

  nav a.router-link-exact-active {
    color: #5A639C;
  }
</style>
