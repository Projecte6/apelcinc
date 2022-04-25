<template>
  <div class="h-screen bg-[#06304E]">
    <nav class="nav flex justify-between items-center px-6 py-4">
      <div class="flex justify-between">
        <img src="/public/img/logo.png" class="w-80" />
      </div>
      <div class="flex items-center mr-20 space-x-2">
        <button v-on:click="" class="but">Sortir</button>
        <button v-on:click="" class="but">Regles</button>
      </div>
    </nav>
    <div class="mt-20 flex flex-col items-center llargada">
      <div class="overflow-y-auto bg-[#C4C4C4] rounded-lg amplada">
        <div class="py-2 inline-block min-w-full px-6">
          <div class="overflow-hidden">
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
<script setup></script>
