<template>
  <footer>
    <span class="container">Vinícius de Oliveira Rodrigues | Tech Talent | +A Educação</span>
    <div>
      <a href="https://www.linkedin.com/in/viniciusolro/" target="__BLANK">
        <i class="fab fa-linkedin"></i>
      </a>
      <a href="https://github.com/viniciusOlro" target="__BLANK">
        <i class="fab fa-github"></i>
      </a>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style>

footer {
  justify-self: flex-end;
  background-color: rgba(0, 0, 0, .2);
  height: 10rem;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1.2rem;
  padding: 2rem;
  margin-top: auto;
}

</style>