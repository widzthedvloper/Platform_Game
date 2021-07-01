import 'phaser';

export default {
  // eslint-disable-next-line no-undef
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800, // window.innerWidth,
  height: 600, // window.innerHeight
  physics: {
    default: 'arcade',
  },
};
