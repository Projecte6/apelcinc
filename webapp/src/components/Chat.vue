<template>
  <div>
    Chat
  </div>

  <ul class="bg-gray-200">
    <li
      v-for="msg in messages"
      v-text="`${msg.author}: ${msg.content}`"
    />
  </ul>

  <input
    v-model="message"
    type="text"
    placeholder="Escriu un missatge..."
    v-on:keyup.enter="sendMessage"
  >
  
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  socket: Object,
});

const messages = ref([{ author: 'sistema', content: 'Benvingut al chat!' }]);
const message = ref('');

props.socket.on('chat:message', ({name, message}) => {
  messages.value.push({
    author: name,
    content: message,
  });
});

const sendMessage = () => {
  // socket.on('')
};
</script>