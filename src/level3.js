import Leap from "leapjs";
import config from './config';
import { getCoords } from "./utils";
import leapMovement from './leapMotionMovement'


export default class Level3 extends Phaser.Scene {
    constructor (){
        super( { key: 'level3' } );
    }
    preload(){
        this.load.image('bg', 'assets/spritesEnvironement/desertSprite/BG.png');
        this.loadIdle();
        this.loadRun();
        this.loadRunReverse();
        this.loadPlatform();

        this.load.image('arrow', 'assets/spritesEnvironement/desertSprite/SignArrow.png');
        this.load.image('cheese', 'assets/spritesEnvironement/fromage.png');
    }
    create(){
        // Background
        this.add.image(640, 330, 'bg');

        // Anim joueur
        this.anims.create({
            key: 'idle',
            frames: [
                { key: 'Idle1' },
                { key: 'Idle2' },
                { key: 'Idle3' },
                { key: 'Idle4' },
                { key: 'Idle5' },
                { key: 'Idle6' },
                { key: 'Idle7' },
                { key: 'Idle8' },
                { key: 'Idle9' },
                { key: 'Idle10', duration: 50 }
            ],
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'runRight',
            frames: [
                { key: 'Run1' },
                { key: 'Run2' },
                { key: 'Run3' },
                { key: 'Run4' },
                { key: 'Run5' },
                { key: 'Run6' },
                { key: 'Run7' },
                { key: 'Run8', duration: 50  }
            ],
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'runLeft',
            frames: [
                { key: 'Run1Reverse' },
                { key: 'Run2Reverse' },
                { key: 'Run3Reverse' },
                { key: 'Run4Reverse' },
                { key: 'Run5Reverse' },
                { key: 'Run6Reverse' },
                { key: 'Run7Reverse' },
                { key: 'Run8Reverse', duration: 50  }
            ],
            frameRate: 15,
            repeat: -1
        });

        this.player = this.physics.add.sprite(50, 490, 'Idle1').setScale(0.19).setCollideWorldBounds(true).play('idle');
        this.input = this.input.keyboard.createCursorKeys();


        //create positions
        this.sPlatforms = [ {x:350,y:400, scale: .2}, {x:500,y:250, scale: .2}, {x:825,y:700, scale: .6}, {x:850,y:170, scale: .25} ];
        this.hPlatforms = [ {x: 70, y: 650, scale: .45}, {x: 50, y: 250, scale: .30}, {x: 1115, y: 650, scale: .45}, {x: 1210, y: 290, scale: .3} ];
        this.cheeses = [{x:360,y:375},{x:50,y:160},{x:510,y:229},{x:860,y:142},{x:1150,y:200},];


        // Group platform
        this.objectPlatform = this.physics.add.staticGroup();
        this.objectPlatform.enableBody = true;

        this.sPlatforms.forEach(sPlatform => {
            this.objectPlatform
                .create(sPlatform.x, sPlatform.y, 'sPlatform')
                .setScale( sPlatform.scale ? sPlatform.scale : 1 )
                .refreshBody();
        });
        this.hPlatforms.forEach(hPlatform => {
            this.objectPlatform
                .create(hPlatform.x, hPlatform.y, 'hPlatform')
                .setScale( hPlatform.scale ? hPlatform.scale : 1 )
                .refreshBody();
        });


        // Group cheeses
        this.objectCheeses = this.physics.add.staticGroup();
        this.objectCheeses.enableBody = true;

        this.cheeses.forEach(cheese => {
            this.objectCheeses
                .create(cheese.x, cheese.y, 'cheese')
                .setScale( cheese.scale ? cheese.scale : 1 )
                .refreshBody();
        });
        // Leap Motion
        leapMovement.call(this);

        //score
        this.score = 0;
        this.scoreText = this.add.text(16, 16,`Fromage:  ${this.score}` , { fontSize: '20px', fill: '#000' });

        this.physics.add.overlap(this.player, this.objectCheeses, this.collectCheese, null, this);

        // Next level
        this.nextLevel = this.physics.add.image(1200, 495,'arrow');
        this.physics.add.overlap(this.player, this.nextLevel, this.startNextLevel, null, this);

    }
    update(){
        // Collision
        this.physics.add.collider(this.player, this.objectPlatform);
        this.physics.add.collider(this.nextLevel, this.objectPlatform);
        this.movement();

        if (this.player.y + (this.player.height * 0.19) >= config.height) {
            this.scene.start('gameover');
        }
    }

