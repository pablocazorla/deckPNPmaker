var getDeck = config => {

	var cardConfig = Object.assign({}, config, {
			widthMM: 56,
			heightMM: 89
		}),
		imageUrls = {
			yoda: 'images/yoda.jpg'
		};

	var RED = 'RED',
		YELLOW = 'YELLOW',
		ORANGE = 'ORANGE',
		GREEN = 'GREEN',
		BLUE = 'BLUE',
		BLACK = 'BLACK';

	var S = 'S',
		A = 'A',
		I = 'I',
		II = 'II',
		III = 'III',
		IV = 'IV',
		V = 'V';


	var Deck = {
		cardSize: config.getSize(cardConfig),
		imageUrls,
		images: {},
		renderCard(card) {

			var {
				images
			} = Deck;


			var cardToRender = new Konva.Image({
				x: 50,
				y: 50,
				image: images.yoda,
				width: 106,
				height: 118
			});

			return cardToRender;
		},
		cards: [{
			color: RED
			age: I,
			name: 'Templo',
			icons:[],
			image: 'yoda'
		}]
	};

	return Deck;
};