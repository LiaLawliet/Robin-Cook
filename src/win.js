export default class Win extends Phaser.Scene {
    constructor (){
        super({ key: 'win' });
    }
    create(){
        this.textWin   = this.add.text(80,80, 'Victoire ! ', {font: '90px Arial', fill: '#ffffff'});
    }
}
