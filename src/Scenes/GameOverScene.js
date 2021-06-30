import Phaser from 'phaser';
import createForm from '../form';
import Button from '../Objects/Button';
import { sendScore } from '../api';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }
  
  create() {
    this.add.image(400, 300, 'gameOver');
    
    document.body.appendChild(createForm());

    this.userForm = document.getElementById('form');
    this.submit = document.getElementById('submit-name');
    
    this.submit.onclick = () => {
      const username = document.getElementById('name-input').value;
      sendScore(username, game.config.score);
      this.scene.start('Leaderboard');
      this.userForm.remove();
      this.scene.start("Leaderboard");
    };

    this.menuButton = new Button(this, 200, 500, 'blueButton1', 'blueButton2', 'Replay', 'Title');

    this.leaderBoard = new Button(this, 500, 500, 'blueButton1', 'blueButton2', 'Top Scores', 'Leaderboard');
  }
}