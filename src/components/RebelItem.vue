<template>
  <div id="rebel-item" :class="{birthday: isBirthday}">
    <div>
      <img v-show="!isBirthday" class="rebellion-logo" src="../assets/rebel-icon.svg">
      <lord-icon
        v-show="isBirthday"
        src="https://cdn.lordicon.com/lupuorrc.json"
        trigger="loop"
        colors="primary:#00a300,secondary:#ffa500"
        stroke="72"
        style="width:150px;height:150px">
      </lord-icon>
    </div>
    <div class="content-group">
      <div>
        <h1>{{ name }} <i class="fas fa-user-astronaut"></i></h1>
        <h2 class="rebel-motivation">{{ capitalizeFirstLetter(description) }}</h2>
      </div>
      <div>
        <p>{{ id }}<i class="fas fa-id-card-alt"></i></p>
        <p :class="{birthday_text: isBirthday}">{{ birthDate }}<i class="fas fa-calendar-alt"></i></p>
        <p>Planeta {{ capitalizeFirstLetter(planet) }}<i class="fas fa-globe-americas"></i></p>
        <div class="button-group">
          <button class="edit" @click="$emit('sendRebelData'), $emit('updateView')">Editar<i class="fas fa-edit"></i></button>
          <button class="delete" @click="$emit('askToDelete')">Excluir<i class="fas fa-trash-alt"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import dayjs from 'dayjs'

export default {
  name: 'RebelItem',
  props: ['name', 'description', 'planet', 'id', 'birthDate', 'rebel'],
  data() {
    return {
      isBirthday: false
    }
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    checkIsBirthday() {
      const today = dayjs(new Date()).format("DD/MM")
      const birthDate = this.rebel.birthDate.split('/').splice(0, 2).join('/')
      if(birthDate === today) {
        this.isBirthday = true
      } else {
        this.isBirthday = false
      }
    }
  },
  mounted() {
    this.checkIsBirthday()
  },
  updated() {
    this.checkIsBirthday()
  }
}
</script>

<style>

#rebel-item {
  background-color: rgba(106, 90, 205, .1);
  margin-bottom: 1.3rem;
  border-radius: 1.3rem;
  display: flex;
  padding: 1.3rem;
}

.rebellion-logo {
  max-width: 100%;
}

.content-group {
  margin-left: 1.3rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  align-items: center;
  font-weight: 300;
  gap: 2rem;
}

@media(max-width: 684px) {

  #rebel-item {
    height: 100%;
    align-items: center;
  }

  .content-group {
    display: block;
    height: 100%;
    align-items: center;
    text-align: right;
    margin-right: 1.3rem;
  }

  .content-group div:nth-child(2) {
    margin-right: 0;
  }

  .rebellion-logo {
    width: 20rem;
  }

}

@media(max-width: 488px) {
  #rebel-item {
    display: block;
    text-align: center;
  }

  .content-group {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 0 !important;
  }

  .content-group div:nth-child(2) {
    align-items: center !important;
  }

}

.content-group h1 {
  font-weight: 500;
  font-size: 3rem;
  text-transform: uppercase;
}

.content-group div:first-child {
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
}

.content-group div:nth-child(2) {
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: 2rem;
  margin-right: 1.3rem;
  gap: 1.3rem;
  align-items: flex-end;
  justify-content: center;
  font-size: 1.2rem;
  color: rgba(156, 156, 156, .7);
}

.content-group div:nth-child(2) i {
  margin-left: .7rem;
}

i {
  margin-right: .5rem;
}

.rebel-motivation {
  font-weight: 400;
  font-size: 1.6rem;
}

.button-group {
  display: flex;
  gap: 1.3rem;
}

.birthday {
  background: linear-gradient(-45deg, #060b0c, #252525, #111111, #010530);
  background-size: 400% 400%;
  animation: gradient 10s ease infinite;
}

.birthday_text {
  color: orange;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

</style>