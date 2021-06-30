import 'phaser';

let gameOptions = {
    platformStartSpeed: 350,
    spawnRange: [100, 350],
    platformSizeRange: [50, 250],
    playerGravity: 900,
    jumpForce: 400,
    playerStartPosition: 200,
    jumps: 2,
    score: 0,
    tomatoPercent: 25,
    platformVerticalLimit: [0.4, 0.8],
};

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }

  create () {
    this.addedPlatforms = 0;

    this.add.image(400, 300, 'bgScene');
    // Group all active platform
    this.platformGroup = this.add.group({
      removeCallback: function(platform){
        platform.scene.platformPool.add(platform);
      }
    });

    // pool

    this.platformPool = this.add.group({
      removeCallback: function(platform){
        platform.scene.platformGroup.add(platform);
      }
    });

      this.tomatoGroup = this.add.group({
 
        // once a coin is removed, it's added to the pool
      removeCallback: function(tomato){
            tomato.scene.tomatoPool.add(tomato);
          }
      });
 
      // coin pool
      this.tomatoPool = this.add.group({
 
      // once a coin is removed from the pool, it's added to the active coins group
      removeCallback: function(tomato){
          tomato.scene.tomatoGroup.add(tomato);
        }
      });

    // add platform
    this.addPlatform(game.config.width, game.config.width/2);

    // add player
    this.player = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height / 2, 'actor');
    this.player.setGravityY(gameOptions.playerGravity);

    // add collision between player andtomato
    this.physics.add.overlap(this.player, this.tomatoGroup, function(player, tomato){
            this.tweens.add({
                targets: tomato,
                y: tomato.y - 100,
                alpha: 0,
                duration: 800,
                ease: "Cubic.easeOut",
                callbackScope: this,
                onComplete: function(){
                    this.tomatoGroup.killAndHide(tomato);
                    this.tomatoGroup.remove(tomato);
                }
            });
            this.collectTomato(tomato);
    }, null, this);

    // set collisions

    this.physics.add.collider(this.player, this.platformGroup);

    // setting collisions between the actor and the tomato Group

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('actor', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'actor', frame: 4 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('actor', { start: 5, end: 8}),
        frameRate: 10,
        repeat: -1
    });

    // this.physics.add.collider(this.tomatoes, this.platformPool);

    this.playerJumps = 0;

    this.input.on("pointerdown", this.jump, this);

    this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#00'});
    this.score = 0;
  }

  collectTomato(tomato)
  {
    tomato.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);
    game.config.score = this.score;
  }


  jump(){
        if(this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps)){
            if(this.player.body.touching.down){
                this.playerJumps = 0;
            }
            this.player.setVelocityY(gameOptions.jumpForce * -1);
            this.playerJumps ++;
        }
  }

  addPlatform(platformWidth, posX){
        this.addedPlatforms ++;
        let platform;
        if(this.platformPool.getLength()){
            platform = this.platformPool.getFirst();
            platform.x = posX;
            platform.active = true;
            platform.visible = true;
            this.platformPool.remove(platform);
        }
        else{
            platform = this.physics.add.sprite(posX, game.config.height * 0.8, "platform");
            platform.setImmovable(true);
            platform.setVelocityX(gameOptions.platformStartSpeed * -1);
            this.platformGroup.add(platform);
        }
        platform.displayWidth = platformWidth;
        this.nextPlatformDistance = Phaser.Math.Between(30, 160);
        
        if(this.addedPlatforms > 1){
            if(Phaser.Math.Between(1, 100) <= gameOptions.tomatoPercent){
                if(this.tomatoPool.getLength()){
                    let tomato = this.tomatoPool.getFirst();
                    tomato.x = posX;
                    tomato.y = 300 - 96;
                    tomato.alpha = 1;
                    tomato.active = true;
                    tomato.visible = true;
                    this.tomatoPool.remove(tomato);
                }
                else{
                    let tomato = this.physics.add.sprite(posX, 400 - 96, "tomato");
                    tomato.setImmovable(true);
                    tomato.setVelocityX(platform.body.velocity.x);
                    this.tomatoGroup.add(tomato);
                }
            }
        }

  }

  update(){
 
        // game over
        if(this.player.y > game.config.height){
            this.scene.start("GameOver");
        }
        this.player.x = gameOptions.playerStartPosition;
 
        // recycling platforms
        let minDistance = game.config.width;
        this.platformGroup.getChildren().forEach(function(platform){
            let platformDistance = game.config.width - platform.x - platform.displayWidth / 2;
            minDistance = Math.min(minDistance, platformDistance);
            if(platform.x < - platform.displayWidth / 2){
                this.platformGroup.killAndHide(platform);
                this.platformGroup.remove(platform);
            }
        }, this);
 
        // adding new platforms
        if(minDistance > this.nextPlatformDistance){
            var nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1]);
            this.addPlatform(nextPlatformWidth, game.config.width + nextPlatformWidth / 2);
        }

        this.player.setVelocityX(0);

        this.player.anims.play('turn');
  }
}
