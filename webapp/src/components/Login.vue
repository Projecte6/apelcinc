<template>
  <div class="w-screen h-screen flex flex-col items-center justify-center gap-10 select-none bg-cover bg-center" style="background-image: url(/images/bkg1.png)">
    <span
      v-if="errorMessage"
      class="fixed top-10 px-4 py-2 font-medium text-xl uppercase bg-red-400 rounded shadow"
      v-text="errorMessage"
    />

    <img class="hidden lg:block h-1/5" src="/images/logo.png" draggable="false">

    <div class="flex flex-col gap-4">
      <input
        v-model="name"
        class="p-3 font-semibold text-2xl text-center uppercase border-none rounded focus:ring-0"
        type="text"
        placeholder="Usuari"
        autofocus
        @keydown.space.prevent
        @keyup.enter="onClickLogin"
      />

      <button class="px-4 py-1 font-medium text-2xl uppercase bg-stone-300 rounded hover:opacity-90" @click="onClickLogin">
        Accedir
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  socket: Object,
});

const emit = defineEmits(['update:currentPage']);

// Data
const name = ref('');
const errorMessage = ref(null);

const onClickLogin = () => {
  name.value = name.value.replaceAll(' ', '');

  if (name.value === '') {
    errorMessage.value = 'Has d\'introduir un nom d\'usuari';
    setTimeout(() => errorMessage.value = null, 4000);
    return;
  }

  if(name.value.length < 4 || name.value.length >13) {
    errorMessage.value = 'El nom ha de tenir una llargada de entre 4 i 12 caràcters';
    setTimeout(() => errorMessage.value = null, 4000);
    return;
  }

  props.socket.emit('game:login', name.value);
  name.value = '';
}

props.socket.on('game:login:success', () => {
  emit('update:currentPage', 'home');
});

props.socket.on('game:login:error', (message) => {
  errorMessage.value = message;
  setTimeout(() => errorMessage.value = null, 4000);
});
</script>
