var main = function(game) {};

main.prototype = {
		create: function() {
				// set world
				this.map = this.game.add.tilemap('map');
				this.map.addTilesetImage('tiles', 'snowTiles');
				this.physics.startSystem(Phaser.Physics.ARCADE);
				
				// layers
				this.bg = this.map.createLayer('BG');
				this.walls = this.map.createLayer('Walls');
				this.invisible = this.map.createLayer('Invisible');
				this.artifacts = this.map.createLayer('Artifacts');
				this.walls.resizeWorld();
				this.map.setCollisionBetween(1, 5000, true, 'Walls');
				this.map.setCollisionBetween(1, 5000, true, 'Invisible');
				this.invisible.visible = false;
				
				// player sprites and properties
				this.p = this.add.sprite(20, 650, 'player');
				this.p.anchor.setTo(0.5, 1);
				this.physics.arcade.enable(this.p);
				this.p.body.collideWorldBounds = true;
				// animations
				this.p.animations.add('left', [10, 11, 10, 9], 7);
				this.p.animations.add('right', [4, 5, 4, 3], 7);
				this.p.body.gravity.y = 800;
				this.p.body.setSize(this.p.body.width*0.5, this.p.body.height);
				this.jumpBool = false;
				this.camera.follow(this.p);
				this.small = false;
				this.jumpbig = -600;
				this.jumpsmall = -165;
				this.jumpval = 240;
				this.jump = this.jumpbig;
				this.p.speed = 320;
				
				// audio
				this.music = this.add.audio('music', 0.4, true);
				this.sound.walk = this.add.audio('walk', 0.3);
				this.sound.beep = this.add.audio('beep', 0.15);
				this.sound.select = this.add.audio('select', 0.15);
				this.sound.jump = this.add.audio('jump', 0.25);
				this.music.play();
				
				// set keyboard controls
				this.keys = this.input.keyboard.createCursorKeys();
				this.keys.space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
				
				//item creation
				this.i = 3;
				this.j = 118;
				this.items = this.add.group();
				this.items.enableBody = true;
				while (this.i <= this.j) {
						this.map.createFromObjects('Artifacts', this.i, 'item', 0, true, false, this.items);
						this.i += 1;
				}
		},
		collect: function(player, item) {
				this.sound.beep.play();
				item.destroy();
		},
		update: function() {
				this.invis = this.physics.arcade.collide(this.p, this.invisible);
				this.jumpCollide = this.physics.arcade.collide(this.p, this.walls)
				this.physics.arcade.overlap(this.p, this.items, this.collect, null, this);
				this.p.body.velocity.x = 0;
				
				// movement
				if(this.keys.left.isDown) {
						this.p.animations.play('left');
						this.p.body.velocity.x = -this.p.speed;
						this.sound.walk.play('', 0, 0.03, false, false);
				} else if( this.keys.right.isDown) {
						this.p.animations.play('right');
						this.p.body.velocity.x = this.p.speed;
						this.sound.walk.play('', 0, 0.03, false, false);
				} else {
						this.p.animations.stop();
				}
				
				if(this.keys.down.isDown) {
						if(!this.small) {
								this.p.scale.set(0.5, 0.5);
								this.p.speed = 160;
								this.jump = this.jumpsmall;
								this.small = true;
								this.jumpval = 165;
								this.sound.select.play();
						}
				} else if(this.keys.up.isDown) {
						if(this.small && !this.invis) {
								this.p.scale.set(1, 1);
								this.p.speed = 320;
								this.jump = this.jumpbig;
								this.small = false;
								this.jumpval = 240;
								this.sound.select.play();
						}
				}
				
				if(this.keys.space.isDown && this.jumpCollide && !this.invis) {
						this.jumpBool = true;
						this.sound.jump.play();
				}
				if(this.p.body.velocity.y < this.jump) {
						this.jumpBool = false;
				} else if(this.jumpBool && this.p.body.velocity.y > this.jump){
						this.p.body.velocity.y -= this.jumpval;
				}
		}
}
