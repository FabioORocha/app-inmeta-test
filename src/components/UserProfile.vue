<template>
  <div class="user-profile">
    <div v-if="loading">Carregando...</div>
    <div v-else-if="!isAuthenticated">Usuário não autenticado. Faça login para acessar o perfil.</div>
    <div v-else>
      <div class="user-info">
        <h2>{{ user.name }}</h2>
        <p>Email: {{ user.email }}</p>
      </div>
      <div class="user-cards">
        <h3>Minhas cartas</h3>
        <div v-for="card in cards" :key="card.id" class="card">
          <img :src="card.imageUrl" :alt="card.name" @click="showDetails(card)" />
        </div>
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
import { mapState, mapActions } from 'vuex';
import MarketModal from './MarketModal.vue';

export default {
  components: {
    MarketModal
  },
  data() {
    return {
      loading: true,
      selectedCard: null,
      isModalVisible: false
    };
  },
  computed: {
    ...mapState(['user', 'cards']),
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  created() {
    this.checkAuthAndFetchData();
  },
  methods: {
    ...mapActions(['fetchUser', 'fetchUserCards']),
    async checkAuthAndFetchData() {
      await this.$store.dispatch('checkAuth');
      if (!this.isAuthenticated) {
        // Redireciona para a página de login se o usuário não estiver autenticado
        this.$router.push('/login');
      } else {
        await this.fetchUserData();
      }
    },
    async fetchUserData() {
      await this.fetchUser();
      await this.fetchUserCards();
      this.loading = false;
    },
    showDetails(card) {
      this.selectedCard = card;
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.selectedCard = null;
    }
  }
};
</script>

<style scoped>
  .user-profile {
    max-width: 800px;
    margin: auto;
    padding: 1rem;
  }

  .user-info {
    background-color: #E2BBE9;
    padding: 2rem;
    color: #5A639C;
    margin-bottom: 1.5rem;
    border-radius: 8px;
  }

  .user-cards {
    border: 2px solid #5A639C;
    padding: 1rem;
    padding-bottom: 2rem;
    border-radius: 8px;
    color: #5A639C;
  }

  .card {
    display: inline-block;
    margin-right: 1em;
    cursor: pointer;

    transition: 0.25s ease;

    &:hover {
      transform: translate(-8px, -8px);
    }
  }

  .card img {
    max-width: 100px;
  }

  .modal {
    background-color: white;
    padding: 1em;
    border-radius: 8px;
    max-width: 500px;
    margin: auto;
    text-align: center;
  }

  .modal img {
    max-width: 100%;
  }
</style>
