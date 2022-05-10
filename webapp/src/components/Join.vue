<template>
    <div class="flex md:flex-row items-center pb-8 flex-col">
    <div class="basis-11/12 flex justify-center w-full">
      <div class="overflow-y-auto h-[28rem] bg-[#C4C4C4] rounded-lg w-10/12 mt-8">
        <div class="py-2 inline-block px-6 w-full">
          <h1 class="text-center font-extrabold text-4xl mb-2">SALES</h1>
            <table class="w-full">
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
                  class="border-b hover:bg-gray-700 hover:text-white"
                  @click="onClickJoinRoom(room.id)"
                >
                  <td class="text-sm font-bold px-6 py-4 whitespace-nowrap" v-text="`#${room.id}`" />
                  <td class="text-sm font-bold px-6 py-4 whitespace-nowrap" v-text="room.name" />
                  <td class="text-sm font-bold px-6 py-4 whitespace-nowrap" v-text="`${room.players}/4`" />
                  <td class="text-sm font-bold px-6 py-4 whitespace-nowrap" v-text="'Publica'" />
                </tr>
              </tbody>
            </table>
        </div>
        </div>
      </div>
      <div class="basis-1/12 flex">
      <Chat :socket="props.socket"></Chat>
      </div>
    </div>
</template>

<script setup>
import Chat from "../components/Chat.vue";
import { ref } from 'vue';


const props = defineProps({
  socket: Object,
});

const emit = defineEmits(['update:currentPage']);

const columns = ['Id', 'Sala', 'Jugadors', 'Tipus'];
const roomsList = ref([]);

const onClickJoinRoom = (id) => {
  props.socket.emit('game:rooms:join', id);
};
props.socket.on('game:rooms:join:success', () => {
  console.log('You joined into the room');
  emit('update:currentPage', 'game');
});

props.socket.emit('web:page:join');
props.socket.emit('game:rooms:get-available');

props.socket.on('game:rooms:get-available', rooms => {
  roomsList.value = rooms;
});

props.socket.on('game:rooms:created', game => {
  roomsList.value.push(game);
});

props.socket.on('game:rooms:update-players-length', (id, players) => {
  let index = roomsList.value.findIndex(r => r.id === id);

  if (index === -1) return;

  roomsList.value[index].players = players;
});

props.socket.on('game:rooms:deleted', id => {
  console.log('asd')
  
  let index = roomsList.value.findIndex(r => r.id === id);

  if (index === -1) return;

  roomsList.value.splice(index, 1);
});
</script>
