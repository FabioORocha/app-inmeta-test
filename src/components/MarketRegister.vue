<template>
  <div class="register">
    <h1>Registro</h1>
    <form @submit.prevent="registerUser">
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" required>
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required>
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: ''
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await axios.post('https://cards-marketplace-api.onrender.com/register', {
          name: this.name,
          email: this.email,
          password: this.password
        });
        alert(`User registered with ID: ${response.data.userId}`);
      } catch (error) {
        console.error(error);
        alert('Registration failed. Please try again.');
      }
    }
  }
};
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: auto;
  padding: 1rem;
  border: 2px solid #5A639C;
  border-radius: 1rem;
  margin-top: 2rem;
}

h1{
   color: #5A639C;
}

div {
  margin-bottom: 1rem;
}

label {
  margin-bottom: .5rem;
  color: #7776B3;
  display: block;
}

input {
  border: 1px solid #9B86BD;
  padding: .5rem;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
}

button {
  padding: 0.7rem;
  color: #fff;
  background-color: #9B86BD;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #E2BBE9;
}
</style>
