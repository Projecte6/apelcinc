<template>
  <div class="w-screen h-screen flex items-center justify-center gap-16 select-none flex-col" style="background: url(/img/backg_credits.png)">
      
      <div class="flex items-center justify-center"> 
        <img class="w-3/5" src="/img/Cinquillo_Finished.png" alt="logo">
      </div>
      
      <div class="flex items-center justify-center gap-4 text-[#230834] flex-wrap flex-initial" >
      
      <a href="https://github.com/m04a" target="_blank">
        <button
            class="flex w-72 p-6 flex-col items-center justify-center bg-cover bg-center bg-no-repeat border-4 border-[#230834] rounded-xl leading-none hover:opacity-75"
            style="background-image: url(/images/btn-bkg.png)"
            @click=""
            >
            
            
                <div class="w-full flex items-center justify-center h-12">
                  <img class="w-16 h-20 mr-12" src="/img/moha.png">
                  <p class="font-bold text-3xl">MOHA</p>
                </div>        
        </button>
        </a>
        
        <a href="https://github.com/George11849" target="_blank">
         <button
            class="flex w-72 p-6 flex-col items-center justify-center bg-cover bg-center bg-no-repeat border-4 border-[#230834] rounded-xl leading-none hover:opacity-75"
            style="background-image: url(/images/btn-bkg.png)"
            @click=""
            >
                <div class="w-full flex items-center justify-center h-12">
                  <img class="w-20 h-20 mr-12" src="/img/george.png">
                  <p class="font-bold text-3xl">JORGE</p>
                </div>
                
        </button>
        </a>
        
        <a href="https://github.com/SEOAlexRamon" target="_blank">
         <button
            class="flex w-72 p-6 flex-col items-center justify-center bg-cover bg-center bg-no-repeat border-4 border-[#230834] rounded-xl leading-none hover:opacity-75"
            style="background-image: url(/images/btn-bkg.png)"
            @click=""
            >
                <div class="w-full flex items-center justify-center h-12">
                  <img class="w-20 h-20 mr-12" src="/img/alex-avatar.png">
                  <p class="font-bold text-3xl">ÁLEX</p>
                </div>  
        </button>
        </a>
        
        <a href="https://github.com/davideljefe" target="_blank">
         <button
            class="flex w-72 p-6 flex-col items-center justify-center bg-cover bg-center bg-no-repeat border-4 border-[#230834] rounded-xl leading-none hover:opacity-75"
            style="background-image: url(/images/btn-bkg.png)"
            @click=""
            >
                <div class="w-full flex items-center justify-center h-12">
                  <img class="w-20 h-20 mr-12" src="/img/david-avatar.png">
                  <p class="font-bold text-3xl">DAVID</p>
                </div>
        </button>
        </a>
        
       <a href="https://github.com/Juanka007" target="_blank"> 
         <button
            class="flex w-72 p-6 flex-col items-center justify-center bg-cover bg-center bg-no-repeat border-4 border-[#230834] rounded-xl leading-none hover:opacity-75"
            style="background-image: url(/images/btn-bkg.png)"
            @click=""
            >
                <div class="w-full flex items-center justify-center h-12">
                  <img class="w-16 h-20 mr-12" src="/img/juanka.png">
                 <p class="font-bold text-3xl">JUANKA</p> 
                </div>
                
        </button>
        </a>
      

      
      </div> 
      
      <div>
        <button
            class=" mt-28 bg-teal-400 flex w-72 p-6 flex-col items-center justify-center bg-cover bg-center bg-no-repeat  rounded-t-full rounded-b-full leading-none hover:opacity-75"
            @click="Back"
            >        
              <div class="w-full flex items-center justify-center h-12">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-20 mr-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
                </svg>
                <p class="font-bold text-3xl">BACK</p> 
              </div>
                
        </button>
      </div>
  </div>
</template>

<script setup>

const props = defineProps({
  socket: Object,
});

const emit = defineEmits(['update:currentPage']);

const Back = () => {
  emit('update:currentPage', 'home');
};

</script>