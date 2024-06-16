<template>
  <div class="trades">
    <h1 class="title">Trocas disponiveis</h1>
    <div v-if="loading">Carregando...</div>
    <div v-else>
      <div v-for="trade in trades" :key="trade.id" class="trade">
        <h2>Troca por {{ trade.user.name }}</h2>
        <p>Criado em: {{ new Date(trade.createdAt).toLocaleString() }}</p>
        <h3>Troco</h3>
        <div v-for="card in trade.tradeCards.filter(tc => tc.type === 'OFFERING')" :key="card.id" class="card">
          <img :src="card.card.imageUrl" :alt="card.card.name" @click="showDetails(card.card)" class="card-item" />
        </div>
        <h3>Recebo em troca</h3>
        <div v-for="card in trade.tradeCards.filter(tc => tc.type === 'RECEIVING')" :key="card.id" class="card">
          <img :src="card.card.imageUrl" :alt="card.card.name" @click="showDetails(card.card)"  class="card-item"/>
        </div>
      </div>
      <div class="pagination">
        <button @click="prevPage" :disabled="page === 1">Anterior</button>
        <span>Página {{ page }}</span>
        <button @click="nextPage" :disabled="trades.length < rpp">Próxima</button>
      </div>
    </div>
    <MarketModal v-if="selectedCard" :isVisible="isModalVisible" @close="closeModal">
      <h3>{{ selectedCard.name }}</h3>
      <img :src="selectedCard.imageUrl" :alt="selectedCard.name" />
      <p>{{ selectedCard.description }}</p>
    </MarketModal>
  </div>
</template>

<script>
import axios from 'axios';
import MarketModal from './MarketModal.vue';

export default {
  components: {
    MarketModal
  },
  data() {
    return {
      trades: [],
      loading: true,
      selectedCard: null,
      isModalVisible: false,
      page: 1,
      rpp: 5 // registros por página
    };
  },
  created() {
    this.fetchTrades();
  },
  methods: {
    async fetchTrades() {
      this.loading = true;
      try {
        const response = await axios.get('https://cards-marketplace-api.onrender.com/trades', {
          params: {
            rpp: this.rpp,
            page: this.page
          }
        });
        this.trades = response.data.list;
      } catch (error) {
        console.error('Error fetching trades:', error);
        alert('Failed to load trades. Please try again.');
      } finally {
        this.loading = false;
      }
    },
    showDetails(card) {
      this.selectedCard = card;
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.selectedCard = null;
    },
    nextPage() {
      this.page++;
      this.fetchTrades();
    },
    prevPage() {
      if (this.page > 1) {
        this.page--;
        this.fetchTrades();
      }
    }
  }
};
</script>

<style scoped>
.trades {
  max-width: 800px;
  margin: auto;
  padding: 1rem;
}

.trade {
  border: 2px solid #5A639C;
  padding: 1rem;
  padding-bottom: 2rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;

  p {
    color: #7776B3;
  }
}

.title {
  color: #5A639C;
}

h2, h3 {
  color: #5A639C;
}

p {
  color: #363636;
}

.card {
  display: inline-block;
  margin-right: 1rem;
  cursor: pointer;
}

.card-item {
  transition: 0.25s ease;

  &:hover {
    transform: translate(-8px, -8px);
  }
}

.card img {
  max-width: 100px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

.pagination button {
  margin: 0 1rem;
  padding: 0.5rem 1rem;
  border: none;
  background-color: #5A639C;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination span {
  font-size: 1.2rem;
}
</style>
