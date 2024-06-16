<template>
  <div class="modal" v-if="isVisible">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h3>{{ card.name }}</h3>
      <img :src="card.imageUrl" :alt="card.name" />
      <p>{{ card.description }}</p>
      <button @click="addCard">Add to My Cards</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: Boolean,
    card: Object
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    addCard() {
      this.$emit('addCard', this.card.id);
    }
  }
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  position: relative;
  background-color: white;
  padding: 2em;
  border-radius: 8px;
  max-width: 500px;
  text-align: center;
}

.modal img {
  max-width: 100%;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: red;
}
</style>
