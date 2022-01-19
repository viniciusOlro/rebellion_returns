<template>
  <header>
    <div class="container">
      <nav>
        <h1>Rebellion</h1>
        <ul>
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li>
            <router-link to="/rebels">Rebeldes</router-link>
          </li>
          <li v-show="isAuthenticated">
            <p class="logout" @click="LOGOUT()"><i class="fas fa-sign-out-alt"></i> Sair</p>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>

import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Nav',
  computed: {
    ...mapState(['isAuthenticated'])
  },
  methods: {
    ...mapMutations(['LOGOUT'])
  }
}
</script>

<style>

header {
  background-color: rgba(0, 0, 0, .2);
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
}

ul {
  display: flex;
  align-items: center;
  height: 100%;
  gap: 1.2rem;
  font-size: 1.4rem;
  font-weight: 300;
}

nav h1 {
  font-size: 1.8rem;
  font-family: 'Raleway', sans-serif;
  font-weight: 300;
  text-transform: uppercase;
}

.logout {
  color: orange;
  cursor: pointer;
}

</style>