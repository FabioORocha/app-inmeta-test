<template>
  <div class="container">
    <div class="inner">
      <h3>Minhas Solicitações de Troca</h3>
      <table class="trade-table">
        <thead>
          <tr>
            <th>Cartas Ofertadas</th>
            <th>Cartas Recebidas</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="trade in myTrades" :key="trade.id">
            <td>
              <ul>
                <li v-for="offering in filteredTradeCards(trade.tradeCards, 'OFFERING')" :key="offering.id">
                  {{ offering.card.name }}
                </li>
              </ul>
            </td>
            <td>
              <ul>
                <li v-for="receiving in filteredTradeCards(trade.tradeCards, 'RECEIVING')" :key="receiving.id">
                  {{ receiving.card.name }}
                </li>
              </ul>
            </td>
            <td>
              <button @click="confirmDelete(trade.id)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    myTrades() {
      return this.$store.getters.myTrades;
    }
  },
  methods: {
    filteredTradeCards(tradeCards, type) {
      return tradeCards.filter(card => card.type === type);
    },
    confirmDelete(tradeId) {
      if (confirm("Tem certeza que deseja excluir esta troca?")) {
        this.deleteTrade(tradeId);
      }
    },
    async deleteTrade(tradeId) {
      try {
        await this.$store.dispatch('deleteTrade', tradeId);
        // Atualiza as trades do usuário após a exclusão
        await this.$store.dispatch('fetchMyTrades');
      } catch (error) {
        console.error('Erro ao excluir trade:', error);
      }
    },
  },
  mounted() {
    // Busca as trades do usuário logado ao montar o componente
    this.$store.dispatch('fetchMyTrades');
  }
};
</script>

<style scoped>

  .container{
    max-width: 800px;
    padding: 1rem;
    margin: auto;

    .inner{
      padding: 1rem;
      border: 2px solid #5A639C;
      padding-bottom: 2rem;
      margin-bottom: 1.5rem;
      border-radius: 8px;
    }
  }

  h3{
    color: #5A639C;
  }

  .trade-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
  }

  .trade-table th, .trade-table td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  .trade-table th {
    background-color: #f2f2f2;
  }

  .trade-table tr:hover {
    background-color: #f5f5f5;
  }

  .trade-table button {
    background-color: #ff5555;
    color: #fff;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .trade-table button:hover {
    background-color: #cc0000;
  }
</style>
