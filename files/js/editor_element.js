/**
 * This is required for element rendering to be possible
 * @type {PlatformElement}
 */
(function() {
    var TeamCard = PlatformElement.extend({
        initialize: function() {
            // init all of our styles.
            this.fixStyles();

            // set up our handlers
            this.setUpEvents();

            // then update the image
            this.updateImage();
            this.$('.wsite-image img').bind("load", this.updateImage.bind(this));
        },

        /**
         * Lots of styles are applied by default to editable areas of
         * the editor. To make the element looks how you want, some styles
         * need to be overwritten.
         *
         * Classes that are used are:
         *      - .editable-text
         *      - .paragraph
         *      - .ui-wrapper
         *      - .wsite-image
         *      - .wsite-*
         *      - (etc...)
         */
        fixStyles: function() {
            var w = this.$el.find('.team-card__image--round').width();
            var h = w;

            this.$el.find('.editable-text').each(function(index) {
                $(this).attr('style', '');
            });

            this.$el.find('.element').each(function(index) {
                $(this).attr('style', '');
            });

            this.$el.find('img').css({
                display: '',
                width: '',
                height: ''
            });
        },

        // sets up the image for proper usage.
        setUpEvents: function() {
            // make the entire placeholder area clickable
            var $link = this.$('div.wsite-image a');
            // if it's a link placeholder, then ignore immediatepropagation
            if ($link.is('a[href^="http://weebly-link/"], a[href^="https://weebly-link/"]').length !== 0) {
                $link.children().click(function(e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                })
            } else {
                // wire stuff to the img for img flyover
                $link.click(function(e) {
                     $(this).find('img').click();
                 });
            }
            // but prevent infinite loops
            this.$('div.wsite-image img').click(function(e) {
                e.stopPropagation();
            });
        },

        // updates the image and transforms it depending on what needs to happen to it.
        // if it's the default placeholder, we translate it so it's center in the image area
        // if it's an uploaded image that's too small, we resize it so it'll fit.
        updateImage: function() {
            var $img = this.$('li.wsite-image img');
            var $imgContainer = this.$('.team-card__image--' + this.settings.get('image_display'));
            var isInitialImage = !!this.$('li.wsite-initial-image img').length;

            // if there's no image to be found, stop executing.
            if ($img.length === 0) {
                return;
            }

            // reset the size of the image
            $img.css({
                'transform': 'none',
                'height': 'auto',
                'width': 'auto'
            });

            // grab sizes of the container and the image
            var imageSize = {
                height: $img.height(),
                width: $img.width()
            }
            var containerSize = {
                height: $imgContainer.height(),
                width: $imgContainer.width()
            }

            // if any of these are zero, stop executing.
            if (!imageSize.height || !imageSize.width || !containerSize.height || !containerSize.width) {
                return;
            }

            // determine whether he have an initial image or not
            if (isInitialImage) {
                // if we do, we need to move it to fit.
                var dx = (containerSize.width - imageSize.width) / 2;
                var dy = (containerSize.height - imageSize.height) / 2;
                $img.css({
                    'transform': 'translate(' + dx + 'px,' + dy + 'px)'
                });                
            } else {
                // otherwise, if the image is smaller than the container, scale it up to fit.
                var scale = 1;
                if (imageSize.height < containerSize.height) {
                    scale = containerSize.height / imageSize.height;
                }
                if (imageSize.width < containerSize.width) {
                    scale = Math.max(scale, containerSize.width / imageSize.width);
                }
                $img.css({
                    'transform-origin': 'top center',
                    'transform': 'scale(' + scale + ', ' + scale + ')'
                });
                $img.css({
                    'height': $img.height() + 'px',
                    'width': $img.width() + 'px'
                });
            }
        }
    });

    return TeamCard;
})();