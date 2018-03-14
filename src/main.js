import Phaser from 'phaser';
import config from './config';

//scenes
import menuScene from './menu.scene';
import Level1 from './level1';
import Level2 from './level2';
import Level3 from './level3';
import Win from './win'
import GameOver from './gameover';

const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: config.width,
    height: config.height,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    }
});

game.scene.add('menu', menuScene);

game.scene.add('level1', Level1);
game.scene.add('level2', Level2);
game.scene.add('level3', Level3);

game.scene.add('win', Win);
game.scene.add('gameover', GameOver);


game.scene.start('menu');