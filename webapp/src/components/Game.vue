<script setup>
/** Import of the GAMEDEV framework**/
import Phaser from "phaser";

/** Import of the chat component **/
import Chat from "../components/Chat.vue";

/** What is it ?**/
import { onMounted, ref } from "vue";

/** Constant to define when the chat is opened **/
const isOpen = ref(false);

const isError = ref(false);

/** Using the env file we can identify the debug variable **/
const debug = import.meta.env.VITE_DEBUG;

/** Defined the variable to display the error msg**/
const showError = false;

/** We define the emit object **/

const emit = defineEmits(['update:currentPage']);


/** To be able to use the socket as an object, we define it as an props**/
const props = defineProps({
  socket: Object,
  roomName: Array,
});

/** Generic constants to resize the screen **/
const globalx = 675;
const globaly = 400;

/**
 *
 * Defined the colors of the game that can be used in the screen background
 * Changecolor -> Changes the color of the game container using dom
 *
 * **/
const colours = ["#023117", "#350202", "#210231", "#06304E"];
let index = 0;

const ChangeColor = () => {
  const gamecolor = document.getElementById("game-container");
  if (index > colours.length) {
    index = 0;
  }
  index++;
  gamecolor.style.backgroundColor = colours[index];
  document.body.style.background = colours[index];
};
let errormsg = ref("");
let counterTime = ref("");

/** We mound the component in idependent div
 *
 * @width: Width of the canva
 * @height : Height of the canva
 * @type : Phaser type used
 * @parent : The container div that we gonna export the component
 * @transparent : Back Visibilty
 * @scene : Defined Phaser methods
 * **/

