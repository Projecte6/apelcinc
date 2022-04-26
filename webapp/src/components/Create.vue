<template>
  <div class="h-screen bg-[#06304E]">
    <nav class="nav flex justify-between items-center px-6 py-4">
      <div class="flex justify-between">
        <img src="/public/img/logo.png" class="w-80" />
      </div>
      <div class="flex items-center mr-20 space-x-2">
        <button @click="" class="but">Sortir</button>
        <button @click="isOpen = true" class="but">Regles</button>
        <teleport to="body">
          <div class="modal" v-if="isOpen">
            <modal-rules @close="isOpen = false" />
          </div>
        </teleport>
      </div>
    </nav>
    <div class="flex justify-center mt-24 h-screen">
      <div class="overflow-y-auto bg-[#C4C4C4] rounded-lg w-1/2 h-1/2">
        <div class="py-2 inline-block min-w-full px-6">
          <div class="overflow-hidden">
            <h1 class="text-slate-900 text-4xl tracking-tight font-extrabold sm:text-5xl dark:text-dark text-center mt-12">Nova partida</h1>
          </div>
          <div class="flex justify-center mt-24">
            <div class="bg-slate-600 p-8 w-1/2 rounded  ">
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Nom de la partida">
            </div>
            <button @click="" class="but ml-4 m">Crear partida</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
</script>
<script setup>
import { ref } from "vue";
import ModalRules from "../components/ModalRules.vue";

const isOpen = ref(false);
</script>
