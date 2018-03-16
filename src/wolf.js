import Enemy from './enemy.js';

export default class Wolf extends Enemy{

    constructor(config) {
        super(config);

        this.body.setVelocity(0,0).setBounce(0, 0).setCollideWorldBounds(true);
        this.scaleX = 0.5;
        this.scaleY = 0.5;
        this.body.velocity.x = -100;



    }
    update() {
        //this.game.physics.arcade.collide(this, this.game.collisionLayer);
        if (this.body.touching.right) {
            this.anims.play('walk');
            this.body.velocity.x = -100;
        }else if (this.body.touching.left){
            this.anims.play('walkReverse');
            this.body.velocity.x = 100 ;
        }
    }
}