<template>
  <div id="login">
    <div class="container">
      <h1 class="title">Login</h1>
      <form @submit.prevent.stop="submitAuth()">
        <input type="text" placeholder="Usuário..." v-model="username">
        <input type="password" placeholder="Senha..." v-model="pass">
        <input type="submit" value="Entrar">
      </form>
    </div>
    <transition name="slide">
      <span v-show="isAuthError" class="error"><i class="fas fa-exclamation-circle"></i> Usuários e senha incorretos. Por favor, tente novamente.</span>
    </transition>
  </div>
</template>

<script>

import { mapMutations, mapState } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      pass: ''
    }
  },
  computed: {
    ...mapState(['isAuthError'])
  },
  methods: {
    ...mapMutations(['AUTHENTICATE', 'DISABLE_IS_AUTH_ERROR']),
    submitAuth() {
      const credentials = {
        username: this.username,
        pass: this.pass
      }
      this.AUTHENTICATE(credentials)
    }
  },
  beforeRouteLeave(to, from, next) {
    this.DISABLE_IS_AUTH_ERROR()
    next()
  }
}
</script>

<style scoped>

#login {
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  align-items: center;
  justify-content: center;
}

.container {
  padding: 1.3rem;
  border-radius: 1.5rem;
  background-color: rgba(106, 90, 205, .1);
  width: auto;
  height: auto;
}

.container form {
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
}

@media(max-width: 375px) {
  .container form input {
    width: auto;
  }
}

.container form input[type="submit"] {
  width: 100%;
}


</style>