onMounted(() => {
  const config = {
    width: globalx + 750,
    height: globaly + 350,
    resolution: 3,
    type: Phaser.AUTO,
    parent: "game-container",
    transparent: true,
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
  };

  /** Creation of the Phaser game using the config parameters**/
  new Phaser.Game(config);

  /** Defined the array of cards and the types **/
  const pals = ["o", "e", "b", "c"];
  const cards = [];

  /**
   * The function preaload charges the needed resources to display the game
   *  Here we are loading the images of all the cards needed for the game
   * **/
  function preload() {
    if (debug) {
      console.log("[Debug]: Game started");
    }
    /** A Double for to walk first the "pals array (letters)" and after the numbers for precharge every image. */
    for (let i = 0; i < pals.length; i++) {
      for (let j = 1; j <= 12; j++) {
        this.load.image(j + "-" + pals[i], "/img/" + j + "-" + pals[i] + ".png");
      }
    }
    /** Here we set the player's card space  */
    for (let i = 1; i <= 3; i++) {
      this.load.image("backcard" + i, "/img/backcard.png");
    }
    if (debug) {
      console.log("[Debug]: Loaded images correctly");
    }
  }
  /**
   * The method create gonna create all the resources for the game
   * The actual interactions between the server and the client should be made inside here
   * **/
  function create() {
    /**  Button to start the game **/

    const startButton = this.add
      .text(880, 345, " 🏁 COMENÇAR  🏁", {
        fontFamily: 'Inter, "cursive"',
        color: "black",
        backgroundColor: "#867A7A",
        fontStyle: "bold",
        padding: { left: 10, right: 10, top: 10, bottom: 10 },
      })
      .setInteractive()
      .setFontSize(20)
      .setName("buttonStart");

    /**
     *  Function that detects when button is pressed
     *  @action: Sends a petition to the server to start the game
     * **/

    startButton.on(
      "pointerdown",
      function (_pointer) {
        props.socket.emit("game:rooms:start-game");
      },
      this
    );
    /** Player's waiting. */
    const WaitPlayers = this.add.text(globalx - 230, globaly- 60  , "ESPERANT JUGADORS...", {
          fontFamily: 'Inter, "sans-serif"',
          fontStyle: "normal",
          fontSize: "24px",
          color: "black",
          strokeThickness: 7,
          fontWeight: "bold",
          stroke: "#f6eab0",
        })
        .setScale(1.4);

  /** Invisible button to skip the game **/

    const skipButton = this.add
      .text(1000, 500, " Skip", {
        fontFamily: 'Inter, "sans-serif"',
        color: "black",
        backgroundColor: "#F7EBB1",
        fontStyle: "normal",
        padding: { left: 20, right: 20, top: 10, bottom: 10 },
      })
      .setInteractive()
      .setFontSize(20);

    skipButton.visible = false;

    /**
     *  Function that detects when button is pressed
     *  @action : Sends a petition to the server to skip the turn
     * **/

    skipButton.on(
      "pointerdown",
      function (_pointer) {
        console.log("Hola");
        props.socket.emit("game:rooms:skip-turn");
      },
      this
    );


    /************** PLAYER POSITIONS TODO IMPORTANT **************/

    /** TODO: Know how many players are here and identify them **/
    const currentPlayers = [];
    props.socket.on("game:room:player-join", (player) => {
      console.log(player);
    });

    /** Player's names positions in the game */

    const PositionPlayer1 = this.add.text(80, 350, "Player left", {
      fontFamily: 'Koulen, "cursive"',
      color: "#000000",
      fontSize: "24px",
      backgroundColor: "#72c3d3",
      fontStyle: "normal",
      padding: { left: 15, right: 15, top: 7, bottom: 7 },
    });

    const PositionPlayer2 = this.add.text(1200, 350, "Player Right", {
      fontFamily: 'Koulen, "cursive"',
      fontSize: "24px",
      color: "#000000",
      backgroundColor: "#72d397",
      fontStyle: "normal",
      padding: { left: 17, right: 17, top: 7, bottom: 7 },
    });

    const PositionPlayer3 = this.add.text(675, 700, "Player down", {
      fontFamily: 'Koulen, "cursive"',
      fontSize: "24px",
      color: "#000000",
      backgroundColor: "#d372ca",
      fontStyle: "normal",
      padding: { left: 15, right: 15, top: 7, bottom: 7 },
    });

    const PositionPlayer4 = this.add.text(675, 15, "Player up", {
      fontFamily: 'Koulen, "cursive"',
      fontSize: "24px",
      color: "#000000",
      backgroundColor: "#d3d372",
      fontStyle: "normal",
      padding: { left: 15, right: 15, top: 7, bottom: 7 },
    });

    /** Backcards of the players **/

    const PositionBackcardLeft = this.add
      .image(globalx - 450, globaly, "backcard1")
      .setScale(0.2, 0.2)
      .setAngle(-90); /*Player left*/
    PositionBackcardLeft.visible = false;
    const PositionBackcardRight = this.add
      .image(globalx + 500, globaly, "backcard2")
      .setScale(0.2, 0.2)
      .setAngle(-90); /*Player right*/
    PositionBackcardRight.visible = false;
    const PositionBackcardUp = this.add
      .image(globalx + 30, globaly - 275, "backcard3")
      .setScale(0.2, 0.2); /*Player up*/
    PositionBackcardUp.visible = false;

    /********************END OF PLAYER'S POSITIONS******************/

    /** Stats of the game
     * @nameroom
     * @currentplayer
     * **/

    this.add.text(25, 10, "Id sala: " + props.roomName.id, {
      fontFamily: 'Inter, "sans-serif"',
      color: "#000000",
      backgroundColor: "#F7EBB1",
      fontStyle: "normal",
      padding: { left: 15, right: 15, top: 7, bottom: 7 },
    });

    this.add.text(25, 50, "Nom sala: " + props.roomName.name, {
      fontFamily: 'Inter, "sans-serif"',
      color: "#000000",
      backgroundColor: "#F7EBB1",
      fontStyle: "normal",
      padding: { left: 15, right: 15, top: 7, bottom: 7 },
    });

    /**
     * Event that checks the turn of the current player
     *
     * action: Update the current player
     *  **/

    props.socket.on("game:rooms:turn", (turn) => {
      if(turn == null){ turn = "Comença el 5 😋";}
     turnActualPlayer.text = "El turn del jugador és: " + turn;
    });

    const turnActualPlayer = this.add.text(25, 90, "Comença el 5 😋"  , {
      fontFamily: 'Inter, "sans-serif"',
      color: "white",
      backgroundColor: "gray",
      fontStyle: "normal",
      strokeThickness: 1,
      strokeRoundedRect: (32, 32, 300, 200, 10),
      padding: { left: 15, right: 15, top: 7, bottom: 7 },
    });

    /**
     * We define the array of the actual cards we gonna receive
     * **/
    const cardsRecieved = [];
    let xposition = 0;

    /**
     * This event let us know the cards of the actual client
     * @cardsActualPlayer: The array of the cards generated by the server
     * **/
    props.socket.on("game:rooms:get-cards", (cardsActualPlayer,gamePlayers) => {
      /** We start showing the skipbutton
       *  Next action
       * We hide the startButton and watingplayers text **/
      props.socket.on("game:rooms:clock", (time) => {
        counterTime.value = time;
        console.log(counterTime)
      });
        if(debug){
        console.log("Games in the match :D")
        console.log({gamePlayers});
      }
      skipButton.visible = true;
      this.tweens.add(
        {
          targets: startButton,
          alpha: 0,
          duration: 2000,
          ease: "Power2",
        },
        this
      );
      this.tweens.add(
        {
          targets: WaitPlayers,
          alpha: 0,
          duration: 2000,
          ease: "Power2",
        },
        this
      );

      if (debug) {
        console.log("[Debug] Array of the current cards of the player playing: ");
        console.log(cardsRecieved);
        console.log("[Debug] Number of cards received: ");
        console.log(cardsActualPlayer.length);
      }

      /** Depending of the number of cards that we received
       * we can know how many players are playing **/

      let positionActualCardsX = 1.25;

      if (cardsActualPlayer.length === 24) {
        positionActualCardsX = 1.75;
      } else if (cardsActualPlayer.length === 16) {
        positionActualCardsX = 1.4;
      }

      /** Display all the cards of the player client **/

      for (let j = 0; j < cardsActualPlayer.length; j++) {
        cardsRecieved[cardsActualPlayer[j]] = this.add
          .image(
            globalx / positionActualCardsX + j * 30,
            globaly + 250,
            cardsActualPlayer[j]
          )
          .setScale(0.35, 0.325)
          .setInteractive();
      }
    });

    /** Display all of the cards in the table **/

    for (let i = 0; i < pals.length; i++) {
      xposition = xposition + 100;
      for (let j = 1; j <= 12; j++) {
        cards[j + "-" + pals[i]] = this.add
          .image(globalx / 1.5 + xposition + 100, globaly + 150 - j * 28, j + "-" + pals[i])
          .setScale(0.35, 0.325)
          .setName([j + "-" + pals[i]])
          .setData("depth", j);
        cards[j + "-" + pals[i]].visible = false;
      }
    }

    if (debug) {
      console.log(
        "[Debug] Array of the actual objects of the current cards in the middle with their certain position: "
      );
      console.log(cards);
    }

    /** Event that detects when the client pressed any interactive object
     *
     * @action: Sends a petition to the server to move a card
     *
     * **/
    this.input.on("pointerdown", function (_pointer, objectsClicked) {
      const cardMoved = objectsClicked[0].texture.key;

      props.socket.emit("game:rooms:move-card", cardMoved);

      props.socket.on("game:rooms:error", (message) => {
        errormsg.value = message;
        console.log(errormsg.value);
        setTimeout(removeMessage, 4000);
      });
    });
    function removeMessage(){
      errormsg.value = null;
    }
    /**  Event that detects when a client hover an object
     *
     * @action: Resizes a card bigger
     *
     * **/
    this.input.on("pointerover", function (_pointer, objectsClicked) {
      if (objectsClicked[0].name === "buttonStart") {
        return;
      }
      cardsRecieved[objectsClicked[0].texture.key].setScale(0.5, 0.55).setY(605);
    });

    /**  Event that detects when a client hover out an object
     *
     * @action: Returns the previous size
     *
     * **/

    this.input.on("pointerout", function (_pointer, objectsClicked) {
      if (objectsClicked[0].name === "buttonStart") {
        return;
      }
      cardsRecieved[objectsClicked[0].texture.key].setScale(0.35, 0.325).setY(650);
    });

    /**  Event that detects if the server returns a success move by another player
     *
     * @action: Sets visible the card
     *
     * **/

    props.socket.on("game:rooms:player-move-card:success", (card) => {
      cards[card].visible = true;
    });

    /**  Event that detects if the server returns a success move by the client player
     *
     * @action: Sets visible the card and hides his card
     *
     * **/

    props.socket.on("game:rooms:move-card:success", (card) => {
      cards[card].visible = true;
      cardsRecieved[card].visible = false;
    });
  }

  function update() {}
});
</script>

