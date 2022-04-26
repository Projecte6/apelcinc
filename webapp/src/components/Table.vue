<template>
  <div class="h-screen bg-[#06304E]">
    <nav class="bg-[#3f474d] flex justify-between items-center px-6 py-4">
      <div class="flex justify-between">
        <img src="/public/img/logo.png" class="w-80" />
      </div>
      <div class="flex items-center mr-20 space-x-2">
        <button @click="" class="rounded-md bg-[#585858] text-white font-bold text-xl p-1 w-24">Sortir</button>
        <button @click="isOpen = true" class="rounded-md bg-[#585858] text-white font-bold text-xl p-1 w-24">Regles</button>
        <teleport to="body">
          <div class="flex justify-center items-center absolute top-0 left-0 w-full h-full" v-if="isOpen">
            <modal-rules @close="isOpen = false" />
          </div>
        </teleport>
      </div>
    </nav>
    <div class="mt-20 flex flex-col items-center h-[60%]">
      <div class="overflow-y-auto bg-[#C4C4C4] rounded-lg w-[80%]">
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
  </div>
</template>

<script>
export default {
  components: {
    ModalRules,
  },
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
import { ref } from "vue";
import ModalRules from "../components/ModalRules.vue";

const isOpen = ref(false);
</script>
