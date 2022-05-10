<script setup>
    import Phaser from 'phaser';
    import { onMounted, ref } from 'vue';
    
    var debug = true;

    /* Var config, contains the canvas size, initialize Phaser and charge the method's contained in scene (screen) */
    var globalx = 675;
    var globaly = 350;

    onMounted(() => {

        var config = {
            width: globalx+750,
            height: globaly+350,
            backgroundColor: '#06304E',
            type: Phaser.AUTO,
            parent: 'game-container',
            scene: {
                preload:preload,
                create: create,
                update: update
            }
        };

        var game = new Phaser.Game(config);
        var pals=["o","e","b","c"];     /** We create an array to storage the letters contained on the image's name. */
        var cards=[];

            //Precharge the images or variables to be used later.
            function preload(){  

                /** A Double for to walk first the "pals array (letters)" and after the numbers for precharge every image. */
                for (let i=0;i<pals.length;i++){
                    for (let j=1;j<=12;j++){
                        console.log(this.load.image(j+"-"+pals[i], '/img/'+j+"-"+pals[i]+'.png'));
                    }
                }

                /** Here we set the player's card space  */
                for(let i=1;i<=3;i++){
                    this.load.image('backcard'+i,'/img/backcard.png');
                }   
            }

            //Create or show the images which gonna be contained
            function create(){

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

            // this.input.on('pointerdown', function (_pointer, objectsClicked){
                //         objectsClicked[0].visible = false;
                //         console.log("hola")
                // });

            /*When the button is pressed, se gonna hide the text of waiting players*/
                fadeOut.on('pointerdown', function (_pointer){
                this.tweens.add({
                targets: WaitPlayers,
                alpha: 0,
                duration: 3000,
                ease: 'Power2',
                }, this);
                },this);
                
                /*We also hide the button itself*/
                fadeOut.on('pointerdown', function (_pointer){
                this.tweens.add({
                targets: fadeOut,
                alpha: 0,
                duration: 3000,
                ease: 'Power2',
                }, this);
                },this);
            
                /*We define the name of the actual types of cars*/
                var cardsActualPlayer = [];
                var xposition = 0;
                //Var to move the image x position on the screen.
                /** The same code of the previous for, including xposition, a scale (size of images) and a setOrigin (X,Y) 
                    to center the images.  **/
                for (let i=0;i<pals.length;i++){
                    xposition = xposition + 100;
                    for(let j=1;j<=12;j++){
                    cards[j+"-"+pals[i]]=this.add.image((globalx/1.5)+xposition,(globaly/2)+(j*25),j+"-"+pals[i]).setScale(0.35,0.325).setInteractive().setName([j+"-"+pals[i]]);
                    cards[j+"-"+pals[i]].visible=false;
                    }
                }
                if(debug) {
                console.log("[Debug] Array of the actual objects of the current cards in the middle with their certain position: ")
                console.log(cards);
                }
            /* There we obtain the current key of the actual card in the array objectsClicked.texture.key*/
            this.input.on('pointerdown', function (_pointer, objectsClicked) {
                cards[objectsClicked[0].texture.key].visible=true;
                cardsActualPlayer[objectsClicked[0].texture.key].visible=false;
            });
            this.input.on('pointerover', function (_pointer, objectsClicked) {
                cardsActualPlayer[objectsClicked[0].texture.key].setScale(0.40,0.40).setY(550);
            });
            this.input.on('pointerout', function (_pointer, objectsClicked) {
                cardsActualPlayer[objectsClicked[0].texture.key].setScale(0.35,0.35).setY(600);
            });
                
                for (let i=0;i<1;i++){
                    xposition = xposition + 45;
                    for(let j=1;j<=12;j++){
                    cardsActualPlayer[j+"-"+pals[i]]=this.add.image((globalx/1.26)+(j*30),globaly+250,j+"-"+pals[i]).setScale(0.35,0.325).setInteractive();
                    }
                }
            if (debug) {
                console.log("[Debug] Array of the current cards of the player playing: ");
                console.log(cardsActualPlayer);
            }
            /** Player's waiting. */
                const WaitPlayers = this.add.text(globalx-100,globaly,'ESPERANT JUGADORS...',{ fontFamily: 'Inter, "sans-serif"' }) .setScale(1.4).setInteractive();  /*Player Wait*/

                /** Player's position. */
                const PositionPlayer1 = this.add.text(globalx-600,globaly,'Player left',{ fontFamily: 'Inter, "sans-serif"' });  /*Player left*/
                
                const PositionPlayer2 = this.add.text(globalx+575 ,globaly,'Player right',{ fontFamily: 'Inter, "sans-serif"'}); /*Player right*/
            
                const PositionPlayer3 = this.add.text(globalx-20,globaly+320,'Player down',{ fontFamily:'Inter, "sans-serif"' });  /*Player down*/
                
                const PositionPlayer4 = this.add.text(globalx-5,globaly-350,'Player Up',{ fontFamily: 'Inter, "sans-serif"' });   /*Player up*/
                
                /** Back cards One backcard means one enemy player**/
                
                const PositionBackcardLeft = this.add.image(globalx-450,globaly,'backcard1').setScale(0.2,0.2).setAngle(-90);  /*Player left*/
                if (debug){ console.log("[Debug] If the seat its occupied this should be true");}
                PositionBackcardLeft.visible=false;
                
                const PositionBackcardRight = this.add.image(globalx+500 ,globaly,'backcard2').setScale(0.2,0.2).setAngle(-90); /*Player right*/

                PositionBackcardRight.visible=false;

                const PositionBackcardUp = this.add.image(globalx+30,globaly-275,'backcard3').setScale(0.2,0.2);   /*Player up*/

                PositionBackcardUp.visible=false;

                if(debug){
                    console.log("[Debug] The position of " + WaitPlayers.texture.key + " | x=" + PositionPlayer1.x+ " | y="+ PositionPlayer1.y);
                    console.log("[Debug] The position of " + PositionPlayer1.texture.key + " | x=" + PositionPlayer1.x+ " | y="+ PositionPlayer1.y);
                    console.log("[Debug] The position of " + PositionPlayer2.texture.key + " | x=" + PositionPlayer2.x+ " | y="+ PositionPlayer2.y);
                    console.log("[Debug] The position of " + PositionPlayer3.texture.key + " | x=" + PositionPlayer3.x+ " | y="+ PositionPlayer3.y);
                    console.log("[Debug] The position of " + PositionPlayer4.texture.key + " | x=" + PositionPlayer4.x+ " | y="+ PositionPlayer4.y);
                    }
        }
            
            /*Events in realtime*/
            function update(){
            // console.log('Actualitzant!');
            }
    });
</script>

<template>
    <Menu/>
    <div id="game-container"></div>
</template>

<style>
   @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
</style>