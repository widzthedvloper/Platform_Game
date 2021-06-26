import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }

  preload () {
    this.load.image('logo', 'assets/logo.png');
  }

  create () {
    this.add.image(window.innerWidth/2, window.innerHeight/2, 'logo');
  }
}