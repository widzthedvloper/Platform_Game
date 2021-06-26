import 'phaser';
import logoImg from '../assets/logo.png';
export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }

  preload () {
    this.load.image('logo', logoImg);
  }

  create () {
    this.add.image((window.innerWidth/2), (window.innerHeight/2), 'logo');
  }
}