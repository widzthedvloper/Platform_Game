import 'phaser';

let gameOptions = {
    platformStartSpeed: 350,
    spawnRange: [100, 350],
    platformSizeRange: [50, 250],
    playerGravity: 900,
    jumpForce: 400,
    playerStartPosition: 200,
    jumps: 2
};

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }

  create () {
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
    // add platform
    this.addPlatform(game.config.width, game.config.width/2);

    // add player
    this.player = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height / 2, 'actor');
    this.player.setGravityY(gameOptions.playerGravity);

    // set collisions

    this.physics.add.collider(this.player, this.platformGroup);

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

    this.playerJumps = 0;

    this.input.on("pointerdown", this.jump, this);

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
        this.nextPlatformDistance = Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1]);
  }

  update(){
 
        // game over
        if(this.player.y > game.config.height){
            this.scene.start("Game");
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

        var cursors = this.input.keyboard.createCursorKeys();

        if (cursors.left.isDown)
        {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        }
        else if ( cursors.right.isDown )
        {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        }
        else
        {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }
  }
}
