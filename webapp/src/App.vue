<template>
  <Home v-if="currentPage == 'home'" v-model:currentPage="currentPage" :socket="socket" />

  <Menu
    v-if="currentPage == 'create' || currentPage == 'join' || currentPage == 'game'"
    v-model:currentPage="currentPage"
    :socket="socket"
  />

  <Waiting
    v-if="currentPage == 'waiting'"
    v-model:currentPage="currentPage"
    :socket="socket"
  />

  <Credits
    v-if="currentPage == 'credits'"
    v-model:currentPage="currentPage"
    :socket="socket"
  />

  <Game
    v-if="currentPage == 'game'"
    v-model:roomName="roomName"
    v-model:currentPage="currentPage"
    :socket="socket"
  />

  <Login
    v-if="currentPage == 'login'"
    v-model:currentPage="currentPage"
    :socket="socket"
  />

  <Create
    v-if="currentPage == 'create'"
    v-model:currentPage="currentPage"
    v-model:roomName="roomName"
    :socket="socket"
  />

  <Join
    v-if="currentPage == 'join'"
    v-model:roomName="roomName"
    v-model:currentPage="currentPage"
    :socket="socket"
  />
  <!-- <Chat v-if="currentPage == 'table' || currentPage == 'create' || currentPage == 'winning'" :socket="socket" /> -->

  <Winning
    v-if="currentPage == 'winning'"
    v-model:currentPage="currentPage"
    :socket="socket"
  />
</template>

<script setup>
import { ref } from "vue";
import { io } from "socket.io-client";

// Components
import Login from "./components/Login.vue";
import Home from "./components/Home.vue";
import Join from "./components/Join.vue";
import Create from "./components/Create.vue";
import Winning from "./components/Winning.vue";
import Game from "./components/Game.vue";
import Credits from "./components/Credits.vue";
import Menu from "./components/Menu.vue";

const currentPage = ref("login");
const roomName = ref("");
// const messages = ref(null);
// const messages = ref(null);

const socket = io("144.91.79.189:3210", { upgrade: false });

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
