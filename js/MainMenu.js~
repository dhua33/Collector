var mainmenu = function(game) {
		var title;
		var space;
};

mainmenu.prototype = {
		create: function() {
				title = this.add.sprite(0, 0, 'title');
				title.height *= 0.5;
				title.width *= 0.5;
				space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
				space.onDown.add(this.play, this);
		},
		play: function() {
				this.state.start('Game');
		}
}
