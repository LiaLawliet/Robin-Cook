import Enemy from './enemy.js';

class StrongWolf extends Enemy {

  constructor(config) {
    super(config);
    this.body.setVelocity(0,0).setBounce(0, 0).setCollideWorldBounds(true);
    this.scaleX = 0.4;
    this.scaleY = 0.4;
    this.body.velocity.x = 0;
  }
  update() {
  }
}

export default StrongWolf;