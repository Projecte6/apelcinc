<template>
  <Login
    v-if="currentPage == 'login'"
    v-model:currentPage="currentPage"
  />
</template>

<script setup>
  import { ref } from 'vue';
  import { io } from 'socket.io-client';

  // Components
  import Login from './components/Login.vue';

  const currentPage = ref('login');
  // const messages = ref(null);

  const socket = io('localhost:3210');

  // socket.on('messages', function (data) {
  //   messages.value = data;
  // });
</script>
