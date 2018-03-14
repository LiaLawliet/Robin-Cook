export default class GameOver extends Phaser.Scene {
    constructor (){
        super({ key: 'gameover' });
    }
    create(){
        this.textWin   = this.add.text(80,80, 'Défaite ! ', {font: '90px Arial', fill: '#ffffff'});
    }
}
