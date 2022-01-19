<template>
  <div id="home">
    <section class="container">
      <main>
        <h1>Seja um <span>rebelde</span></h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore ratione placeat itaque laudantium ad maxime nemo in laboriosam quam aperiam distinctio a laborum, dicta reiciendis dolores! Molestias earum atque a.</p>
      </main>
      <form>
        <label for="email">Cadastre-se e receba novidades da Aliança Rebelde</label>
        <div class="form-group">
          <input type="text" placeholder="Digite seu email...">
          <button @click.prevent.stop>Enviar</button>
        </div>
      </form>
    </section>
    <div>
      <img src="../assets/rebel.png" alt="">
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home'
}
</script>

<style scoped>

#home {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

@media(max-width: 818px) {
  #home {
    display: block;
  }
}

#home div img {
  opacity: .4;
  max-width: 100%;
  min-width: 25rem;
  min-height: 100vh;
}

@media(max-width: 559px) {
  #home div img {
    min-height: 50vh;
  }
}

#home section {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  overflow: hidden;
}

#home section main {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

#home section div h1 {
  font-size: 5rem;
  font-weight: normal;
}

#home section div h1 span {
  font-weight: bold;
}

#home section div p {
  font-weight: 300;
}

.form-group {
  margin-top: 1.3rem;
  display: flex;
  gap: 1.3rem;
}

main h1 {
  font-size: 5vw;
  font-weight: 300;
}

main h1 span {
  font-weight: 900;
}

</style>
