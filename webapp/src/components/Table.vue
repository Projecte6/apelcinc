<template>
    <div class="flex flex-row items-center pb-8">
    <div class="basis-11/12 flex justify-center">
      <div class="overflow-y-auto h-[28rem] bg-[#C4C4C4] rounded-lg w-10/12 mt-8">
        <div class="py-2 inline-block min-w-full px-6">
          <div class="overflow-hidden">
          <h1 class="text-center font-extrabold text-4xl mb-2">SALES</h1>
            <table class="min-w-full">
              <thead class="border-b">
                <tr>
                  <th
                    scope="col"
                    class="text-lg font-bold text-gray-900 px-6 py-4"
                    v-for="columna in columnes"
                    :key="columna"
                    :value="columna"
                    v-text="columna"
                  ></th>
                </tr>
              </thead>
              <tbody class="text-center">
                <tr class="border-b">
                  <td
                    class="text-sm font-bold px-6 py-4 whitespace-nowrap"
                    v-for="opcio in opcions"
                    :key="opcio"
                    :value="opcio"
                    v-text="opcio"
                  ></td>
                </tr>
                <tr class="border-b">
                  <td
                    class="text-sm font-bold px-6 py-4 whitespace-nowrap"
                    v-for="opcio in opcions2"
                    :key="opcio"
                    :value="opcio"
                    v-text="opcio"
                  ></td>
                </tr>
                <tr class="border-b">
                  <td
                    class="text-sm font-bold px-6 py-4 whitespace-nowrap"
                    v-for="opcio in opcions3"
                    :key="opcio"
                    :value="opcio"
                    v-text="opcio"
                  ></td>
                </tr>
                <tr class="border-b">
                  <td
                    class="text-sm font-bold px-6 py-4 whitespace-nowrap"
                    v-for="opcio in opcions4"
                    :key="opcio"
                    :value="opcio"
                    v-text="opcio"
                  ></td>
                </tr>
                <tr class="border-b">
                  <td
                    class="text-sm font-bold px-6 py-4 whitespace-nowrap"
                    v-for="opcio in opcions5"
                    :key="opcio"
                    :value="opcio"
                    v-text="opcio"
                  ></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
      <div class="basis-1/12 flex">
      <Chat :socket="props.socket"></Chat>
      </div>
    </div>
</template>

<script>
import Chat from "../components/Chat.vue";

export default {
  components: {Chat},
  data() {
    return {
      columnes: ["Id", "Sala", "Jugadors", "Tipus"],
      opcions: ["1", "#1", "3/4", "Pública"],
      opcions2: ["2", "#2", "4/4", "Pública"],
      opcions3: ["3", "#3", "2/4", "Pública"],
      opcions4: ["4", "#4", "3/4", "Pública"],
      opcions5: ["5", "#5", "2/4", "Pública"],
    };
  },
};
</script>

<script setup>
const props = defineProps({
  socket: Object,
});
</script>
