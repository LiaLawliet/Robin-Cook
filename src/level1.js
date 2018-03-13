export default class Level1 extends Phaser.Scene{
    constructor (){
        super({ key: 'level1' });
        console.log(Phaser);
    }

    preload(){
        this.load.image('tiles', 'assets/Tile.png');
        /*this.load.spritesheet('player', 'assets/test/dude.png',{frameWidth: 32,frameHeight: 48});
        this.load.json({key: 'assets/Tile', texture: 'assets/Tile.png', data: 'assets/tilemap.json'});
        this.load.image('level_tm', 'assets/Tile.png');*/
        
        this.load.tilemapTiledJSON('tilemap', 'assets/tilemap.json', null);
    }

    create(){
        /*this.map =  this.make.tilemap({key: 'assets/tilemap', ext: 'json'});
        let groundTiles = this.map.addTilesetImage('level_tm');
        this.groundLayer = this.map.createStaticLayer('obstacle', groundTiles, 0,0);*/

        console.log(this.add);
        this.add.tilemap('tilemap', 41, 41, 820, 615);
    }
}