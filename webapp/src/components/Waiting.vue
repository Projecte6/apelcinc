<template>

<div class="grid grid-rows-5 grid-cols-5 justify-center items-center h-screen">
  <div class="one grid justify-center items-center row-start-3 text-white">
    <p>hola one</p>
  </div>
  
  <div class="two grid justify-center items-center row-start-1 col-start-3 text-white">
    <p>hola two</p>
  </div>
  
  <div class="two grid justify-center items-center row-start-3 row-end-4 col-start-3 text-white text-3xl">
    <p>ESPERANDO JUGADORES...</p>
  </div>
  
  <button class="grid justify-center items-center row-start-4 col-start-4 bg-gray-300 rounded-bl-full rounded-br-full" @click="onClickComienza">
  <span class="text-3xl font-black uppercase">
          COMENZAR
        </span>
  </button>
  
  <div class="tri grid justify-center items-center row-start-3 col-start-5 text-white">
    <p>hola tri</p>
  </div>
  
  <div class="four grid justify-center items-center row-start-5 col-start-3 text-white">
    <p>hola four</p>
  </div>
</div>

  
</template>



<script setup>

const emit = defineEmits(['update:currentPage']);

const onClickComienza = () => {
  emit('update:currentPage', 'game');
};

</script>



<style>
  html {
    height: 100%;
  }
  
  body{
   background-color: #06304E;
    background-repeat: no-repeat;
    object-fit: cover;
    overflow: hidden;
     min-height: 100%;
  }
</style>