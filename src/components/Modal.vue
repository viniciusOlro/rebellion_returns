<template>
  <div id="modal" v-show="isActive">
    <div class="modal-overlay">
      <span class="outside" @click="$emit('closeModal')"></span>
        <transition name="fade">
        <main class="modal-container" v-show="isActive">
          <i @click="$emit('closeModal')" class="fas fa-times close"></i>
          <div class="modal-container-content" v-show="!isExcluding && !isSuccessfulOperation">
            <lord-icon
              src="https://cdn.lordicon.com/eszyyflr.json"
              trigger="loop"
              colors="primary:#e88c30,secondary:#ffa500"
              stroke="59"
              style="margin: 0 auto; width:150px;height:150px">
            </lord-icon>
            <h1 class="title" v-if="!isEditing">Alistar</h1>
            <h1 class="title" v-else>Editar rebelde</h1>
            <form>
              <input type="text" placeholder="Nome..." v-model="name">
              <input type="text" placeholder="Descrição..." v-model="description" maxlength="100">
              <input type="text" placeholder="Planeta..." v-model="planet">
              <input v-show="!isEditing" type="text" onfocus="(this.type='date')" onblur="(this.type='text')" placeholder="Data de nascimento..." v-model="birthDate"/>
              <input type="date" v-show="isEditing" v-model="birthDate">
            </form>
            <p class="save" v-if="!isEditing" @click="addRebelToSave(), $emit('saveRebel')"><i class="fas fa-check-circle"></i>Salvar</p>
            <p class="save" v-else @click="addRebelToSave(), $emit('editRebel')"><i class="fas fa-user-edit"></i>Atualizar</p>
          </div>
          <div class="excluding" v-show="isExcluding && !isSuccessfulOperation">
            <h1 class="title">Excluir</h1>
            <i class="fas fa-exclamation-triangle ill"></i>
            <h2>Tem certeza?</h2>
            <span>O Rebelde será desfiliado e <br>não poderá lutar pela Aliança Rebelde!</span>
            <p class="exclude" @click="$emit('deleteRebel')"><i class="fas fa-trash-alt"></i> Excluir</p>
          </div>
          <div class="successful" v-show="isSuccessfulOperation">
          <lord-icon
            src="https://cdn.lordicon.com/lupuorrc.json"
            trigger="loop"
            colors="primary:#00a300,secondary:#ffa500"
            stroke="72"
            style="width:150px;height:150px">
          </lord-icon>
            <h2>Sucesso!</h2>
            <span>Operação bem sucedida.</span>
          </div>
        </main>
        </transition>
      <span v-show="isValidationError" class="error"><i class="fas fa-exclamation-circle"></i> Você não pode enviar dados vazios.
      </span>
    </div>
  </div>
</template>

<script>

import { mapMutations, mapState } from 'vuex'

export default {
  name: 'Modal',
  data() {
    return {
      name: '',
      description: '',
      planet: '',
      birthDate: ''
    }
  },
  computed: {
    ...mapState(['isEditing', 'isValidationError', 'isSuccessfulOperation'])
  },
  props: {
    isActive: false,
    isExcluding: false,
    rebelToEdit: {}
  },
  emits: ['closeModal', 'saveRebel'],
  methods: {
    ...mapMutations(['ADD_REBEL_TO_SAVE', 'SET_IS_VALIDATION_ERROR', 'DISABLE_IS_VALIDATION_ERROR']),
    addRebelToSave() {  
      const rebel = {
        name: this.name,
        description: this.description,
        planet: this.planet,
        birthDate: this.birthDate
      }
      if(!rebel.name || !rebel.description || !rebel.planet || !rebel.birthDate) {
        this.SET_IS_VALIDATION_ERROR()
      } else {
        this.ADD_REBEL_TO_SAVE(rebel)
      }
    }
  },
  watch: {
    rebelToEdit: {
      deep: true,
      handler: function(newVal, oldVal) {
        if(newVal) {
          const { name, description, planet, birthDate } = newVal
          this.name = name
          this.description = description
          this.planet = planet
          this.birthDate = birthDate
        }
      }
    }
  }
}
</script>

<style>

.outside {
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  height: 100vh;
  width: 100vw;
}

.modal-overlay {
  height: 100vh;
  width: 100vw;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  justify-content: center;
  align-items: center;
}

.modal-container {
  background-color: rgb(37, 37, 37);
  width: auto;
  border-radius: 5px;
  position: relative;
  padding: 1.3rem;
  
}

.close {
  position: absolute;
  top: 0;
  right: 0;
  padding: 1.3rem;
  cursor: pointer;
  color: rgb(247, 15, 15);
}

.modal-container form {
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
}

.modal-container-content {
  display: flex;
  flex-direction: column;
}

.save {
  margin-top: 1.3rem;
  text-align: center;
  cursor: pointer;
  color: #00a300;
}

.save i {
  margin-right: .5rem;
}

.exclude {
  cursor: pointer;
  color: rgb(218, 32, 32);
}

.excluding {
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  text-align: center;
}

.excluding .ill {
  font-size: 15rem;
  color: #ffa500;
}

.excluding h2 {
  font-size: 3rem;
  padding: 2rem;
}

.excluding span {
  padding: 1.3rem;
  font-size: 1.4rem;
}

.successful {
  padding: 1.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.3rem;
}

.successful h2 {
  font-weight: 300;
  color: #00a300;
  font-size: 3rem;
}

.fade-enter-active, .fade-leave-active {
  transition: all .3s ease-in;
}
.fade-enter {
  opacity: 0;
  transform: translateY(25%);
}

.fade-leave-to {
  transform: translateY(200px);
  opacity: 0;
}

</style>