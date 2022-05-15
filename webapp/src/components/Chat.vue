<template>
		<div class="w-96 h-[35rem] bg-[#C4C4C4] mt-8 rounded-md">
			<div id="box" class="overflow-auto overflow-y-auto px-1 py-1 space-y-2" style="height:31.5rem;">
        <div class="flex-col items-center px-4" v-for="msg in messages">
          <div class="flex items-center">
            <span class="flex text-black pl-6 font-bold">{{msg.author}}</span>
          </div>
            <span v-if="msg.author=='Jo' && msg.content != '' && msg.author!='sistema'" class="flex break-all h-auto bg-[#585858] text-white rounded-xl px-4 py-2 items-end">{{msg.content}}</span>
            <span v-if="msg.content != '' && msg.author!='Jo' && msg.author!='sistema'" class="flex break-all h-auto bg-[#373E4E] text-white rounded-xl px-4 py-2 items-end">{{msg.content}}</span>
            <span v-if="msg.author=='sistema'" class="flex break-all h-auto bg-red-800 text-white rounded-xl px-4 py-2 items-end">{{msg.content}}</span>
        </div>
      </div>
      <div class="flex justify-between items-center p-1 border-t-2 space-x-2">
        <div class="relative flex items-center w-full pl-4">
          <input class="w-full bg-[#757575] text-white rounded-md py-2 pl-1 placeholder:text-white" placeholder="Escriu el teu missatge..." v-model="message"  v-on:keyup.enter="sendMessage"/>
          <EmojiPicker picker-type="input" @select="onSelectEmoji"/>
        </div>
        <div class="flex">
          <button @click="sendMessage" id="button" class="inline-flex items-center justify-center h-10 w-10 hover:bg-gray-500 hover:rounded-full hover:transition duration-500 ease-in-out"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          </button>
        </div>
			</div>
    </div>
  <!-- <div> 
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
  >-->
  
</template>

<script setup>
import { onMounted, ref, onUpdated } from 'vue';
import EmojiPicker from "vue3-emoji-picker";
import "../../node_modules/vue3-emoji-picker/dist/style.css"


function onSelectEmoji(emoji) {
      console.log(emoji);
      message.value += emoji.i;
      return {
    message, onSelectEmoji
    }
}

const props = defineProps({
  socket: Object,
});

onMounted(() => {
    props.socket.on('chat:message', ({name, message}) => {
      messages.value.push({
      author: name,
      content: message,});
    });
})

onUpdated(() => {
   var element = document.getElementById('box');
  element.scrollTop = element.scrollHeight;
})

const messages = ref([{ author: '', content: '' }]);
const message = ref('');

const sendMessage = () => {
  // socket.on('')
  console.log(message);
  if(message.value == ""){
   console.log("No hi han missatges!");
  } else {
     props.socket.emit('chat:message', message.value);
  messages.value.push({
      author: "Jo",
      content: message.value
      });
  };
  message.value = "";
};
</script>