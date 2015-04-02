var main = function(game) {};

main.prototype = {
		create: function() {
				// set world
				this.map = this.game.add.tilemap('map');
				this.map.addTilesetImage('tiles', 'snowTiles');
				this.stage.backgroundColor = '#fff';
				this.physics.startSystem(Phaser.Physics.ARCADE);
				
				// layers
				this.bg = this.map.createLayer('BG');
				this.walls = this.map.createLayer('Walls');
				this.bg.resizeWorld();
				this.map.setCollisionBetween(1, 1000, true, 'Walls');
				
				// player sprites and properties
				this.phone = this.add.sprite(535, 30, 'phone');
				this.p = this.add.sprite(600, 1500, 'player');
				this.p.anchor.setTo(0.5, 0.5);
				this.p.height *= 0.25;
				this.p.width *= 0.25;
				this.npc = this.add.sprite(530, 1400, 'npc');
				this.npc.anchor.setTo(0.5, 0.5);
				this.npc.height *= 0.25;
				this.npc.width *= 0.25;
				this.phone.width *= 0.05;
				this.phone.height *= 0.05;
				this.physics.arcade.enable(this.p);
				this.physics.arcade.enable(this.phone);
				this.physics.arcade.enable(this.npc);
				this.npc.body.immovable = true;
				this.p.body.collideWorldBounds = true;
				// animations
				this.p.animations.add('down', [7, 8, 7, 6], 7);
				this.p.animations.add('up', [1, 2, 1, 0], 7);
				this.p.animations.add('left', [10, 11, 10, 9], 7);
				this.p.animations.add('right', [4, 5, 4, 3], 7);
				this.npc.animations.add('down', [7], 3, true);
				this.npc.animations.add('up', [1], 3, true);
				this.npc.animations.add('left', [10], 3, true);
				this.npc.animations.add('right', [4], 3, true);
				this.npc.animations.play('down');
				
				// foreground
				this.fg = this.map.createLayer('FG');
				
				// UI
				this.UI = this.add.sprite(0, 250, 'UI');
				this.UI.height *= 0.5;
				this.UI.width *= 0.5;
				this.style = {font: "12px Verdana", fill: "#ffffff", align: "left" };
				this.UI.text = this.add.text(15, 258, "", this.style);
				this.UI.fixedToCamera = true;
				this.UI.text.fixedToCamera = true;
				this.UI.visible = false;
				this.camera.follow(this.p);
				
				// audio
				this.music = this.add.audio('music', 0.3, true);
				this.sound.walk = this.add.audio('walk', 0.3);
				this.sound.beep = this.add.audio('beep', 0.3);
				this.sound.select = this.add.audio('selectSFX', 0.25);
				this.music.play();
				
				// set keyboard controls
				this.keys = this.input.keyboard.createCursorKeys();
				this.keys.w = this.input.keyboard.addKey(Phaser.Keyboard.W);
				this.keys.a = this.input.keyboard.addKey(Phaser.Keyboard.A);
				this.keys.s = this.input.keyboard.addKey(Phaser.Keyboard.S);
				this.keys.d = this.input.keyboard.addKey(Phaser.Keyboard.D);
				this.keys.space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
				
				// dialogue control
				this.keys.space.onDown.add(this.npcTalk, this);
				this.win = false;
				this.wintext = this.add.text(125, 140, "Congratulations, you win.", this.style);
				this.wintext.fixedToCamera = true;
				this.wintext.visible = false;
				this.npcPrompt = false;
				this.inDialogue = false;
				this.dialogue = [];
				this.dialogue[0] = "Thank goodness you're here, I finally made it\nout of the maze.";
				this.dialogue[1] = "However, I seem to have dropped\nmy cell phone deep inside the maze...";
				this.dialogue[2] = "My legs have given out so I can't walk.\nPlease find my cell phone!";
				this.dialogue[3] = "Please bring me my cell phone.";
				this.npc.i = 0;
		},
		npcTalk: function() {
				if(this.npcPrompt) {
						this.sound.beep.play();
						this.inDialogue = true;
						this.UI.text.setText(this.dialogue[this.npc.i]);
						
						this.npc.i += 1;
						if(this.npc.i > 2) {
								this.npc.i = 3;
								this.npcPrompt = false;
						}
						if(this.win) {
								this.UI.text.setText("Thank you kind adventurer. \nI will reward you handsomely.");
								this.wintext.visible = true;
								this.game.paused = true;
						}
				} else {
						if(this.inDialogue) {
								if(this.UI.visible)
										this.sound.select.play();
								this.UI.text.setText("");
								this.UI.visible = false;
						}
				}
				
				if(this.physics.arcade.overlap(this.p, this.phone)) {
						this.sound.select.play();
						this.win = true;
						this.phone.visible = false;
				}
		},
		update: function() {
				this.physics.arcade.collide(this.p, this.walls);
				this.p.body.velocity.x = 0;
				this.p.body.velocity.y = 0;
				
				// movement
				this.p.speed = 120;
				if(this.keys.w.isDown || this.keys.up.isDown) {
						this.p.animations.play('up');
						this.p.body.velocity.y = -this.p.speed;
						this.sound.walk.play('', 0, 0.03, false, false);
				} else if(this.keys.s.isDown || this.keys.down.isDown) {
						this.p.animations.play('down');
						this.p.body.velocity.y = this.p.speed;
						this.sound.walk.play('', 0, 0.03, false, false);
				} else if(this.keys.a.isDown || this.keys.left.isDown) {
						this.p.animations.play('left');
						this.p.body.velocity.x = -this.p.speed;
						this.sound.walk.play('', 0, 0.03, false, false);
				} else if(this.keys.d.isDown || this.keys.right.isDown) {
						this.p.animations.play('right');
						this.p.body.velocity.x = this.p.speed;
						this.sound.walk.play('', 0, 0.03, false, false);
				} else {
						this.p.animations.stop();
				}
				
				// npc tracking
				if(Math.abs(this.p.x - this.npc.x) < Math.abs(this.p.y - this.npc.y) ) {
						if(this.p.y > this.npc.y)
								this.npc.animations.play('down');
						else
								this.npc.animations.play('up');
				} else {
						if(this.p.x > this.npc.x)
								this.npc.animations.play('right');
						else
								this.npc.animations.play('left');
				}
				// collision and prompt
				this.physics.arcade.collide(this.p, this.npc);
				if((this.p.x > this.npc.x - 30 && this.p.x < this.npc.x + 30) && (this.p.y > this.npc.y - 30 && this.p.y < this.npc.y + 30)) {
						if(this.inDialogue === false) {
								this.npcPrompt = true;
								this.UI.visible = true;
								this.UI.text.setText("                           Press Space to talk");
						}
				} else {
						this.npcPrompt = false;
						this.inDialogue = false;
						this.UI.visible = false;
						this.UI.text.setText("");
				}
				
				// cell phone
				if(this.physics.arcade.overlap(this.p, this.phone) && this.win === false) {
						this.UI.visible = true;
						this.UI.text.setText("Press Space to pick up the cell phone");
				}
		}
}
