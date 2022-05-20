<template>
  <nav class="bg-[#3f474d] flex justify-between items-center px-6 py-4" @keydown.esc="isOpen = false">
    <div class="flex justify-between">
      <img src="/public/img/Cinquillo_Finished.png" class="w-80" />
    </div>
    <div class="flex items-center ml-4 mr-16 space-x-2 md:mr-6">
      <button @click="onClickExit" class="rounded-md bg-[#585858] text-white font-bold text-xl p-1 w-24 hover:transition-colors duration-200 hover:animate-pulse hover:bg-amber-300" >Sortir</button>
      <button @click="isOpen = true" class="rounded-md bg-[#585858] text-white font-bold text-xl p-1 w-24  hover:transition-colors duration-200 hover:animate-pulse hover:bg-amber-300">Regles</button>
      <teleport to="body">
        <div class="flex justify-center items-center absolute top-0 left-0 w-full h-full" v-if="isOpen">
          <modal-rules @close="isOpen = false" />
        </div>
      </teleport>
    </div>
  </nav>
</template>

<script setup>
import ModalRules from "../components/ModalRules.vue";
import { ref } from "vue";

const emit = defineEmits(['update:currentPage']);
const onClickExit = () => {
  emit('update:currentPage', 'home');
};

const isOpen = ref(false);
</script>