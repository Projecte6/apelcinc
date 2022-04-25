<template>
  <Login v-if="currentPage == 'login'" v-model:currentPage="currentPage" />
  <Table v-if="secondPage == 'table'" v-model:secondPage="secondPage" />
</template>

<script setup>
import { ref } from "vue";
import { io } from "socket.io-client";

// Components
import Login from "./components/Login.vue";
import Table from "./components/Table.vue";

const currentPage = ref("login");
// const messages = ref(null);
const secondPage = ref("table");

const socket = io("localhost:3210");

// socket.on('messages', function (data) {
//   messages.value = data;
// });
</script>
