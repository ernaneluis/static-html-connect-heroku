/****************************************************
SET HEIGHT
****************************************************/
$(document).ready(function() {
	function handleResize() {
	var h = $(window).height();
	        $('section').css({'height':h+'px'});
	}
	$(function(){
	        handleResize();

	        $(window).resize(function(){
	        handleResize();
	    });
	});
});


/****************************************************
PATHLOADER
****************************************************/

/**
 * pathLoader.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
;( function( window ) {

	'use strict';

	function PathLoader( el ) {
		this.el = el;
		// clear fill
		this.el.style.fillDasharray = this.el.style.fillDashoffset = this.el.getTotalLength();
	}

	PathLoader.prototype._draw = function( val ) {
		this.el.style.fillDashoffset = this.el.getTotalLength() * ( 1 - val );
	}

	PathLoader.prototype.setProgress = function( val, callback ) {
		this._draw(val);
		if( callback && typeof callback === 'function' ) {
			// give it a time (ideally the same like the transition time) so that the last progress increment animation is still visible.
			setTimeout( callback, 0 );
		}
	}

	PathLoader.prototype.setProgressFn = function( fn ) {
		if( typeof fn === 'function' ) { fn( this ); }
	}

	// add to global namespace
	window.PathLoader = PathLoader;

})( window );



/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
(function() {

	var support = { animations : Modernizr.cssanimations },
		container = document.getElementById( 'ip-container' ),
		header = container.querySelector( 'header.ip-header' ),
		loader = new PathLoader( document.getElementById( 'ip-loader-circle' ) ),
		animEndEventNames = { 'WebkitAnimation' : 'webkitAnimationEnd', 'OAnimation' : 'oAnimationEnd', 'msAnimation' : 'MSAnimationEnd', 'animation' : 'animationend' },
		// animation end event name
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];

	function init() {
		var onEndInitialAnimation = function() {
			if( support.animations ) {
				this.removeEventListener( animEndEventName, onEndInitialAnimation );
			}

			startLoading();
		};

		// disable scrolling
		// window.addEventListener( 'scroll', noscroll );

		// initial animation
		classie.add( container, 'loading' );

		if( support.animations ) {
			container.addEventListener( animEndEventName, onEndInitialAnimation );
		}
		else {
			onEndInitialAnimation();
		}
	}

	function startLoading() {
		// simulate loading something..
		var simulationFn = function(instance) {
			var progress = 0,
				interval = setInterval( function() {
					progress = Math.min( progress + Math.random() * 0.1, 1 );

					instance.setProgress( progress );

					// reached the end
					if( progress === 1 ) {
						classie.remove( container, 'loading' );
						classie.add( container, 'loaded' );
						clearInterval( interval );

						var onEndHeaderAnimation = function(ev) {
							if( support.animations ) {
								if( ev.target !== header ) return;
								this.removeEventListener( animEndEventName, onEndHeaderAnimation );
							}

							classie.add( document.body, 'layout-switch' );
							window.removeEventListener( 'scroll', noscroll );
						};

						if( support.animations ) {
							header.addEventListener( animEndEventName, onEndHeaderAnimation );
						}
						else {
							onEndHeaderAnimation();
						}
					}
				}, 80 );
		};

		loader.setProgressFn( simulationFn );
	}

	function noscroll() {
		window.scrollTo( 0, 0 );
	}

	init();

})();



/****************************************************
STICKY TITLES
****************************************************/

$(document).ready(function() {
	$(function(){
		$('body').stacks({
			body: '.ip-main',
			title: 'h2',
			margin: 0,
			offset: 51
		})
	})
});


/****************************************************
SCROLL TO SECTIONS
****************************************************/

jQuery(document).ready(function($) {
    $('a[href^="#"]').bind('click.smoothscroll',function (e) {
        e.preventDefault();
        var target = this.hash,
        $target = $(target);

        $('html, body').stop().animate( {
            'scrollTop': $target.offset().top-0
        }, 900, 'swing', function () {
            window.location.hash = target;
        } );
    } );
} );

/****************************************************
SLIDER FADE
****************************************************/

$(window).load(function(){
	var target = $('#intro'),
		targetHeight = target.outerHeight();
	$(window).on('scroll',function(e) {
		var scrollPercent = 0;
		scrollPercent = (targetHeight-$(window).scrollTop())/targetHeight;
		if (scrollPercent >= 0.1) {
			target.css('opacity', scrollPercent);
		}
	});
});

/****************************************************
FADE INTRO TEXT
****************************************************/

$(document).ready(function(){
	var $window = $(window);
	var scrollFade = function ($element, friction, offset) {
	  friction  = (friction  === undefined)? 0.5 : friction;
	  offset = (offset === undefined)? 0 : offset;

	  var parentHeight = $element.parent().outerHeight() * 4;
	  var previousOpacity = Infinity;

	  $window.scroll(function() {
	    var scrollTop = Math.max(0, $window.scrollTop()),
	      opacity   = 1 - (scrollTop / parentHeight - (parentHeight * offset))

	    if (opacity < 0 && previousOpacity < 0) return;

	    $element.css({
	      opacity: opacity
	    });

	    previousOpacity = opacity;
	  });
	}

	scrollFade($('#intro .container')
	  , 0  // Friction (0 ~ 1): lower = none
	  , 0    // Fade duration (0 ~ 1): lower = longer
	);
});
