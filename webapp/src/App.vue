<template>
  <Chat v-if="currentPage == 'table' || currentPage == 'create' || currentPage == 'game' ||currentPage == 'winning'" :socket="socket" />
  
  <Home
    v-if="currentPage == 'home'"
    v-model:currentPage="currentPage"
    :socket="socket"
  />

  <Menu
    v-if="currentPage == 'create' || currentPage == 'join' || currentPage == 'game'"
    v-model:currentPage="currentPage"
    :socket="socket"
  />
  
  <Login
    v-if="currentPage == 'login'"
    v-model:currentPage="currentPage"
    :socket="socket"

  />
  
  <Game
    v-if="currentPage == 'game'"
    v-model:currentPage="currentPage"
    :socket="socket"
  />

  <Create
      v-if="currentPage == 'create'"
      v-model:currentPage="currentPage"
      :socket="socket"
  />

  <Join
    v-if="currentPage == 'join'"
    v-model:currentPage="currentPage"
    :socket="socket"
  />

  <!-- <Winning
      v-if="currentPage == 'winning'"
      v-model:currentPage="currentPage"
  /> -->
</template>

<script setup>
import { ref } from "vue";
import { io } from "socket.io-client";


// Components
import Login from './components/Login.vue';
import Chat from './components/Chat.vue';
import Home from './components/Home.vue';
import Join from "./components/Join.vue";
import Create from "./components/Create.vue";
import Winning from "./components/Winning.vue";
import Game from './components/Game.vue';
import Menu from "./components/Menu.vue";

//const currentPage = ref("home");
const currentPage = ref("login");
// const messages = ref(null);
// const secondPage = ref("table");

  //const currentPage = ref('login');
  // const messages = ref(null);

const socket = io("localhost:3210");

// socket.on('messages', function (data) {
//   messages.value = data;
// });
socket.on("chat:message", (data) => {
  console.table(data);
});

const asd = () => {
  socket.emit("chat:message", "Hello world!");
  console.log("Clicked");
};

// socket.on('messages', function (data) {
//   messages.value = data;
// });
</script>
