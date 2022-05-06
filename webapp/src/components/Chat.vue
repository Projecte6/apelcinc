<template>
		<div class="w-96 h-[35rem] bg-[#C4C4C4] mt-8 rounded-md">
			<div class="overflow-auto overflow-y-auto px-1 py-1 space-y-2" style="height:31.5rem;">
        <div class="flex items-center">
					<span class="flex text-black pl-6 font-bold">Nickname2</span>
				</div>
				<div class="flex items-center px-4">
					<span class="flex h-auto bg-[#585858] text-white rounded-xl px-4 py-2 items-end">Hi Dr.Hendrikson, I haven't been feeling well for past few days.</span>
				</div>
        <div class="flex items-center">
					<span class="flex text-black pl-6 font-bold">Nickname1</span>
				</div>
				<div class="flex items-center px-4">
					<span class="bg-[#373E4E] h-auto text-white rounded-xl px-4 py-2 items-end flex justify-end">Lets jump on a video call.</span>
				</div>
        <div class="flex items-center">
					<span class="flex text-black pl-6 font-bold">Nickname2</span>
				</div>
				<div class="flex items-center px-4">
					<span class="flex h-auto bg-[#585858] text-white p-1 rounded-xl px-4 py-2 items-end">How often should i take the medicine?</span>
	      </div>
        <div class="flex items-center">
					<span class="flex text-black pl-6 font-bold">Nickname1</span>
				</div>
        <div class="flex items-center px-4">
					<span class="bg-[#373E4E] h-auto text-white p-1 rounded-xl px-4 py-2 items-end flex justify-end ">Twice a day, at breakfast and before bed</span>
        </div>
        <div class="flex items-center">
					<span class="flex text-black pl-6 font-bold">Nickname2</span>
				</div>
        <div class="flex items-center px-4">
					<span class="flex h-auto bg-[#585858] text-white rounded-xl px-4 py-2 items-end">Thanks a lot doc</span>
				</div>
        <div class="flex items-center">
					<span class="flex text-black pl-6 font-bold">Nickname1</span>
				</div>
        <div class="flex items-center px-4">
					<span class="bg-[#373E4E] h-auto text-white rounded-xl px-4 py-2 items-end flex justify-end">Thats my duty, mention not</span>
        </div>
        <div class="flex items-center">
					<span class="flex text-black pl-6 font-bold">Nickname2</span>
				</div>
        <div class="flex items-center px-4">
					<span class="flex h-auto bg-[#585858] text-white rounded-xl px-4 py-2 items-end">sorry to bother again but can i ask you one more favour?</span>
				</div>
      </div>
      <div class="flex justify-between items-center p-1 border-t-2 space-x-2">
        <div class="relative flex items-center w-full">
        <EmojiPicker picker-type="input" @select="onSelectEmoji" v-model="message" v-on:keyup.enter="sendMessage" />
        </div>
        <div class="flex">
          <button @click="sendMessage" class="inline-flex items-center justify-center h-10 w-10 hover:bg-gray-500 hover:rounded-full hover:transition duration-500 ease-in-out"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          </button>
        </div>
			</div>
      <div v-if="isOpen" class="dark h-60 w-[23rem] absolute top-[25rem] opacity-95">grebrfvvw</div>
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
import { onMounted, ref } from 'vue';
import EmojiPicker from "vue3-emoji-picker";
import "../../node_modules/vue3-emoji-picker/dist/style.css"

const isOpen = ref(false);
const input = ref(" ");
function onSelectEmoji(emoji) {
      console.log(emoji);
      input.value += emoji.i;
      return {
    input, onSelectEmoji
    }
}

const props = defineProps({
  socket: Object,
});

onMounted(() => {
console.log(props);
    props.socket.on('chat:message', ({name, message}) => {
      messages.value.push({
      author: name,
      content: message,});
    });
})


const messages = ref([{ author: 'sistema', content: 'Benvingut al chat!' }]);
const message = ref('');

const sendMessage = () => {
  // socket.on('')
  props.socket.emit('chat:message', message)
};
</script>