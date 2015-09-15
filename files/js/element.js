/**
 * This is required for element rendering to be possible
 * @type {PlatformElement}
 */
(function(){
	var TeamCard = PlatformElement.extend({
		initialize: function() {
			$(document).ready(function() {
				this.fixStyles();
				this.setupExtraArea();
			}.bind(this));

			this.fixStyles();
			this.setupExtraArea();
		},

		/**
		 * Lots of styles are applied by default to editable areas of
		 * the editor. To make the element looks how you want, some styles
		 * need to be overwritten.
		 *
		 * Classes that are used are:
		 * 		- .editable-text
		 * 		- .paragraph
		 * 		- .ui-wrapper
		 * 		- .wsite-image
		 * 		- .wsite-*
		 * 		- (etc...)
		 */
		fixStyles: function() {
			var w = this.$el.find('.team-card__image--round').width();
			var h = w;

			this.$el.find('.editable-text').each(function(index) {
				$(this).attr('style', '');
			});
		},

		/**
		 * Shows and hides the extra areas on the team
		 * card based on the options chosen in the element
		 * settings popover;
		 */
		setupExtraArea: function() {
			switch(this.settings.get('extra_area')) {
				case 'none':
					this.$el.find('.button').remove();
					this.$el.find('.text').remove();
					break;
				case 'button':
					this.$el.find('.text').remove();
					break;
				case 'text':
					this.$el.find('.button').remove();
					break;
			}
		}
	});

	return TeamCard;
})();

