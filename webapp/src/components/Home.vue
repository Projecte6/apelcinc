<template>
  <div class="w-screen h-screen flex items-center justify-center gap-32 select-none" style="background: url(/images/bkg.png)">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-[#230834]">
      <!-- Create -->
      <button
        class="flex p-4 flex-col items-center justify-center bg-cover bg-center bg-no-repeat border-4 border-[#230834] rounded-xl leading-none hover:opacity-75"
        style="background-image: url(/images/btn-bkg.png)"
        @click="onClickCreate"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-20 h-20" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>

        <span class="text-3xl font-black uppercase">
          Crear
        </span>
      </button>

      <!-- Join -->
      <button
        class="flex p-4 flex-col items-center justify-center bg-cover bg-center bg-no-repeat border-4 border-[#230834] rounded-xl leading-none hover:opacity-75"
        style="background-image: url(/images/btn-bkg.png)"
        @click="onClickJoin"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-20 h-20" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
        </svg>

        <span class="text-3xl font-black uppercase">
          Unir-se
        </span>
      </button>

      <!-- Rules -->
      <button
        class="flex p-4 flex-col items-center justify-center bg-cover bg-center bg-no-repeat border-4 border-[#230834] rounded-xl leading-none hover:opacity-75"
        style="background-image: url(/images/btn-bkg.png)"
        @click="onClickRules"  
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-20 h-20" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
        </svg>

        <span class="text-3xl font-black uppercase">
          Normes
        </span>
      </button>

      <!-- Exit -->
      <button
        class="flex p-4 flex-col items-center justify-center bg-cover bg-center bg-no-repeat border-4 border-[#230834] rounded-xl leading-none hover:opacity-75"
        style="background-image: url(/images/btn-bkg.png)"
        @click="onClickExit"  
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-20 h-20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
        </svg>

        <span class="text-3xl font-black uppercase">
          Credits
        </span>
      </button>
    </div>

    <img class="hidden lg:block h-2/3" src="/images/logo.png" draggable="false">
  </div>
</template>

<script setup>
const props = defineProps({
  socket: Object,
});

const emit = defineEmits(['update:currentPage']);

const onClickCreate = () => {
  emit('update:currentPage', 'login');
};

const onClickJoin = () => {
  emit('update:currentPage', 'login');
};

const onClickRules = () => {

};

const onClickExit = () => {
  // code
};
</script>
