/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import 'phaser';
import config from '../Config/config';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  create() {
    this.creditsText = this.add.text(0, 0, 'Credits', { fontSize: '32px', fill: '#fff' });
    this.madeByText = this.add.text(0, 0, 'Created By: Widzmarc Jean Nesly Phelle', { fontSize: '26px', fill: '#fff' });
    this.acknowledgementText = this.add.text(0, 0, 'Acknowledgement: JavaScript Capstone Project by Microverse', { fontSize: '20px', fill: '#fff' });
    this.zone = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);

    Phaser.Display.Align.In.Center(
      this.creditsText,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.madeByText,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.acknowledgementText,
      this.zone,
    );

    this.madeByText.setY(1000);

    this.acknowledgementText.setY(400);

    this.creditsTween = this.tweens.add({
      targets: this.creditsText,
      y: -100,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
      onComplete() {
        this.destroy;
      },
    });

    this.creditsTween = this.tweens.add({
      targets: this.acknowledgementText,
      y: -100,
      ease: 'Power1',
      duration: 6000,
      delay: 1000,
      onComplete() {
        this.destroy;
      },
    });

    this.madeByTween = this.tweens.add({
      targets: this.madeByText,
      y: -300,
      ease: 'Power1',
      duration: 8000,
      delay: 1000,
      onComplete: function () {
        this.madeByTween.destroy;
        this.scene.start('Title');
      }.bind(this),
    });
  }
}