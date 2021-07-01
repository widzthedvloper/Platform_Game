import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

// eslint-disable-next-line no-undef
export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    // Game
    this.gameButton = new Button(this, config.width / 2, config.height / 2 - 100, 'blueButton1', 'blueButton2', 'Play', 'Game');

    // Options
    this.optionsButton = new Button(this, config.width / 2, config.height / 2, 'blueButton1', 'blueButton2', 'Options', 'Options');

    // Credits
    this.creditsButton = new Button(this, config.width / 2, config.height / 2 + 100, 'blueButton1', 'blueButton2', 'Credits', 'Credits');

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }

    if (document.getElementById('form') !== null) {
      document.getElementById('form').remove();
    }
  }

  centerButton(gameObject, offset = 0) {
    // eslint-disable-next-line no-undef
    Phaser.Display.Align.In.Center(
      gameObject,
      // eslint-disable-next-line max-len
      this.add.zone(config.width / 2, config.height / 2 - offset * 100, config.width, config.height),
    );
  }

  // eslint-disable-next-line class-methods-use-this
  centerButtonText(gameText, gameButton) {
    // eslint-disable-next-line no-undef
    Phaser.Display.Align.In.Center(
      gameText,
      gameButton,
    );
  }
}
