( function() {
	'use strict';

	var capture, canvas, img, downloadButton, tracker, tentancles;

	window.preload = function () {
		// Load 6 images of random tentancles
		tentancles = []
		var images = generateTentaclesArray( 6 );
		for(var i = 0; i < 6; i++ ) {
			append(tentancles,loadImage( images[i] ));
		}
	}

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
			var position = tracker.getCurrentPosition();
			if( position ) {
				position = position.slice(44, 50);
				image(tentancles[0], position[0][0]-15, position[0][1]);
		}
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

	// Add tentacle to canvas
	function addTentacle( x, y, tent ) {
		image(tent, x, y);
	}
	// Generate array with paths to random tentacles
	function generateTentaclesArray( numberOfTentacles ) {
		var tentacles = [], outTentacles = [], numberOfImages = 12;
		for( let i = 0; i <numberOfImages; i++ ) {
			// filenames started from 1 not 0
			tentacles[i] = './img/tentacle_' + (i + 1) +'.png';
		}
		outTentacles = shuffle( tentacles );
		return subset(outTentacles, 0, numberOfTentacles);
	}
}() );
