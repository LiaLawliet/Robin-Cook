import Phaser from 'phaser';

//scenes
import jeuScene from './jeu.scene';
import menuScene from './menu.scene';
import Level1 from './level1';

import config from './config';

const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'phaser-example',
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
game.scene.add('jeu', jeuScene);
game.scene.add('level1', Level1),


game.scene.start('menu');