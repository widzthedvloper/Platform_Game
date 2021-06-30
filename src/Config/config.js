import 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800, // window.innerWidth,
  height: 600, // window.innerHeight
  physics: {
    default: "arcade"
  }
};
