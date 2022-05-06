<template>
 
 <div>
    <img src="https://i.postimg.cc/cJvBWRgT/Cinquillo-Finished.png" alt="cinquillo" class="w-96 img-cinquillo mt-12 ml-48" draggable="false">
 </div>
 
 <div class="flex flex-center items-center justify-center  main-home">
 
     <div class="flex flex-col button buttons mt-40 mt-28">
            <form action="#">
              <button class="custom-btn btn-13">CREAR SALA</button>
            </form>
           
            <button class="custom-btn btn-13" @click="onClickJoin">UNIR-SE</button>
            <form action="#">
              <button class="custom-btn btn-13">REGLES</button>
            </form>
    </div>  
 
    <div class="w-72">
        <img src="https://i.postimg.cc/Vvvs6WMZ/Cards-Edited.png" alt="cartas" class="cards" draggable="false">
    </div>   
    
 </div>
</template>

<script setup>
const props = defineProps({
  socket: Object,
});

const emit = defineEmits(['update:currentPage']);

const onClickJoin = () => {
  emit('update:currentPage', 'table');
}
</script>

<style>
body{
  background: rgb(19,47,78);
  background: linear-gradient(79deg, rgba(19,47,78,1) 0%, rgba(58,97,140,1) 26%, rgba(116,145,172,1) 100%, rgba(141,165,185,1) 100%, rgba(168,187,200,1) 100%, rgba(198,212,217,1) 100%, rgba(250,255,245,1) 100%);
  background-repeat: no-repeat;
  object-fit: cover;
  overflow: hidden;
   min-height: 100%;
}
    
html {
  height: 100%;
}

    
.button{
  width: 100%;
  margin: 40px auto;
  text-align: center;
}
    
.btn-13 {
  background-color: #89d8d3;
background-image: linear-gradient(315deg, rgb(0, 255, 239) 0%, rgb(3, 135, 200) 74%);
  border: none;
  z-index: 1;
}
.btn-13:after {
  position: absolute;
  content: "";
  width: 100%;
  height: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  border-radius: 5px;
   background-color: #4dccc6;
background-image: linear-gradient(315deg, rgb(158, 196, 215) 0%, rgba(0, 89, 168, 0.7) 74%);
  box-shadow:
   -7px -7px 20px 0px #f8ecb21c,
   -4px -4px 5px 0px #fff39399,
   7px 7px 20px 0px #fbf38508,
   4px 4px 5px 0px #f4ea9112;
  transition: all 0.3s ease;
}
.btn-13:hover {
  color: #fff;
}
.btn-13:hover:after {
  top: 0;
  height: 100%;
}
.btn-13:active {
  top: 2px;
}

.custom-btn {
  width: 200px;
  height: 40px;
  color: black;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: 'League Gothic', sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
   box-shadow: inset 2px 2px 2px 0px rgba(69, 130, 225, 0.34), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1);
  outline: none;
  margin-top: 30px;
}

.flex-center{
  width: 500px;
}

.img-cinquillo{
  margin-top: 30px;
  margin-left: 30px;
}

.buttons{
  margin-left: 25rem;
}

.cards{
  width: 580px !important;
  max-width: none !important;
  margin-left: 203px;
}

@import url('https://fonts.googleapis.com/css2?family=League+Gothic&display=swap');

</style>