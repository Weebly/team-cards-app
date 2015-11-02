/**
 * This is required for element rendering to be possible
 * @type {PlatformElement}
 */
(function() {
    var TeamCard = PlatformElement.extend({
        initialize: function() {
            // since MutationObservers aren't supported in ie10, we use the polyfill class
            var MutationObserverRequest;
            if (!MutationObserver) {
                MutationObserverRequest = $.getScript(this.assets_path + 'MutationObserver.min.js');
            } else {
                // but if it's already defined, then immediately resolve this promise
                MutationObserverRequest = $.Deferred(function(deferred) { 
                    $(deferred.resolve);
                });
            }
            // then, once we've loaded all of our scripts
            $.when(
                MutationObserverRequest
            ).done(function() {
                // init all of our styles.
                this.fixStyles();
                this.updateImage();
                this.$('.wsite-image img').load(this.setUpImage.bind(this));
            }.bind(this));
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
        setUpImage: function() {
            var view = this;

            // begin listening for changes to the image source (i.e., someone uploading an image)
            // ensured to be here via the polyfill request
            var imageObserver = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    view.updateImage();
                });
            });
            imageObserver.observe(this.$('div.wsite-image img')[0], {
                attributes: true
            });
            // make the entire placeholder area clickable
            this.$('div.wsite-image a').click(function() {
                $(this).find('img').click();
            });
            // but prevent infinite loops
            this.$('div.wsite-image img').click(function(e) {
                e.stopPropagation();
            });
            this.updateImage();
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
            // if it's zero because the initial image hasn't loaded yet,
            // then bind a recall to when it finishes.
            if (!imageSize.height || !imageSize.width || !containerSize.height || !containerSize.width) {
                if (isInitialImage) {
                    $img.load(this.updateImage.bind(this));
                }
                return;
            }
            $img.unbind('load');
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
            }
        }
    });

    return TeamCard;
})();