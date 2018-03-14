import config from './config';
import Leap  from 'leapjs';

import {getCoords} from './utils';

export default {
    preload : preload,
    create : create,
    update : update,
    render : render
}
// Variables
let platforms = [ {x: config.width/2 , y:config.height, scale: 2}, {x:600,y:400}, {x:50,y:250}, {x:750,y:220} ];
let objectPlatform;

let player;
let palm;
let input;

let wolfs;
let frameNames;


let cheeses;
let score = 0;
let scoreText;

function preload (){
    this.load.image('bg', 'assets/test/BG.png');
    this.load.image('ground', 'assets/test/sPlatform.png');
    this.load.image('cheese', 'assets/test/fromage.png');
    this.load.spritesheet('player', 'assets/test/dude.png',{frameWidth: 32,frameHeight: 48});
    this.load.spritesheet('wolf', 'assets/spritesCharacter/Wolf/wolfWalk.png',{frameWidth: 170 ,frameHeight: 170});
}

function create (){
    // Background
    this.add.image(0, 500, 'bg');

    // Create platforms
    objectPlatform = this.physics.add.staticGroup();
    objectPlatform.enableBody = true;
    platforms.forEach(platform => {
        objectPlatform
            .create(platform.x, platform.y, 'ground')
            .setScale( platform.scale ? platform.scale : 1 )
            .refreshBody();
    });

    // Player
    player = this.physics.add.sprite(100, 450, 'player');
    player.setCollideWorldBounds(true);


    // Player movement

    const myController = new Leap.Controller({enableGestures: true});
    myController.connect();


    myController.on('frame', (frame) => {
        frame.hands.forEach( hand => {
            palm = getCoords(hand.palmPosition, frame);

            if (palm.x >= 100){
                player.anims.play('right', true);
                player.setVelocityX(palm.x);
            }else{
                player.anims.play('left', true);
                player.setVelocityX(palm.x);
            }

            if(palm.x > 0 && palm.x < 100 ){
                player.anims.play('turn', true);
                player.setVelocityX(0);
            }
            if (hand.grabStrength > .90 && player.body.touching.down) {
                player.setVelocityY(-200);
            }
            console.log(palm);
        });
    });


    // Wolfs animation
    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('wolf'),
        frameRate: 4,
        repeat: -1,
        delay: 0.9
    });
    wolfs = this.physics.add.sprite(700, 533, 'wolf').setScale(0.4).play('walk');
    this.tweens.add({
        targets: wolfs,
        x: { value: wolfs.x-(Math.random()*200+100), duration: 4000 },
        autoStart: true,
        delay: 1000,
        repeat: -1,
        yoyo: true
    });

    // Player animation
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'player', frame: 4 } ],
        frameRate: 20
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    input = this.input.keyboard.createCursorKeys();

    // Cheeses and scoring
    cheeses = this.physics.add.group({ key: 'cheese', repeat: 11, setXY: { x: 12, y: 0, stepX: 70 } });
    cheeses.enableBody = true;
    scoreText = this.add.text(16, 16,`Fromage:  ${score}` , { fontSize: '20px', fill: '#000' });

    // Overlap player / cheeses
    this.physics.add.overlap(player, cheeses, collectCheese, null, this);

}

function update(){

    // Collision
    this.physics.add.collider(player, objectPlatform);
    this.physics.add.collider(player, wolfs);
    this.physics.add.collider(cheeses, objectPlatform);
    this.physics.add.collider(wolfs, objectPlatform);

    movement();
}
function movement(){
    /*if (input.left.isDown){
        player.setVelocityX(-160);
        player.anims.play('left', true);
    }
    else if (input.right.isDown){
        player.setVelocityX(160);
        player.anims.play('right', true);
    }else{
        player.setVelocityX(0);
        player.anims.play('turn');
    }*/
    /*
    if (input.up.isDown && player.body.touching.down){
        player.setVelocityY(-390);
    }*/
}
function collectCheese (player, cheese){
    cheese.disableBody(true, true);

    score += 1;

    (score <= 1) ? (scoreText.setText( `Fromage: ${score}` )) : ( scoreText.setText( `Fromages: ${score}` ));

    if (cheeses.countActive(true) === 0){
        cheeses.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
        });
    }
}
function render() {

}