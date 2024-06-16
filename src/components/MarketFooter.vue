<template>
  <footer class="footer">
    <p>Desenvolvedor: Fábio Oliveira da Rocha</p>
    <p>Tecnologia utilizada: Vue.js</p>
  </footer>
</template>

<script>
export default {
  name: 'MarketFooter'
};
</script>

<style scoped>
  .footer {
    background-color: #f8f9fa;
    padding: 1em;
    text-align: center;
    border-top: 1px solid #e7e7e7;
    top: 100%;
    position: sticky;
    left: 0;
  }

  .footer p {
    margin: 0.5em 0;
    color: #333;
  }
</style>