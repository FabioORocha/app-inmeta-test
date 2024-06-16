import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user')) || null,
    cards: [],
    allCards: [],
    trades: [],
    myTrades: []
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    setCards(state, cards) {
      state.cards = cards;
    },
    setAllCards(state, cards) {
      state.allCards = cards;
    },
    setTrades(state, trades) {
      state.trades = trades;
    },
    setMyTrades(state, trades) {
      state.myTrades = trades;
    },
    clearAuthData(state) {
      state.token = '';
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  actions: {

    //faz login e guarda o usuario 

    async loginUser({ commit }, authData) {
      const response = await axios.post('https://cards-marketplace-api.onrender.com/login', {
        email: authData.email,
        password: authData.password
      });
      const token = response.data.token;
      const user = response.data.user;
      commit('setToken', token);
      commit('setUser', user);
      return response;
    },

    //Verifica se o usuario esta logado

    async fetchUser({ commit, state }) {
      if (!state.token) return;
      try {
        const response = await axios.get('https://cards-marketplace-api.onrender.com/me', {
          headers: { Authorization: `Bearer ${state.token}` }
        });
        commit('setUser', response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },

    //Adiciona cartas ao usuario

    async fetchUserCards({ commit, state }) {
      if (!state.token) return;
      try {
        const response = await axios.get('https://cards-marketplace-api.onrender.com/me/cards', {
          headers: { Authorization: `Bearer ${state.token}` }
        });
        commit('setCards', response.data);
      } catch (error) {
        console.error('Error fetching user cards:', error);
      }
    },

    //Retorna todas as cartas

    async fetchAllCards({ commit }) {
      try {
        const response = await axios.get('https://cards-marketplace-api.onrender.com/cards', {
          params: { rpp: 10, page: 1 }
        });
        commit('setAllCards', response.data.list);
      } catch (error) {
        console.error('Error fetching all cards:', error);
      }
    },

    // Registra uma nova solicitação de troca e atualiza as trocas do usuário
    async createTrade({ state, dispatch }, tradeData) {
      try {
        const response = await axios.post('https://cards-marketplace-api.onrender.com/trades', tradeData, {
          headers: { Authorization: `Bearer ${state.token}` }
        });
        // Atualiza as trocas do usuário
        await dispatch('fetchMyTrades');
        return response.data;
      } catch (error) {
        console.error('Error creating trade:', error);
        throw error;
      }
    },

    // Retorna as trocas registradas e filtra as trocas do usuário
    async fetchMyTrades({ commit, state }) {
      if (!state.token) return;
      try {
        const response = await axios.get('https://cards-marketplace-api.onrender.com/trades', {
          params: { rpp: 10, page: 1 },
          headers: { Authorization: `Bearer ${state.token}` }
        });
        const filteredTrades = response.data.list.filter(trade => trade.userId === state.user.id);
        commit('setMyTrades', filteredTrades);
      } catch (error) {
        console.error('Error fetching my trades:', error);
      }
    },

    //Remove um registro

    async deleteTrade({ commit, state }, tradeId) {
      try {
        await axios.delete(`https://cards-marketplace-api.onrender.com/trades/${tradeId}`, {
          headers: { Authorization: `Bearer ${state.token}` }
        });

        // Atualiza as trades do usuário logado
        const userId = state.user.id;
        const userTradesResponse = await axios.get(`https://cards-marketplace-api.onrender.com/trades/${userId}`, {
          headers: { Authorization: `Bearer ${state.token}` }
        });
        commit('setMyTrades', userTradesResponse.data.list);

        // Atualiza todas as trades
        const allTradesResponse = await axios.get('https://cards-marketplace-api.onrender.com/trades', {
          params: { rpp: 10, page: 1 },
          headers: { Authorization: `Bearer ${state.token}` }
        });
        commit('setTrades', allTradesResponse.data.list);
      } catch (error) {
        console.error('Error deleting trade:', error);
      }
    },

    checkAuth({ state, dispatch }) {
      if (state.token && !state.user) {
        dispatch('fetchUser');
      }
    }
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
    user(state) {
      return state.user;
    },
    cards(state) {
      return state.cards;
    },
    allCards(state) {
      return state.allCards;
    },
    trades(state) {
      return state.trades;
    },
    myTrades(state) {
      return state.myTrades;
    },
    userId(state) {
      return state.user ? state.user.id : null;
    }
  }
});
