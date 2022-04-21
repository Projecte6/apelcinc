<template>
  <div class="w-screen h-screen flex flex-col items-center justify-center bg-stone-800">    
    <div class="flex gap-4">
      <input
        class="p-3 font-semibold text-2xl uppercase border-none rounded-l focus:ring-4 focus:ring-stone-600"
        type="text"
        placeholder="Nom"
      />

      <button
        class="px-4 font-semibold text-2xl uppercase bg-stone-300 rounded-r focus:ring-4 focus:ring-stone-600"
        @click="emit('update:currentPage', 'rules')"
      >
        Jugar
      </button>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['update:currentPage']);
</script>