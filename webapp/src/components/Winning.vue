<template>
  <div class="h-screen flex flex-col md:flex-row items-center select-none bg-cover" style="background: url(/images/bkg.png)">
    <div class="flex-col flex basis-11/12 px-12 space-y-4 items-center">
    <div class="flex items-center justify-center"> 
        <img class="w-3/5" src="/img/Cinquillo_Finished.png" alt="logo">
      </div>
      <div class="flex-col w-9/12 flex justify-center items-center space-y-8 pt-8 pb-8 border-8 border-[#230834] rounded-xl bg-cover bg-center bg-no-repeat" style="background-image: url(/images/btn-bkg.png)">
        <div class="bg-gray-800 w-4/5 rounded-md text-3xl font-bold text-white">
          <div class="flex items-center">
            <div class="w-20"><img class="w-4/5 ml-5" src="/img/medalla2.png"></div>
            <div class="w-full text-center">Juanka</div>
          </div>
        </div>
        <div class="bg-gray-800 w-4/5 rounded-md text-3xl font-bold text-white">
          <div class="flex items-center">
            <div class="w-20"><img class="w-4/5 ml-4" src="/img/medalla1.png"></div>
            <div class="w-full text-center">Moha</div>
          </div>
        </div>
        <div class="bg-gray-800 w-4/5 rounded-md text-3xl font-bold text-white">
          <div class="flex items-center">
            <div class="w-20"><img class="w-4/5 ml-5" src="/img/medalla3.png"></div>
            <div class="w-full text-center">Jorge</div>
          </div>
        </div>
        <div class="bg-gray-800 w-4/5 rounded-md text-3xl font-bold text-white">
          <div class="flex items-center">
            <div class="w-20"><img class="w-4/5 ml-4" src="/img/caca.png"></div>
            <div class="w-full text-center">David</div>
          </div>
        </div>
      </div>
      <div class="flex w-9/12 justify-center">
        <div class="flex space-x-6">
          <button
        class="flex px-4 w-72 h-[4.75rem] items-center justify-center bg-cover bg-center bg-no-repeat border-8 border-[#230834] rounded-3xl leading-none hover:opacity-75"
        style="background-image: url(/images/btn-bkg.png)"
        @click="onClickJoin"  
      >
        <span class="text-4xl font-black uppercase">
          Jugar
        </span>
         <svg xmlns="http://www.w3.org/2000/svg" class="ml-4 w-12 h-12" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
        </svg>
      </button>
      <button
        class="flex p-3 w-20 h-[4.75rem] items-center justify-center bg-[#FF0000] border-[6px] border-[#230834] rounded-full leading-none hover:opacity-75"
        @click="onClickExit"  
      >
         <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      </button>
        </div>
      </div>
    </div>
    <div class="basis-1/12 flex"> <Chat :socket="props.socket"></Chat></div>
  </div>
</template>

<script setup>
import Chat from '../components/Chat.vue';
const props = defineProps({
  socket: Object,
});

const emit = defineEmits(['update:currentPage']);

const onClickJoin = () => {
  emit('update:currentPage', 'join');
};

const onClickExit = () => {
  emit('update:currentPage', 'home');
};
</script>