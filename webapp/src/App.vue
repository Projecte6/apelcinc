<template>

  <Login
    v-if="currentPage == 'login'"
    v-model:currentPage="currentPage"
    :socket="socket"
  />

  <Chat
    v-if="currentPage == 'chat'"
    :socket="socket"
  />

  <!-- <button @click="asd">
    Send
  </button> -->
  <Table v-if="secondPage == 'table'" v-model:secondPage="secondPage" />
  <Home
    v-if="currentPage == 'home'"
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

const currentPage = ref("login");
// const messages = ref(null);
const secondPage = ref("table");

  //const currentPage = ref('login');
  // const messages = ref(null);

const socket = io("localhost:3210");

// socket.on('messages', function (data) {
//   messages.value = data;
// });
  socket.on('chat:message', (data) => {
    console.table(data);
  });

  const asd = () => {
    socket.emit('chat:message', 'Hello world!');
    console.log('Clicked');
  }

  // socket.on('messages', function (data) {
  //   messages.value = data;
  // });
</script>
