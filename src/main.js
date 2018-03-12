import Phaser from 'phaser';
import {Controller} from 'leapjs';

//scenes
import jeuScene from './jeu.scene';
import menuScene from './menu.scene';

import {getCoords} from './utils';
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


game.scene.start('menu');