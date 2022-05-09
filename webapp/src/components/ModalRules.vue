<template>
  <div class="drop-shadow-lg text-white w-7/12">
    <div class="flex justify-end bg-[#072134] rounded-t-xl pt-1 pr-1">
      <button @click="$emit('close')"><svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9 text-red-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    </div>
    <div class="flex justify-center w-full bg-[#072134] pb-6 border-b-4">
      <h1 class="font-extrabold text-6xl">Regles</h1>
    </div>
    <div class="p-5 bg-[#3f474d]">
      <div class="mt-4 border-solid border-b-4 border-b-[#06304E]">
        <h3 class="font-bold text-2xl mb-3">Objectiu</h3>
      </div>
    <div class="space-y-4 mt-3">
      <ul class="list-disc list-outside pl-5 space-y-2">
        <li>Es reparteixen totes les cartes i el joc consistei en col·locar les cartes sobre la taula fins que et quedis sense.</li>
        <li>El primer jugador que aconsegueix col·locar totes les seves cartes sobre la taula (quedant-se per tant sense cap a la mà) és el guanyador.</li>
      </ul>
    </div>
    <div class="mt-4 border-solid border-b-4 border-b-[#06304E]">
      <h3 class="font-bold text-2xl mb-3" >Com es juga</h3>
    </div>
    <div class="space-y-3 mt-3">
      <ul class="list-disc list-outside pl-5 space-y-2">
        <li>Comença el jugador que tingui el 5 d'or. Es col·loca sobre la taula.</li>
        <li>Després continua el jugador de la dreta i així successivament.</li>
        <li>Només es poden col·locar els cincs de cada pal o totes aquelles cartes que segueixen en progressió ascendent o descendent a les que hi ha a la taula.  És a dir, si per exemple només està col·locat el cinc d'ors a la taula, els jugadors només podran col·locar el sis o el quatre d'ors o un cinc d'un altre pal.</li>
        <li>Si un jugador no pot col·locar cap carta, passa, i el torn correspon al següent jugador.  Només es pot passar si el jugador no té cap carta per col·locar; sinó, està obligat a tirar.</li>
        <li>Només es pot tirar una carta per torn, encara que puguis tirar dos o més a la vegada.</li>
      </ul>
    </div>
    </div>
    <div class="h-10 rounded-b-xl bg-[#072134] border-t-2"></div>
  </div>
</template>

<script setup>
defineEmits("close")
</script>