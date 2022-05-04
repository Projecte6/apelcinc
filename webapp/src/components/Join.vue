<template>
  <div class="h-screen bg-[#06304E] ">
    <div class="flex flex-col items-center h-7/12">
      <div class="mt-20 overflow-y-auto bg-[#C4C4C4] rounded-lg w-[80%]">
        <div class="py-2 inline-block min-w-full px-6">
          <div class="overflow-hidden">
          <h1 class="text-center font-extrabold text-4xl mb-2">SALES</h1>
            <table class="min-w-full">
              <thead class="border-b">
                <tr>
                  <th
                    v-for="column in columns"
                    class="text-lg font-bold text-gray-900 px-6 py-4"
                    v-text="column"
                  ></th>
                </tr>
              </thead>
              <tbody class="text-center">
                <tr v-if="!roomsList.length">
                  <td colspan="4">No hay ninguna partida en espera...</td>
                </tr>
                <tr
                  v-for="room in roomsList"
                  class="border-b"
                >
                  <td class="text-sm font-bold px-6 py-4 whitespace-nowrap" v-text="`#${room.id}`" />
                  <td class="text-sm font-bold px-6 py-4 whitespace-nowrap" v-text="room.name" />
                  <td class="text-sm font-bold px-6 py-4 whitespace-nowrap" v-text="'0/4'" />
                  <td class="text-sm font-bold px-6 py-4 whitespace-nowrap" v-text="'Publica'" />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  socket: Object,
});

const columns = ['Id', 'Sala', 'Jugadors', 'Tipus'];
const roomsList = ref([]);

props.socket.emit('web:page:join');
props.socket.emit('game:rooms:get-available');

props.socket.on('game:rooms:get-available', rooms => {
  roomsList.value = rooms;
});

props.socket.on('game:rooms:created', game => {
  roomsList.value.push(game);
});

props.socket.on('game:rooms:deleted', id => {
  console.log('asd')
  
  let index = roomsList.value.findIndex(r => r.id === id);

  if (index === -1) return;

  roomsList.value.splice(index, 1);
});
</script>
