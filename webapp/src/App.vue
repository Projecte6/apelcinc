<template>
  <Login
    v-if="currentPage == 'login'"
    v-mode
    l:currentPage="currentPage"
  />
  <BackGPos
      v-if="currentPage == 'rules'"
      v-mode
    l:currentPage="currentPage"
  />
</template>

<script setup>
  import { ref } from 'vue';
  import { io } from 'socket.io-client';

  // Components
  import Login from './components/Login.vue';
  import BackGPos from './components/Game.vue';

  const currentPage = ref('login');
  // const messages = ref(null);

  const socket = io('localhost:3210');

  // socket.on('messages', function (data) {
  //   messages.value = data;
  // });
</script>
