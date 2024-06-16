<template>
  <div class="container">
    <div class="trade">
      <h1 class="title">Solicitar troca</h1>
      <div v-if="loading">Carregando...</div>
      <div v-else>
        <h3>Minhas cartas</h3>
        <div class="cards">
          <div v-for="card in filteredUserCards" :key="card.id" class="card">
            <label :for="'offering-' + card.id">
              <img :src="card.imageUrl" :alt="card.name" />
              <p>{{ card.name }}</p>
              <input type="checkbox" :id="'offering-' + card.id" @change="toggleSelection(card, 'OFFERING')" />
            </label>
          </div>
        </div>
        <h3>Todas cartas</h3>
        <div class="cards">
          <div v-for="card in filteredAllCards" :key="card.id" class="card">
            <label :for="'receiving-' + card.id">
              <img :src="card.imageUrl" :alt="card.name" />
              <p>{{ card.name }}</p>
              <input type="checkbox" :id="'receiving-' + card.id" @change="toggleSelection(card, 'RECEIVING')" />
            </label>
          </div>
        </div>
        <h3>Cartas selecionadas</h3>
        <div class="selected-cards">
          <h3>Oferecendo</h3>
          <div class="cards">
            <div v-for="card in selectedOfferingCards" :key="card.id" class="card">
              <img :src="card.imageUrl" :alt="card.name" />
              <p>{{ card.name }}</p>
            </div>
          </div>
          <h3>Recebendo</h3>
          <div class="cards">
            <div v-for="card in selectedReceivingCards" :key="card.id" class="card">
              <img :src="card.imageUrl" :alt="card.name" />
              <p>{{ card.name }}</p>
            </div>
          </div>
        </div>
        <button @click="submitTrade">Salvar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      loading: true,
      selectedOfferingCards: [],
      selectedReceivingCards: []
    };
  },
  computed: {
    ...mapState({
      userCards: state => state.cards,
      allCards: state => state.allCards
    }),
    filteredUserCards() {
      return this.userCards.filter(card => card.imageUrl && card.description);
    },
    filteredAllCards() {
      return this.allCards.filter(card => card.imageUrl && card.description);
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    ...mapActions(['fetchUserCards', 'fetchAllCards', 'createTrade']),
    async fetchData() {
      await this.fetchUserCards();
      await this.fetchAllCards();
      this.loading = false;
    },
    toggleSelection(card, type) {
      if (type === 'OFFERING') {
        if (this.selectedOfferingCards.includes(card)) {
          this.selectedOfferingCards = this.selectedOfferingCards.filter(c => c.id !== card.id);
        } else {
          this.selectedOfferingCards.push(card);
        }
      } else {
        if (this.selectedReceivingCards.includes(card)) {
          this.selectedReceivingCards = this.selectedReceivingCards.filter(c => c.id !== card.id);
        } else {
          this.selectedReceivingCards.push(card);
        }
      }
    },
    async submitTrade() {
      const tradeData = {
        cards: [
          ...this.selectedOfferingCards.map(card => ({ cardId: card.id, type: 'OFFERING' })),
          ...this.selectedReceivingCards.map(card => ({ cardId: card.id, type: 'RECEIVING' }))
        ]
      };
      try {
        const trade = await this.createTrade(tradeData);
        alert(`Troca registrada com ID: ${trade.tradeId}`);
        this.resetSelections(); // Resetar seleções após sucesso
      } catch (error) {
        console.error('Erro ao criar registro:', error);
        alert('Falha ao criar registro.');
      }
    },
    resetSelections() {
      this.selectedOfferingCards = [];
      this.selectedReceivingCards = [];
    }
  }
};
</script>

<style scoped>

  .container{
    max-width: 800px;
    padding: 1rem;
    margin: auto;

      .trade{
        padding: 1rem;
        border: 2px solid #5A639C;
        padding-bottom: 2rem;
        border-radius: 8px;

        .title{
          color: #5A639C;
        }
      }
  }

  .cards {
    display: grid;
    grid-template-columns:  repeat(4, 1fr);
    gap: .5rem;

    @media screen and (max-width: 780px) {
      grid-template-columns:  repeat(2, 1fr);
    }
  }

  .card {
    display: inline-block;
    cursor: pointer;
    text-align: center;
    padding: .5rem;
    background-color: #E2BBE9;
    border-radius: 8px;
    font-size: 12px;
    margin: .5rem 0
  }

  h3{
    color: #5A639C;
  }

  .card img {
    max-width: 100px;
  }

  button {
    margin-top: 1em;
    padding: 0.5em 1em;
  }

  .selected-cards {
    margin-top: 1em;
  }
</style>
