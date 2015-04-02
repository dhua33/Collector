var boot = function(game) {};
boot.prototype = {
		preload: function() {
				this.load.image('loading', 'assets/loading.png');
				this.load.image('loadbar', 'assets/loadbar.png');
		},
		create: function() {
				this.state.start('Preloader');
		}
}
