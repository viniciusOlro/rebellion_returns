<template>
  <div id="app">
    <Nav />
    <vue-page-transition name="fade-in-left">
      <router-view/>
    </vue-page-transition>
    <Footer />
  </div>
</template>

<script>

import Nav from './components/Nav.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Nav,
    Footer
  }
}
</script>

<style>

:root {
  font-size: 62.5%;
}

*, *::after, *::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-size: 1.6rem;
  font-family: 'Raleway', sans-serif;
  background: rgb(2,0,36);
  background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(8,6,11,1) 35%);
  background-attachment: fixed;
  color: #fff;
  height: 100vh;
}

a {
  text-decoration: none;
  color: inherit;
  transition: color ease-in .1s;
}

a:hover {
  color: orange;
}

li {
  list-style: none;
}

label {
  font-weight: 300;
}

input, button {
  height: 60%;
  width: 30rem;
  border: none;
  outline: none;
  border-radius: .7rem;
  padding: 1.3rem;
  background-color: rgba(168, 168, 168, 0.1);
  color: white;
  font-family: 'Raleway', sans-serif;
}

input[type="submit"], button {
  width: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: orange;
  color: white;
  cursor: pointer;
  transition: all ease-in .1s;
}

input[type="date"] {
  font-family: 'Raleway', sans-serif;
}

input[type="date"]::-webkit-inner-spin-button,
input[type="date"]::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
}

input:focus::placeholder {
  color: transparent;
}

* {
  scrollbar-width: thin;
  scrollbar-color: rgb(0, 0, 63) rgb(0, 0, 139);
}

body::-webkit-scrollbar {
  width: 1.2rem;               
}

body::-webkit-scrollbar-track {
  background: black;
}
  
body::-webkit-scrollbar-thumb {
  background-color: rgb(0, 0, 63); 
  border: .1rem solid rgb(0, 0, 139);
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.delete {
  background-color: rgb(223, 0, 0);
}

.edit {
  background-color: rgb(7, 69, 185);
}

.container {
  width: 90%;
  margin: 0 auto;
}

.title {
  font-weight: 300;
  margin-bottom: 1.3rem;
  text-align: center;
  font-size: 1.5rem;
  text-transform: uppercase;
}

.error {
  color: orange;
  padding: .3rem;
  border-radius: .5rem;
  font-size: 1.2rem;
  position: relative;
  text-align: center;
}

</style>
