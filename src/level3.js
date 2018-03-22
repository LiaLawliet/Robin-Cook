import config from './config';
import leapMovement from './leapMotionMovement';

import Wolf from "./wolf.js";

export default class Level3 extends Phaser.Scene{
    constructor (){
        super({ key: 'level3' });
    }

    preload(){
        this.load.image('bg', 'assets/spritesEnvironement/desertSprite/BG.png');
        this.loadIdle();
        this.loadRun();
        this.loadRunReverse();

        this.loadIngredients();
        this.loadPlatform();
        this.loadProps();

        this.load.image('arrow', 'assets/spritesEnvironement/desertSprite/SignArrow.png');


        this.load.spritesheet('wolf', 'assets/spritesCharacter/Wolf/wolfWalk.png',{frameWidth: 170 ,frameHeight: 170});
        this.load.spritesheet('wolfReverse', 'assets/spritesCharacter/Wolf/wolfWalkReverse.png',{frameWidth: 170 ,frameHeight: 170});
    }

    create(){
        // Background
        this.add.image(640, 330, 'bg');


        // Props
        this.add.image(100,130,'bush').setScale(.6);
        this.add.image(800,615,'bush').setScale(.6);

        this.add.image(130,517,'skeleton').setScale(.9);
        this.add.image(745,380,'skeleton').setScale(.9);

        this.add.image(1200,495,'cactus').setScale(.9);

        this.add.image(50,517,'stone');
        this.add.image(580,232,'stone').setScale(.9);

        this.add.image(820,310,'tree').setScale(.7);

        this.add.image(450,240,'grass').setScale(.7);
        this.add.image(895,375,'grass').setScale(.9);



        // Animation joueur
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


        // Create object
        this.Platforms = [ {x:510,y:270, scale: .35}, {x:810,y:410, scale: .35} ];
        this.hPlatforms = [ {x: 70, y: 650, scale: .45}, {x: 50, y: 250, scale: .40}, {x: 1190, y: 650, scale: .45},{x: 1210, y: 200, scale: .3}, {x: 750, y: 750, scale: .45} ];
        this.listIngredients = [{x:400,y:440},{x:50,y:135},{x:510,y:238},{x:900,y:100},{x:1110,y:440},];


        this.objectPlatform = this.physics.add.staticGroup();
        this.objectPlatform.enableBody = true;

        this.Platforms.forEach(Platform => {
            this.objectPlatform
                .create(Platform.x, Platform.y, 'Platform')
                .setScale( Platform.scale ? Platform.scale : 1 )
                .refreshBody();
        });
        this.hPlatforms.forEach(hPlatform => {
            this.objectPlatform
                .create(hPlatform.x, hPlatform.y, 'hPlatform')
                .setScale( hPlatform.scale ? hPlatform.scale : 1 )
                .refreshBody();
        });


        // Group ingrédients
        this.ingredients =['fraise', 'cheese', 'carrots'];

        this.objectIngredients = this.physics.add.staticGroup();
        this.objectIngredients.enableBody = true;
        this.listIngredients.forEach(listIngredient => {
            this.objectIngredients
                .create(listIngredient.x, listIngredient.y, this.ingredients[Math.floor(Math.random()*this.ingredients.length)])
                .setScale( listIngredient.scale ? listIngredient.scale : 1 )
                .refreshBody();
        });


        // Create wolf + animation + collision

        this.collisionsWolf = [{x:560,y:570},{x:900,y:570}];
        this.objectCollision = this.physics.add.staticGroup();
        this.objectCollision.enableBody = true;
        this.collisionsWolf.forEach(collisionWolf => {
            this.objectCollision
                .create(collisionWolf.x, collisionWolf.y, 'cheese')
                .refreshBody();

        });


        for (let i = 0; i < this.collisionsWolf.length; i++){
            this.objectCollision.children.entries[i].alpha = 0;
        }


        this.wolfGroup = this.add.group();
        let wolf = { scene: this, x : 852, y: 595, key: 'wolf' };
        this.wolfGroup.add(new Wolf(wolf));

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('wolf'),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'walkReverse',
            frames: this.anims.generateFrameNumbers('wolfReverse'),
            frameRate: 6,
            repeat: -1
        });
        this.anims.play('walk', this.wolfGroup.getChildren());


        // Leap Motion movement
        leapMovement.call(this);

        //score
        this.score = 0;
        this.scoreText = this.add.text(16, 16,`Ingrédients:  ${this.score} / ${this.listIngredients.length}` , { fontSize: '20px', fill: '#000' });
        this.physics.add.overlap(this.player, this.objectIngredients, this.collectIngredients, null, this);

        // Death
        this.physics.add.overlap(this.player, this.wolfGroup, this.death, null, this);

        // Next level
        this.nextLevel = this.physics.add.image(1200, 0,'arrow');
        this.physics.add.overlap(this.player, this.nextLevel, this.startNextLevel, null, this);

    }

    update(){
        // Collision
        this.physics.add.collider(this.player, this.objectPlatform);
        this.physics.add.collider(this.nextLevel, this.objectPlatform);
        this.physics.add.collider(this.wolfGroup, this.objectPlatform);
        this.physics.add.collider(this.objectCollision, this.objectPlatform);
        this.physics.add.collider(this.wolfGroup, this.objectCollision);


        this.wolfGroup.children.iterate((wolf)=>{
            wolf.update();
        });

        // Movement keyboard
        this.movement();

        // Death
        if (this.player.y + (this.player.height * 0.19) >= config.height) this.scene.start('gameover');
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
    loadIngredients(){
        this.load.image('cheese', 'assets/spritesEnvironement/fromage.png');
        this.load.image('fraise', 'assets/spritesEnvironement/Fraise.png');
        this.load.image('carrots', 'assets/spritesEnvironement/carrots.png');
    }
    loadPlatform(){
        this.load.image('Platform', 'assets/spritesEnvironement/desertSprite/Platform.png');
        this.load.image('hPlatform', 'assets/spritesEnvironement/desertSprite/hPlatform.png');
    }
    loadProps(){
        this.load.image('bush', 'assets/spritesEnvironement/desertSprite/bush.png');
        this.load.image('grass', 'assets/spritesEnvironement/desertSprite/grass.png');
        this.load.image('cactus', 'assets/spritesEnvironement/desertSprite/cactus.png');
        this.load.image('tree', 'assets/spritesEnvironement/desertSprite/tree.png');
        this.load.image('skeleton', 'assets/spritesEnvironement/desertSprite/skeleton.png');
        this.load.image('stone', 'assets/spritesEnvironement/desertSprite/stone.png');
    }

    movement(){
        if (this.input.left.isDown){
            this.player.setVelocityX(-300);
        }else if (this.input.right.isDown){
            this.player.setVelocityX(300);
            this.player.anims.play('run');
        }else{
            this.player.setVelocityX(0);
        }
        if (this.input.up.isDown && this.player.body.touching.down){
            this.player.setVelocityY(-300);
        }
    }

    collectIngredients(player,ingredients){
        ingredients.disableBody(true, true);
        this.score += 1;
        (this.score <= 1) ? (this.scoreText.setText( `Ingrédient:  ${this.score} / ${this.listIngredients.length}` )) : ( this.scoreText.setText( `Ingrédients:  ${this.score} / ${this.listIngredients.length}` ));
    }
    death(){
        this.scene.start('gameover');
    }
    startNextLevel(player, nextLevel){
        if (this.objectIngredients.countActive(true) === 0){
            nextLevel.disableBody(true, true);
            this.scene.start('level4');
        }
    }
}