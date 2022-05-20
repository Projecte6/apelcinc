<template>
  <div class="flex md:flex-row items-center pb-8 flex-col" @keydown.esc="isOpen = false">
    <div class="basis-11/12 flex justify-center w-full relative">
      <div v-if="isOpen" class="absolute w-96 h-96 md:left-2/4 bg-[#3f474d] rounded-xl">
        <div class="flex justify-end pr-2 pt-2">
          <button @click="isOpen = false">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-9 w-9 text-white hover:bg-[#757575] rounded-full"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        <div class="flex flex-col justify-center items-center h-80">
          <div class="flex flex-col gap-4">
            <h2 class="text-white text-center mb-3 text-">
              Escriu el Id de la sala sense #
            </h2>
            <input
              v-on:keyup.enter="onClickLogin(privateroom)"
              v-model="privateroom"
              class="p-3 font-semibold text-2xl text-center border-none rounded focus:ring-0"
              placeholder="V1f43"
            />
            <button
              class="px-4 py-1 font-medium text-2xl uppercase bg-stone-300 rounded hover:opacity-90"
              @click="onClickLogin(privateroom)"
            >
              Accedir
            </button>
          </div>
        </div>
      </div>
      <div class="overflow-y-auto h-[28rem] bg-[#C4C4C4] rounded-lg w-10/12 mt-8">
        <div class="py-2 inline-block px-6 w-full">
          <div class="flex justify-between border-b-4 mt-4 mb-2 pb-6">
            <div class="flex w-4/6 justify-end">
              <h1 class="text-center font-extrabold text-4xl mb-2">SALES PÚBLIQUES</h1>
            </div>
            <div class="flex w-36 justify-end ml-6">
              <button
                @click="isOpen = true"
                class="rounded-md bg-[#585858] text-white font-bold text-md p-1 w-44 hover:bg-opacity-80 hover:transition-colors duration-200 hover:animate-pulse hover:bg-amber-300"
              >
                Partida privada
              </button>
            </div>
          </div>
          <table class="w-full">
            <thead class="border-b">
              <tr>
                <th
                  v-for="column in columns"
                  class="text-lg font-bold text-gray-900 px-6 py-4"
                  v-text="column"
                ></th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr v-if="!roomsList.length">
                <td colspan="4">No hay ninguna partida en espera...</td>
              </tr>
              <tr
                v-for="room in roomsList"
                class="border-b hover:bg-gray-700 hover:text-white"
                @click="onClickJoinRoom(room.id)"
              >
                <td
                  class="text-sm font-bold px-6 py-4 whitespace-nowrap"
                  v-text="`#${room.id}`"
                />
                <td
                  class="text-sm font-bold px-6 py-4 whitespace-nowrap"
                  v-text="room.name"
                />
                <td
                  class="text-sm font-bold px-6 py-4 whitespace-nowrap"
                  v-text="`${room.players}/4`"
                />
                <td
                  class="text-sm font-bold px-6 py-4 whitespace-nowrap"
                  v-text="room.type"
                />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="basis-1/12 flex">
      <Chat :socket="props.socket"></Chat>
    </div>
  </div>
</template>

<script setup>
import Chat from "../components/Chat.vue";
import { ref } from "vue";

const isOpen = ref(false);
const privateroom = ref("");
const props = defineProps({
  socket: Object,
});

const onClickLogin = (privateroom) => {
  props.socket.emit("game:rooms:join", privateroom);
};

const emit = defineEmits(["update:currentPage"]);

const columns = ["Id", "Sala", "Jugadors", "Tipus"];
const roomsList = ref([]);

const onClickJoinRoom = (id) => {
  props.socket.emit("game:rooms:join", id);
};

props.socket.on("game:rooms:join:success", (room) => {
  console.log(room);
  emit("update:roomName", room);
  emit("update:currentPage", "game");
});

props.socket.emit("web:page:join");
props.socket.emit("game:rooms:get-available");

props.socket.on("game:rooms:get-available", (rooms) => {
  roomsList.value = rooms;
});

props.socket.on("game:rooms:created", (game) => {
  roomsList.value.push(game);
});

props.socket.on("game:rooms:update-players-length", (id, players) => {
  let index = roomsList.value.findIndex((r) => r.id === id);

  if (index === -1) return;

  roomsList.value[index].players = players;
});

props.socket.on("game:rooms:deleted", (id) => {
  console.log("asd");

  let index = roomsList.value.findIndex((r) => r.id === id);

  if (index === -1) return;

  roomsList.value.splice(index, 1);
});
</script>
