( function() {
	'use strict';

	var capture, canvas, img, downloadButton, tracker;

	window.setup = function() {
		capture = createCapture( VIDEO );
		canvas = createCanvas( 640, 480 );
		downloadButton = createButton( 'Download a photo!' );
		downloadButton.parent( 'app' );
		downloadButton.mouseClicked( download );

		tracker = new clm.tracker();
		tracker.init();
		tracker.start( document.querySelector( 'canvas' ) );

		requestAnimationFrame( function frame() {
			getImage();
			console.log( tracker.getCurrentPosition() );
			requestAnimationFrame( frame );
		} );
	}

	function plot( x, y, w, h ) {
		var rect = document.createElement( 'div' );

		document.body.appendChild( rect );
		rect.classList.add( 'tentacle' );
		rect.style.width = w + 'px';
		rect.style.height = h + 'px';
		rect.style.left = ( img.offsetLeft + x ) + 'px';
		rect.style.top = ( img.offsetTop + y ) + 'px';
	};


	//getting image from capture
	function getImage() {
		img = capture.get( 0, 0, width, height );
		image( img, 0, 0 );
	}

	//download image to disk
	function download() {
		saveCanvas( canvas, 'portrait-' + random( 1000 ), 'jpg' );
	}
}() );
