<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="loginUser">
      <div>
        <label for="email">Email</label>
        <input type="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" v-model="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async loginUser() {
      try {
        await this.$store.dispatch('loginUser', { email: this.email, password: this.password });
        alert('Sucesso ao logar');
        this.$router.push('/');
      } catch (error) {
        console.error(error);
        alert('Falha ao entrar, tente denovo');
      }
    }
  }
};
</script>

<style scoped>

  .login {
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