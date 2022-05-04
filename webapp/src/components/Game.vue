<template>
    <Menu/>
</template>

<script>
import Phaser from 'phaser';

var debug = false;

/* Var config, contains the canvas size, initialize Phaser and charge the method's contained in scene (screen) */
var globalx = 675;
var globaly = 350;

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

    //Precharge the images or variables to be used later.
    function preload(){      
    
        var pals=["o","e","b","c"];     /** We create an array to storage the letters contained on the image's name. */
        var cartes=[];                  /** We create an array to load and charge the images */

        /** A Double for to walk first the "pals array (letters)" and after the numbers for precharge every image. */
        for (let i=0;i<pals.length;i++){
            for (let j=1;j<=12;j++){
                this.load.image(j+"-"+pals[i], '/img/'+j+"-"+pals[i]+'.png');
            }
        }

    

        /** Here we set the player's card space  */
        for(let i=1;i<=3;i++){
            this.load.image('backcard'+i,'/img/backcard.png');
        }
    }

    //Create or show the images wich are contained in preload method.
    function create(){
        var pals=["o","e","b","c"];
        var cartes=[];
        var xposition = 0;      //Var to move the image x position on the screen.

        /** The same code of the previous for, including xposition, a scale (size of images) and a setOrigin (X,Y) 
            to center the images.  */
        for (let i=0;i<pals.length;i++){
            xposition = xposition + 100;
            for(let j=1;j<=12;j++){
                this.add.image((globalx/1.5)+xposition,(globaly/2)+(j*25),j+"-"+pals[i]).setScale(0.35,0.325);
            }
        }

        for (let i=0;i<2;i++){
            xposition = xposition + 45;
            for(let j=1;j<=12;j++){
                this.add.image((globalx/1.26)+(j*25),globaly+250,j+"-"+pals[i]).setScale(0.35,0.325);
            }
        }

        /** Player's position. */
        const PositionPlayer1 = this.add.text(globalx-600,globaly,'Player left',{ fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });  /*Player left*/
        
        const PositionPlayer2 = this.add.text(globalx+575 ,globaly,'Player right',{ fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }); /*Player right*/
    
        const PositionPlayer3 = this.add.text(globalx-20,globaly+320,'Player down',{ fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });  /*Player down*/
         
        const PositionPlayer4 = this.add.text(globalx-5,globaly-350,'Player Up',{ fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });   /*Player up*/
        
        /** Back cards */
        
        const PositionBackcardLeft = this.add.image(globalx-450,globaly,'backcard1',{ fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setScale(0.2,0.2).setAngle(-90);  /*Player left*/
        
        const PositionBackcardRight = this.add.image(globalx+500 ,globaly,'backcard2',{ fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setScale(0.2,0.2).setAngle(-90); /*Player right*/
             
        const PositionBackcardUp = this.add.image(globalx+30,globaly-275,'backcard3',{ fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setScale(0.2,0.2);   /*Player up*/

        if(debug){
            console.log("[Debug] The position of " + PositionPlayer1.texture.key + " | x=" + PositionPlayer1.x+ " | y="+ PositionPlayer1.y);
            console.log("[Debug] The position of " + PositionPlayer2.texture.key + " | x=" + PositionPlayer2.x+ " | y="+ PositionPlayer2.y);
            console.log("[Debug] The position of " + PositionPlayer3.texture.key + " | x=" + PositionPlayer3.x+ " | y="+ PositionPlayer3.y);
            console.log("[Debug] The position of " + PositionPlayer4.texture.key + " | x=" + PositionPlayer4.x+ " | y="+ PositionPlayer4.y);}
    }

    function update(){
        console.log('Updating!');
    }

</script>