<template>
  <!-- Span top edge -->
  <div class="relative">
    <div class="fixed top-2 left-1/2 right-1/2 rounded-md text-white font-bold text-xl p-1 w-24 hover:transition-colors duration-200">Temps</div>
    <div class="fixed top-12 ml-1 text-center left-1/2 right-1/2 rounded-md bg-[#585858] text-white font-bold text-xl p-1 w-16 hover:transition-colors duration-200 hover:animate-pulse hover:bg-amber-300" v-if="counterTime" >{{ counterTime }}s</div>
    </div>

  <div id="game-container">
    <div
      v-if="errormsg"
      class="bg-red-100 border border-red-400 text-center text-red-700 rounded absolute top-28 right-40 w-80"
      role="alert"
    >
      <div class="h-6 w-full text-right pt-1 pr-1">
        <button @click="errormsg = !errormsg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 text-red hover:bg-[#E79F9F] rounded-full"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
      <div class="w-full pb-5">
        <span class="font-bold text-md" v-text="errormsg" />
      </div>
    </div>
    <div class="absolute top-28 right-2">
      <button
        @click="ChangeColor"
        class="rounded-md bg-[#585858] text-white font-bold text-md p-1 w-28"
      >
        Color Tauler
      </button>
    </div>
  </div>
  <div class="absolute bottom-10 right-2">
    <div v-if="isOpen" class="relative top-3">
      <Chat :socket="props.socket"></Chat>
    </div>
    <div class="absolute right-0 flex">
      <button
        @click="isOpen = !isOpen"
        class="flex items-center justify-center h-12 w-12 hover:bg-gray-500 hover:rounded-full hover:transition duration-500 ease-in-out"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          class="h-8 w-8 fill-white"
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          viewBox="0 0 60 60"
          style="enable-background: new 0 0 60 60"
          xml:space="preserve"
        >
          <path
            d="M44.348,12.793H2.652C1.189,12.793,0,13.982,0,15.445v43.762l9.414-9.414h34.934c1.463,0,2.652-1.19,2.652-2.653V15.445   C47,13.982,45.811,12.793,44.348,12.793z M10,35.777c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4S12.206,35.777,10,35.777z    M23,35.777c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4S25.206,35.777,23,35.777z M36,35.777c-2.206,0-4-1.794-4-4s1.794-4,4-4   s4,1.794,4,4S38.206,35.777,36,35.777z"
          />
          <path
            d="M57.348,0.793H12.652C11.189,0.793,10,1.982,10,3.445v7.348h34.348c2.565,0,4.652,2.087,4.652,4.652v25.332h11V3.445   C60,1.982,58.811,0.793,57.348,0.793z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Koulen&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Skranji:wght@700&display=swap");
/*If something fails and u don't know what to do delete this
   .all-game {
     zoom: 0.80;
     -moz-transform: scale(0.75);
     -moz-transform-origin: 0 0;
   }*/
</style>
