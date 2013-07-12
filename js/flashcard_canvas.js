/**
 * @author fiziksphreak
 */

var front = true;

var stage = new Kinetic.Stage({
	container: 'flashcard_canvas',
	width: 320,
	height: 320
});

function load_canvas () {
	var layer = new Kinetic.Layer();
	var bglayer = new Kinetic.Layer();
	
    var cardGroup = new Kinetic.Group({
    	x: 10,
    	y: 10,
    	width: 300,
    	height: 300,
    	draggable: false,
    	name: 'cardGrp'
    });
    
	var bgRect = new Kinetic.Rect({
	    x: 0,
	    y: 0,
	    width: 320,
	    height: 320,
	    fill: '#EEEEEE',
	    stroke: '#999999',
	    strokeWidth: 2,
	    id: 'backgrnd'
	});
	bglayer.add(bgRect);
	
	var card = new Kinetic.Rect({
	    x: 0,
	    y: 0,
	    width: 300,
	    height: 300,
	    fill: '#999999',
	    cornerRadius: 10,
	    shadowColor: '#555555',
	    shadowOffset: 5,
	    shadowBlur: 10,
	    id: 'card'
	});
	
	// card.toImage({
		// width: 300,
		// height: 300,
		// callback: function(img) {
			// var image = new Kinetic.Image({
				// image: img,
				// x: 0,
				// y: 0,
				// draggable: false
			// });
			// layer.add(image);
			// layer.draw();
		// }
	// });
	
	var cardText = new Kinetic.Text({
		x: 0,
		y: 0,
		text: 'FRONT',
		fontSize: 30,
		fontFamily: 'sans-serif',
		fill: '#111111',
		width: 300,
		height: 300,
		align: 'center',
		padding: 20,
		fontStyle: 'bold'
	});
    
	layer.add(cardGroup);
	cardGroup.add(card);
	cardGroup.add(cardText);
	
	card.tween = new Kinetic.Tween({
		node: card,
		scaleX: 0,
		x: 160,
		easing: Kinetic.Easings.EaseInOut,
		duration: .5,
		onFinish: function() {
			if (front) {
				//cardText.setText("Back of Card");
				cardText.setText(card_text[cur].back_text);
				front = false;
			} else {
				//cardText.setText("Front of Card");
				cardText.setText(card_text[cur].front_text);
				front = true;
			}
			stage.draw();
			card.tween.reverse();
			cardText.tween.reverse();
		}
	});
	
	cardText.tween = new Kinetic.Tween({
		node: cardText,
		scaleX: 0,
		x: 160,
		easing: Kinetic.Easings.EaseInOut,
		duration: .5
	});
	
	// use event delegation
	layer.on('mousedown touchstart', function(evt) {
		//evt.targetNode.tween.play();
		card.tween.play();
		cardText.tween.play();
	});
  
	// layer.on('mouseout touchend', function(evt) {
		// //evt.targetNode.tween.reverse();
		// if (front) {
			// cardText.setText("Back of Card");
			// front = false;
		// } else {
			// cardText.setText("Front of Card");
			// front = true;
		// }
		// stage.draw();
		// card.tween.reverse();
		// cardText.tween.reverse();
	// });
	
	stage.add(bglayer);
	stage.add(layer);
	stage.draw();
}
