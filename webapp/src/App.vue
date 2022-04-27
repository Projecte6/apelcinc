<template>
  <Home
    v-if="currentPage == 'home'"
    v-model:currentPage="currentPage"
    :socket="socket"
  />
  
  <Login
    v-if="currentPage == 'login'"
    v-mode
    l:currentPage="currentPage"
  />
  <BackGPos
      v-if="currentPage == 'rules'"
      v-mode
    l:currentPage="currentPage"
    v-model:currentPage="currentPage"
    :socket="socket"
  />

  <Table
    v-if="currentPage == 'table'"
    v-model:currentPage="currentPage"
    :socket="socket"
  />


  <Chat v-if="currentPage == 'chat'" :socket="socket" />

  <!-- <button @click="asd">
    Send
  </button> -->

  <Create
      v-if="currentPage == 'create'"
      v-model:currentPage="currentPage"
  />
</template>

<script setup>
import { ref } from "vue";
import { io } from "socket.io-client";


// Components
import Login from './components/Login.vue';
import Chat from './components/Chat.vue';
import Home from './components/Home.vue';
import Table from "./components/Table.vue";
import Create from "./components/Create.vue";
import BackGPos from './components/Game.vue';

const currentPage = ref("create");
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
