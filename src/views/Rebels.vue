<template>
  <div id="rebels">
    <div class="container">
      <div class="search-register-group">
        <form>
          <input type="text" v-model="searchRebelInput" placeholder="Busque um rebelde...">
          <button @click.prevent.stop="(modalIsActive = true), (rebelToEdit = {})">Alistar <i class="fas fa-jedi"></i></button>
        </form>
      </div>
      <div>
        <div v-if="searchedRebels.length < 1">
          <RebelItem
          v-for="rebel in rebelsData" 
          :key="rebel.id" 
          :rebel="rebel"
          :name="rebel.name" 
          :description="rebel.description"
          :planet="rebel.planet"
          :birthDate="rebel.birthDate"
          :id="rebel.id"
          @sendRebelData="sendRebelData(rebel)"
          @askToDelete="askToDelete(rebel)"
          />
        </div>
        <div v-else-if="searchedRebels.length > 0">
          <RebelItem 
          v-for="rebel in rebelsSearched" 
          :key="rebel.id + 1" 
          :rebel="rebel"
          :name="rebel.name" 
          :description="rebel.description"
          :planet="rebel.planet"
          :birthDate="rebel.birthDate"
          :id="rebel.id"
          @sendRebelData="sendRebelData(rebel)"
          @askToDelete="askToDelete(rebel)"
          @updateView="updateView()"
          />
        </div>
        <div v-show="rebelsData.length < 1">
          <div class="loading">
            <lord-icon
              src="https://cdn.lordicon.com/xjovhxra.json"
              trigger="loop"
              colors="primary:#ffa500,secondary:#08a88a"
              style="width:250px;height:250px">
            </lord-icon>
            <h1 class="title">Aguarde!</h1>
            <h2>Estamos buscando nos confins da galáxia<br> a lista de rebeldes alistados!</h2>
          </div>
        </div>
        <Modal :isActive="modalIsActive" :isExcluding="modalIsExcluding" :rebelToEdit="rebelToEdit" @closeModal="resetTheModal()" @saveRebel="saveRebel()" @editRebel="editRebel()" @deleteRebel="deleteRebel()"/>
      </div>
    </div>
  </div>
</template>

<script>

import removeAccents from 'remove-accents'

import { mapMutations, mapActions, mapState } from 'vuex'

import RebelItem from '../components/RebelItem.vue'
import Modal from '../components/Modal.vue'

export default {
  name: 'Rebels',
  components: {
    RebelItem,
    Modal
  },
  data() {
    return {
      modalIsActive: false,
      modalIsExcluding: false,
      rebelToEdit: {},
      rebelToDelete: {},
      searchRebelInput: '',
      rebelsSearched: [],
      getRebelDataStopper: false
    }
  },
  computed: {
    ...mapState(['rebelsData', 'rebelToSave', 'searchedRebels'])
  },
  methods: {
    ...mapMutations(['LOGOUT', 'SET_IS_EDITING', 'SET_NOT_IS_EDITING', 'SET_IS_VALIDATION_ERROR', 'DISABLE_IS_VALIDATION_ERROR', 'SET_IS_SUCCESSFUL_OPERATION', 'DISABLE_IS_SUCCESSFUL_OPERATION', 'ADD_REBEL_TO_SEARCH_LIST', 'CLEAN_REBEL_SEARCH_LIST']),
    ...mapActions(['getRebelsData', 'registerRebel', 'updateRebel', 'removeRebel']),
    saveRebel() {
      this.registerRebel()
      .then(res => {
        this.success()
      })
    },
    sendRebelData(rebelToEdit) {
      this.SET_IS_EDITING()
      const birthDate = rebelToEdit.birthDate.split('/').reverse().join('-')
      const { id, name, description, planet } = rebelToEdit
      const rebel = { id, name, description, planet, birthDate }
      this.rebelToEdit = rebel
      this.modalIsActive = true
    },
    editRebel() {
      this.updateRebel(this.rebelToEdit)
      .then(res => {
        this.rebelToEdit = {}
        this.success()
      })
    },
    updateView() {
      this.searchRebelInput = ''
    },
    resetTheModal() {
      this.modalIsActive = false
      this.rebelToEdit = {} 
      this.modalIsExcluding = false
      this.SET_NOT_IS_EDITING()
      this.rebelToDelete = {}
      this.DISABLE_IS_VALIDATION_ERROR()
      this.DISABLE_IS_SUCCESSFUL_OPERATION()
    },
    askToDelete(rebel) {
      this.rebelToDelete = rebel
      this.modalIsActive = true
      this.modalIsExcluding = true
    },
    deleteRebel() {
      this.removeRebel(this.rebelToDelete)
      this.success()
    },
    success() {
      this.SET_IS_SUCCESSFUL_OPERATION()
      setTimeout(() => {
        this.DISABLE_IS_SUCCESSFUL_OPERATION()
        this.resetTheModal()
      }, 2000)
    }
  },
  watch: {
    searchRebelInput(newVal, oldVal) {
      const rebelsSearched = this.rebelsData.filter(rebel => removeAccents((rebel.name).toLowerCase()).includes((newVal.toLowerCase())))
      if(rebelsSearched.length > 0) {
        
        rebelsSearched.forEach(rebel => {
          if(!this.searchedRebels.some(addedRebel => addedRebel.id === rebel.id)) {
            this.ADD_REBEL_TO_SEARCH_LIST(rebel)
          }

          this.rebelsSearched = rebelsSearched
          
          // console.log("FORAM ACHADOS: ", rebelsSearched)
          // console.log("FORAM PRO VUEX: ", this.searchedRebels)
        })
      } 
      
      if(newVal === '') {
        this.CLEAN_REBEL_SEARCH_LIST()
        this.getRebelsData()
      }
      /**
       * Chamar a request de rebeldes cadastrados quando o usuário começa a remover o nome pesquisado.
       * 
       * getRebelDataStopper => O atributo impede que a função faça o request novamente após o usuário remover o primeiro caractere do nome pesquisado, impedindo que requests excessivos sejam realizados 
       */

      if(rebelsSearched.length < 1 && this.searchedRebels.length > 0 && !this.getRebelDataStopper) {
        this.getRebelDataStopper = true
        this.CLEAN_REBEL_SEARCH_LIST()
        this.getRebelsData()
      }
    }
  },
  mounted() {
    this.getRebelsData()
  }
}
</script>

<style>

.search-register-group form {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 5rem 0;
}

i {
  margin-left: .5rem;
}

.loading {
  display: inline-block;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loading h2 {
  color: #ffa500;
  font-weight: 300;
  font-size: 1.4rem;
}

</style>