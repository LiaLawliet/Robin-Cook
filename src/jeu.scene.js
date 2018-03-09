export default {
    preload : preload,
    create : create,
    update : update,
    render : render
}

let platforms;
let player;
let input;

let stars;
let score = 0;
let scoreText;

function preload (){
    this.load.image('bg', 'assets/test/BG.png');
    this.load.image('ground', 'assets/test/platform.png');
    this.load.image('star', 'assets/test/star.png');
    this.load.image('bomb', 'assets/test/bomb.png');
    this.load.spritesheet('dude', 'assets/test/dude.png',
        {
            frameWidth: 32,
            frameHeight: 48
        }
    );
}

function create (){
    this.add.image(400, 300, 'bg');

    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    // Player
    player = this.physics.add.sprite(100, 450, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    input = this.input.keyboard.createCursorKeys();

    //stars and scoring
    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });
    scoreText = this.add.text(16, 16,`Etoile:  ${score}` , { fontSize: '32px', fill: '#000' });

    //Collision
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);

    //Overlap
    this.physics.add.overlap(player, stars, collectStar, null, this);

}

function update(){
    movement();
}

function movement(){
    if (input.left.isDown){
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (input.right.isDown){
        player.setVelocityX(160);

        player.anims.play('right', true);
    }else{
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (input.up.isDown && player.body.touching.down){
        player.setVelocityY(-330);
    }
}

function collectStar (player, star){
    star.disableBody(true, true);

    score += 1;
    scoreText.setText( `Etoile: ${score}` );

}

function render() {

}