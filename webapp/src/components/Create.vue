<template>
  <span
    v-if="errorMessage"
    class="fixed top-10 px-4 py-2 font-medium text-xl uppercase bg-red-400 rounded shadow"
    v-text="errorMessage"
  />

  <div class="flex md:flex-row flex-col items-center pb-8">
    <div class="basis-11/12 flex justify-center">
      <div class="overflow-y-auto bg-[#C4C4C4] rounded-lg w-2/3 h-1/2">
        <div class="py-2 inline-block min-w-full px-6">
          <div class="overflow-hidden">
            <h1
              class="text-slate-900 text-4xl tracking-tight font-extrabold sm:text-5xl dark:text-dark text-center mt-12"
            >
              Nova partida
            </h1>
          </div>
          <div class="flex justify-center mt-16 flex-col items-center">
            <div class="bg-slate-600 p-8 w-1/2 rounded-md">
              <input
                v-on:keyup.enter="onClickCreate"
                v-model="name"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Nom de la partida"
              />
            </div>
            <div class="flex items-center">
              <button
                @click="onClickCreate"
                class="rounded-md bg-[#585858] text-white font-bold text-xl p-3 mt-4 mb-4"
              >
                <p class="text-white hover:text-yellow-100 ease-in-out duration-200">
                  Crear partida
                </p>
              </button>
              <div class="ml-8">
                <input
                  type="checkbox"
                  class="bg-red-700 focus:shadow-none focus:outline-none"
                />
                <label class="ml-2 font-bold text-md">Sala Privada</label>
              </div>
            </div>
          </div>
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

const props = defineProps({
  socket: Object,
});

const emit = defineEmits(["update:currentPage"]);

const name = ref("");
const errorMessage = ref(null);

const onClickCreate = () => {
  props.socket.emit("game:rooms:create", name.value);

  if (name.value === "") {
    errorMessage.value = "Has d'introduir un nom de sala";
    setTimeout(() => (errorMessage.value = null), 4000);
    return;
  }

  if (name.value.length < 2) {
    errorMessage.value = "El nom ha de tenir una llargada mínima de 2 caràcters";
    setTimeout(() => (errorMessage.value = null), 4000);
    return;
  }

  props.socket.emit("game:create", name.value);
  name.value = "";
};

// const onClickCreate = () => {
//   name.value = name.value.replaceAll(' ', '');
props.socket.on("game:rooms:create:success", (room) => {
  console.log(room);
  emit("update:roomName", room);
  emit("update:currentPage", "game");
});

props.socket.on("game:create:error", (message) => {
  errorMessage.value = message;
  setTimeout(() => (errorMessage.value = null), 4000);
});
</script>
