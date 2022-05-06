<template>
  <div class="min-h-screen bg-[#06304E]">
    <Menu></Menu>
    <div class="flex justify-center mt-14">
      <div class="overflow-y-auto bg-[#C4C4C4] rounded-lg w-2/3 h-1/2">
        <div class="py-2 inline-block min-w-full px-6">
          <div class="overflow-hidden">
            <h1 class="text-slate-900 text-4xl tracking-tight font-extrabold sm:text-5xl dark:text-dark text-center mt-12">Nova partida</h1>
          </div>
          <div class="flex justify-center mt-16 flex-col items-center">
            <div class="bg-slate-600 p-8 w-1/2 rounded-md ">
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Nom de la partida">
            </div>
            <div class="flex items-center"><button @click="onClickCreate" class="rounded-md bg-[#585858] text-white font-bold text-xl p-3 mt-4 mb-4 "><p class="text-white hover:text-yellow-100 ease-in-out duration-200" >Crear partida</p></button></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>

const emit = defineEmits(['update:currentPage']);
const onClickCreate = () => {
  emit('update:currentPage', 'game');
};

</script>
