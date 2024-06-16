<template>
  <div class="card-list">
    <div class="container">
      <h3>Mercado de cartas</h3>
      <div v-if="loading">Carregando...</div>
      <div class="card-container" v-else>
        <div class="cards">
          <div v-for="card in filteredAllCards" :key="card.id" class="card">
            <img :src="card.imageUrl" :alt="card.name" @click="showDetails(card)" />
          </div>
        </div>
      </div>
      <MarketCardDetailModal v-if="selectedCard" :isVisible="isModalVisible" :card="selectedCard" @close="closeModal" @addCard="addCardToUser" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import MarketCardDetailModal from './MarketCardDetailModal.vue';

export default {
  components: {
    MarketCardDetailModal
  },
  data() {
    return {
      loading: true,
      selectedCard: null,
      isModalVisible: false
    };
  },
  computed: {
    ...mapState(['allCards']),
    filteredAllCards() {
      return this.allCards.filter(card => card.imageUrl && card.description);
    }
  },
  created() {
    this.fetchAllCards();
  },
  methods: {
    ...mapActions(['fetchAllCards', 'addUserCard']),
    async fetchAllCards() {
      await this.$store.dispatch('fetchAllCards');
      this.loading = false;
    },
    showDetails(card) {
      this.selectedCard = card;
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.selectedCard = null;
    },
    async addCardToUser(cardId) {
      await this.$store.dispatch('addUserCard', [cardId]);
      alert('Card added to your collection!');
      this.closeModal();
    }
  }
};
</script>

<style scoped>
  .card-list {
    max-width: 800px;
    padding: 1rem;
    margin: auto;

    .container{
      padding: 1rem;
      border: 2px solid #5A639C;
      padding-bottom: 2rem;
      border-radius: 8px;

      h3{
        color: #5A639C;
      }
    }
  }

  .card-container{
    display: flex;
    justify-content: center;
  }

  .cards {
    display: flex;
    flex-wrap: wrap;
  }

  .card {
    display: inline-block;
    margin-right: .5rem;
    cursor: pointer;
    text-align: center;

    transition: 0.25s ease;

    &:hover {
      transform: translate(-8px, -8px);
    }
  }

  .card img {
    max-width: 100px;
  }
</style>
