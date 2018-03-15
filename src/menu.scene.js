export default class menuScene extends Phaser.Scene {
    constructor (){
        super({ key: 'menu' });
    }
    create(){

        this.textMenu   = this.add.text(80,80, 'Robin Cook', {font: '50px Arial', fill: '#ffffff'});
        this.inputStart = this.add.text(80, 200, 'Appuyez sur ENTRER pour jouer', {font: '20px Arial', fill: '#ffffff'});

        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update(){
        if (this.enterKey.isDown){
            this.scene.start('level4');
        }
    }
}
