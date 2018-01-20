var Deck = {
	cardSize: {
		widthMM: 56,
		heightMM: 89
	},
	images:{
		yoda:'images/yoda.jpg'
	},
	renderCard(card) {
		var cardToRender = new Konva.Rect({
			x: 10,
			y: 10,
			width: 100,
			height: 50,
			fill: card.color,
			stroke: 'black',
			strokeWidth: 4
		});

		return cardToRender;
	},
	cards: [{
		color: 'yellow'
	}]
};