    movement(){
        if (this.input.left.isDown){
            this.player.setVelocityX(-160);
        }else if (this.input.right.isDown){
            this.player.setVelocityX(160);
            this.player.anims.play('run');
        }else{
            this.player.setVelocityX(0);
        }
        if (this.input.up.isDown && this.player.body.touching.down){
            this.player.setVelocityY(-300);
        }
    }
    loadIdle(){
        this.load.image('Idle1', 'assets/spritesCharacter/Robin_Cook/Idle1.png');
        this.load.image('Idle2', 'assets/spritesCharacter/Robin_Cook/Idle2.png');
        this.load.image('Idle3', 'assets/spritesCharacter/Robin_Cook/Idle3.png');
        this.load.image('Idle4', 'assets/spritesCharacter/Robin_Cook/Idle4.png');
        this.load.image('Idle5', 'assets/spritesCharacter/Robin_Cook/Idle5.png');
        this.load.image('Idle6', 'assets/spritesCharacter/Robin_Cook/Idle6.png');
        this.load.image('Idle7', 'assets/spritesCharacter/Robin_Cook/Idle7.png');
        this.load.image('Idle8', 'assets/spritesCharacter/Robin_Cook/Idle8.png');
        this.load.image('Idle9', 'assets/spritesCharacter/Robin_Cook/Idle9.png');
        this.load.image('Idle10', 'assets/spritesCharacter/Robin_Cook/Idle10.png');
    }
    loadRun(){
        this.load.image('Run1', 'assets/spritesCharacter/Robin_Cook/Run1.png');
        this.load.image('Run2', 'assets/spritesCharacter/Robin_Cook/Run2.png');
        this.load.image('Run3', 'assets/spritesCharacter/Robin_Cook/Run3.png');
        this.load.image('Run4', 'assets/spritesCharacter/Robin_Cook/Run4.png');
        this.load.image('Run5', 'assets/spritesCharacter/Robin_Cook/Run5.png');
        this.load.image('Run6', 'assets/spritesCharacter/Robin_Cook/Run6.png');
        this.load.image('Run7', 'assets/spritesCharacter/Robin_Cook/Run7.png');
        this.load.image('Run8', 'assets/spritesCharacter/Robin_Cook/Run8.png');
    }
    loadRunReverse(){
        this.load.image('Run1Reverse', 'assets/spritesCharacter/Robin_Cook/Run1Reverse.png');
        this.load.image('Run2Reverse', 'assets/spritesCharacter/Robin_Cook/Run2Reverse.png');
        this.load.image('Run3Reverse', 'assets/spritesCharacter/Robin_Cook/Run3Reverse.png');
        this.load.image('Run4Reverse', 'assets/spritesCharacter/Robin_Cook/Run4Reverse.png');
        this.load.image('Run5Reverse', 'assets/spritesCharacter/Robin_Cook/Run5Reverse.png');
        this.load.image('Run6Reverse', 'assets/spritesCharacter/Robin_Cook/Run6Reverse.png');
        this.load.image('Run7Reverse', 'assets/spritesCharacter/Robin_Cook/Run7Reverse.png');
        this.load.image('Run8Reverse', 'assets/spritesCharacter/Robin_Cook/Run8Reverse.png');
    }
    loadPlatform(){
        this.load.image('sPlatform', 'assets/spritesEnvironement/desertSprite/sPlatform.png');
        this.load.image('hPlatform', 'assets/spritesEnvironement/desertSprite/hPlatform.png');
        this.load.image('blockPlatform', 'assets/spritesEnvironement/desertSprite/blockPlatform.png');
    }
    collectCheese(player,cheeses){
        cheeses.disableBody(true, true);
        this.score += 1;
        (this.score <= 1) ? (this.scoreText.setText( `Fromage: ${this.score}` )) : ( this.scoreText.setText( `Fromages: ${this.score}` ));
    }
    startNextLevel(player, nextLevel){
        if (this.objectCheeses.countActive(true) === 0){
            nextLevel.disableBody(true, true);
            this.scene.start('win');
        }
    }
}