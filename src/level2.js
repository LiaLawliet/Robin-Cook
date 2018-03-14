import Leap from "leapjs";
import { getCoords } from "./utils";

export default class Level2 extends Phaser.Scene{
    constructor (){
        super({ key: 'level2' });
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

        // Add player
        this.player = this.physics.add.sprite(40, 510, 'Idle1').setCollideWorldBounds(true).setScale(0.19).play('idle');

        // Create platform
        this.hPlatforms = [{x:-50,y:670, scale:0.45}, {x:1280,y:770, scale:0.45}];
        this.stonePlatforms = [{x:310,y:470, scale: .3}, {x:500,y:330, scale: .3},{x:710,y:200, scale: .3}, {x:900,y:330, scale: .3}, {x:1110,y:470, scale: .3}];
        this.cheeses = [{x:310,y:440},{x:500,y:300},{x:710,y:170},{x:900,y:300},{x:1110,y:440},];

        //Platform group
        this.objectPlatform = this.physics.add.staticGroup();
        this.objectPlatform.enableBody = true;
        this.hPlatforms.forEach(hPlatform => {
            this.objectPlatform
                .create(hPlatform.x, hPlatform.y, 'hPlatform')
                .setScale( hPlatform.scale ? hPlatform.scale : 1 )
                .refreshBody();
        });
        this.stonePlatforms.forEach(stonePlatform => {
            this.objectPlatform
                .create(stonePlatform.x, stonePlatform.y, 'stonePlatform')
                .setScale( stonePlatform.scale ? stonePlatform.scale : 1 )
                .refreshBody();
        });

        // Chesses group
        this.objectCheeses = this.physics.add.staticGroup();
        this.objectCheeses.enableBody = true;
        this.cheeses.forEach(cheese => {
            this.objectCheeses
                .create(cheese.x, cheese.y, 'cheese')
                .setScale( cheese.scale ? cheese.scale : 1 )
                .refreshBody();
        });

        //Score
        this.score = 0;
        this.scoreText = this.add.text(16, 16,`Fromage:  ${this.score}` , { fontSize: '20px', fill: '#000' });

        // Leap Motion
        const myController = new Leap.Controller({enableGestures: true});
        myController.connect();
        myController.on('frame', (frame) => {

            this.player.setVelocityX(0);

            frame.hands.forEach( hand => {
                this.palm = getCoords(hand.palmPosition, frame);

                this.player.setVelocityX(this.palm.x/2);

                if (this.palm.x > 10){
                    this.player.anims.play('runRight');
                }else{
                    this.player.anims.play('runLeft');
                }

                if(this.palm.x > 0 && this.palm.x < 100 ){
                    this.player.anims.play('idle', true);
                    this.player.setVelocityX(0);
                }

                if (hand.grabStrength >= .80 && this.player.body.touching.down) {
                    this.player.setVelocityY(-300);
                }

            });
        });


        // Collect cheeses
        this.physics.add.overlap(this.player, this.objectCheeses, this.collectCheese, null, this);

        // Next level
        this.nextLevel = this.physics.add.image(1200, 83,'arrow');
        this.physics.add.overlap(this.player, this.nextLevel, this.startNextLevel, null, this);
    }

    update(){
        // Collision
        this.physics.add.collider(this.player, this.objectPlatform);
        this.physics.add.collider(this.nextLevel, this.objectPlatform);

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
        this.load.image('hPlatform', 'assets/spritesEnvironement/desertSprite/hPlatform.png');
        this.load.image('stonePlatform', 'assets/spritesEnvironement/desertSprite/StoneBlock.png');
    }
    collectCheese(player,cheeses){
        cheeses.disableBody(true, true);

        this.score += 1;
        (this.score <= 1) ? (this.scoreText.setText( `Fromage: ${this.score}` )) : ( this.scoreText.setText( `Fromages: ${this.score}` ));
    }
    startNextLevel(player, nextLevel){
        if (this.objectCheeses.countActive(true) === 0){
            nextLevel.disableBody(true, true);
            this.scene.start('menu');
        }
    }
}