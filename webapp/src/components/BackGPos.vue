
<script>
import Phaser from 'phaser';

/* Var config, contains the canvas size, initialize Phaser and charge the method's contained in scene (screen) */

var config = {
    width: 1536,
    height: 721,
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
        for(let i=1;i<=4;i++){
            this.load.image('player'+i,'/img/rock.jpg');
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
                this.add.image(500+xposition,j*25,j+"-"+pals[i]).setScale(0.35,0.325).setOrigin(0.5,-1.2);
            }
        }

        /** Player's position. */
        this.add.image(200,370,'player1').setScale(0.6,0.6);  /*Player left*/
        
        this.add.image(1350,370,'player2').setScale(0.6,0.6); /*Player right*/
        
        this.add.image(750,640,'player3').setScale(0.6,0.6);  /*Player down*/
         
        this.add.image(750,80,'player4').setScale(0.6,0.6);   /*Player up*/
    }

    function update(){
        console.log('Updating!');
    }

</script>