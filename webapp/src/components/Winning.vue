<template>
  <div class="w-screen h-screen flex items-center justify-center gap-32 select-none" style="background: url(/images/bkg.png)">
    <div class="w-96 grid grid-cols-1 md:grid-cols-1 gap-4 text-[#230834] content-center">
     <div class=" flex-1 flex flex-col items-center content-around space-y-8 bg-cover bg-center py-4 bg-no-repeat border-8 border-[#230834] rounded-xl" style="background-image: url(/images/btn-bkg.png)">
        <div class="w-4/5 bg-gray-800 rounded-md text-3xl font-bold text-white">
          <div class="flex items-center">
            <div class="w-20"><img class="w-4/5 ml-5" src="/img/medalla2.png"></div>
            <div class="w-full text-center">Juanka</div>
          </div>
        </div>
        <div class="w-4/5 bg-gray-800 rounded-md text-3xl font-bold text-white">
          <div class="flex items-center">
            <div class="w-20"><img class="w-4/5 ml-4" src="/img/medalla1.png"></div>
            <div class="w-full text-center">Moha</div>
          </div>
        </div>
        <div class="w-4/5 bg-gray-800 rounded-md text-3xl font-bold text-white">
          <div class="flex items-center">
            <div class="w-20"><img class="w-4/5 ml-5" src="/img/medalla3.png"></div>
            <div class="w-full text-center">Jorge</div>
          </div>
        </div>
        <div class="w-4/5 mb-8 bg-gray-800 rounded-md text-3xl font-bold text-white">
          <div class="flex items-center">
            <div class="w-20"><img class="w-4/5 ml-4" src="/img/caca.png"></div>
            <div class="w-full text-center">David</div>
          </div>
        </div>
     </div>
     <div class="flex justify-between">
        <button
        class="flex px-4 w-72 h-[3.75rem] items-center justify-center bg-cover bg-center bg-no-repeat border-8 border-[#230834] rounded-3xl leading-none hover:opacity-75"
        style="background-image: url(/images/btn-bkg.png)"
        @click="onClickStart"  
      >
        <span class="text-3xl font-black uppercase">
          Jugar
        </span>
         <svg xmlns="http://www.w3.org/2000/svg" class="ml-4 w-12 h-12" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
        </svg>
      </button>
      <button
        class="flex p-3 w-20 h-[3.75rem] items-center justify-center bg-[#FF0000] border-[6px] border-[#230834] rounded-full leading-none hover:opacity-75"
        @click="onClickExit"  
      >
         <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      </button>
     </div>
    </div>
    <img class="hidden lg:block h-2/3" src="/images/logo.png" draggable="false">
  </div>
</template>

<script setup>

const props = defineProps({
  socket: Object,
});

const emit = defineEmits(['update:currentPage']);

const onClickStart = () => {
  emit('update:currentPage', 'table');
};

const onClickExit = () => {
  emit('update:currentPage', 'home');
};
</script>