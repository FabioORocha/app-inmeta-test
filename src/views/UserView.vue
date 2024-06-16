<template>
  <div class="usuario">
    <h1 class="title">Perfil de usuario</h1>
    <UserProfile/>
    <MarketCardList/>
    <MarketTrade/>
    <MyTradeRequests/>
  </div>
</template>

<script>
  import UserProfile from '@/components/UserProfile.vue'
  import MarketCardList from '@/components/MarketCardList.vue'
  import MarketTrade from '@/components/MarketTrade.vue'
  import MyTradeRequests from '@/components/MyTradeRequests.vue'

  export default {
    name: 'UserView',
    components: {
      UserProfile,
      MarketCardList,
      MarketTrade,
      MyTradeRequests
    },
  }
</script>

<style scoped>
  .title{
    color: #5A639C;
  }
</style>