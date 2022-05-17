
<script setup>

import Phaser from 'phaser';
import Chat from '../components/Chat.vue';
import { onMounted, ref} from 'vue';

const isOpen = ref(false);

const debug = false;

const props = defineProps({
  socket: Object,
});

const currentPlayers = [];
props.socket.on('game:room:player-join', player => {
  console.log(player);
  currentPlayers.push(player);
  currentPlayers.length;
  console.log(currentPlayers);
});
/*TODO: Check the turn of the current player */
props.socket.on('game:room:turn', turn => {
  console.log(turn);
});

/* Var config, contains the canvas size, initialize Phaser and charge the method's contained in scene (screen) */
const globalx = 675;
const globaly = 350;

onMounted(() => {
  const config = {
    width: globalx + 750,
    height: globaly + 350,
    backgroundColor: '#06304E',
    type: Phaser.AUTO,
    parent: 'game-container',
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };

  const game = new Phaser.Game(config);
  const pals = ["o", "e", "b", "c"];
  /** We create an array to storage the letters contained on the image's name. */
  const cards = [];

  //Precharge the images or variables to be used later.
  function preload() {
    if(debug){
      /**TODO: Get the name of the current room **/
      console.log["Debug:" + "Game started"]
    }
    /** A Double for to walk first the "pals array (letters)" and after the numbers for precharge every image. */
    for (let i = 0; i < pals.length; i++) {
      for (let j = 1; j <= 12; j++) {
        this.load.image(j + "-" + pals[i], '/img/' + j + "-" + pals[i] + '.png');
      }
    }

    /** Here we set the player's card space  */
    for (let i = 1; i <= 3; i++) {
      this.load.image('backcard' + i, '/img/backcard.png');
    }
  }


  //Create or show the images which gonna be contained
  function create() {

    /*Here we create the button than gonna start the game*/
    const fadeOut = this.add.text(880, 345, 'Començar', {
      fontFamily: 'Inter, "sans-serif"',
      color: '#000000',
      backgroundColor: '#F7EBB1',
      fontStyle: 'normal',
      borderradius: "5px",
      strokeThickness: 1,
      padding: {left: 10, right: 10, top: 10, bottom: 10}
    }).setInteractive().setFontSize(20);


    /*When the button is pressed, se gonna hide the text of waiting players*/

    /*We also hide the button itself*/
    fadeOut.on('pointerdown', function (_pointer) {
      props.socket.emit('game:rooms:start-game');

      /** TODO: Check if we can really create the room **/

      this.tweens.add({
        targets: fadeOut,
        alpha: 0,
        duration: 3000,
        ease: 'Power2',
      }, this);
      this.tweens.add({
        targets: WaitPlayers,
        alpha: 0,
        duration: 3000,
        ease: 'Power2',
      }, this);
    }, this);

    /** Player's position. */
    this.add.text(globalx - 600, globaly, 'Player left', {fontFamily: 'Inter, "sans-serif"'});  /*Player left*/

    this.add.text(globalx + 575, globaly, 'Player right', {fontFamily: 'Inter, "sans-serif"'}); /*Player right*/

    this.add.text(globalx - 20, globaly + 320, 'Player down', {fontFamily: 'Inter, "sans-serif"'});  /*Player down*/

    this.add.text(globalx - 5, globaly - 350, 'Player Up', {fontFamily: 'Inter, "sans-serif"'});   /*Player up*/

    /** Back cards One backcard means one enemy player**/


    if (debug) {
      console.log("[Debug] If the seat its occupied this should be true");
    }

    const PositionBackcardLeft = this.add.image(globalx - 450, globaly, 'backcard1').setScale(0.2, 0.2).setAngle(-90);  /*Player left*/

    PositionBackcardLeft.visible = false;

    const PositionBackcardRight = this.add.image(globalx + 500, globaly, 'backcard2').setScale(0.2, 0.2).setAngle(-90); /*Player right*/

    PositionBackcardRight.visible = false;

    const PositionBackcardUp = this.add.image(globalx + 30, globaly - 275, 'backcard3').setScale(0.2, 0.2);   /*Player up*/

    PositionBackcardUp.visible = false;

    /** Stats of the game **/

    const nameRoom = "Sala #1";

    const TextNameOfRoom = this.add.text(10, 10, "Nom sala: " + nameRoom, {fontFamily: 'Inter, "sans-serif"'});  /* Name of the room */

    const CurrentPlayer = "Player 5";

    const TurnPlayerName = this.add.text(10, 40, "El turn es del: " + CurrentPlayer, {fontFamily: 'Inter, "sans-serif"'});

    /** Player's waiting. */
    const WaitPlayers = this.add.text(globalx - 100, globaly, 'ESPERANT JUGADORS...',
        {fontFamily: 'Inter, "sans-serif"'}).setScale(1.4); /*Player Wait*/

    const cardsRecieved = [];
    const cardsActualPlayer = [];
    let xposition = 0;
      props.socket.on('game:rooms:get-cards', cardsActualPlayer => {
        console.log(cardsRecieved);
          for (let j = 0; j < cardsActualPlayer.length; j++) {
            cardsRecieved[cardsActualPlayer[j]] = this.add.image((globalx / 1.26) + (j * 30), globaly + 250, cardsActualPlayer[j]).setScale(0.35, 0.325).setInteractive();
        }
        if (debug) {
          console.log("[Debug] Array of the current cards of the player playing: ");
          console.log(cardsRecieved);
        }
      });
      /** The same code of the previous for, including xposition, a scale (size of images) and a setOrigin (X,Y)
       to center the images.  **/
      for (let i = 0; i < pals.length; i++) {
        xposition = xposition + 100;
        for (let j = 1; j <= 12; j++) {
          cards[j + "-" + pals[i]] = this.add.image((globalx / 1.5) + xposition, (globaly + 150) - (j * 28), j + "-" + pals[i]).setScale(0.35, 0.325).setName([j + "-" + pals[i]]).setData("depth", j);
          cards[j + "-" + pals[i]].visible = false;
        }
      }
      if (debug) {
        console.log("[Debug] Array of the actual objects of the current cards in the middle with their certain position: ")
        console.log(cards);
      }

     // There we obtain the current key of the actual card in the array objectsClicked.texture.key
      this.input.on('pointerdown', function (_pointer, objectsClicked) {
        const cardMoved = objectsClicked[0].texture.key;
        props.socket.emit('game:rooms:move-card', cardMoved);

        /*** TODO: Need the event to check **/
        cards[objectsClicked[0].texture.key].visible = true;
        cardsRecieved[objectsClicked[0].texture.key].visible = false;
      });
      this.input.on('pointerover', function (_pointer, objectsClicked) {
        cardsRecieved[objectsClicked[0].texture.key].setScale(0.50, 0.50).setY(550);
        // objectsClicked[0].depth = 100;
        console.log(objectsClicked[0]);
      });
      this.input.on('pointerout', function (_pointer, objectsClicked) {
        //objectsClicked[0].depth = objectsClicked[0].getData("depth");
        cardsRecieved[objectsClicked[0].texture.key].setScale(0.35, 0.325).setY(600);
        console.log(objectsClicked[0]);
      });
      console.log(cardsRecieved);
    }



  /*Events in realtime*/
  function update() {

    // console.log('Actualitzant!');
  }
});
</script>

