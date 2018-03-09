import Phaser from 'phaser';
import {Controller} from 'leapjs';
import jeuScene from './jeu.scene.js';
import {getCoords} from './utils.js';
import config from './config.js';

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

game.scene.add('jeu', jeuScene);

game.scene.start('jeu');