<template>
  <div id="game-container"></div>
  <div class="absolute bottom-10 right-2">
    <div v-if="isOpen" class="relative top-3">
      <Chat :socket="props.socket"></Chat>
    </div>
    <div class="absolute right-0 flex">
      <button @click="isOpen = !isOpen" class="flex items-center justify-center h-12 w-12 hover:bg-gray-500 hover:rounded-full hover:transition duration-500 ease-in-out">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="h-8 w-8 fill-white" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 60 60" style="enable-background:new 0 0 60 60;" xml:space="preserve">
	        <path d="M44.348,12.793H2.652C1.189,12.793,0,13.982,0,15.445v43.762l9.414-9.414h34.934c1.463,0,2.652-1.19,2.652-2.653V15.445   C47,13.982,45.811,12.793,44.348,12.793z M10,35.777c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4S12.206,35.777,10,35.777z    M23,35.777c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4S25.206,35.777,23,35.777z M36,35.777c-2.206,0-4-1.794-4-4s1.794-4,4-4   s4,1.794,4,4S38.206,35.777,36,35.777z"/>
          <path d="M57.348,0.793H12.652C11.189,0.793,10,1.982,10,3.445v7.348h34.348c2.565,0,4.652,2.087,4.652,4.652v25.332h11V3.445   C60,1.982,58.811,0.793,57.348,0.793z"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<style>
   @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
</style>