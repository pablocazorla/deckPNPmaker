var getDeck = config => {

	var cardConfig = {
			width: 689,
			height: 1061
		},

		cardPath = 'images/card/',
		ext = '.png';

	var S = 'S',
		A = 'A',
		I = 'I',
		II = 'II',
		III = 'III',
		IV = 'IV',
		V = 'V';

	var RED = 'red',
		YELLOW = 'yellow',
		ORANGE = 'orange',
		GREEN = 'green',
		BLUE = 'blue',
		BLUE_S = 'blue_s',
		BLACK = 'black',
		BLACK_F = 'black_f'

	var ATAQUE = 'ataque',
		ATAQUE_GLOBAL = 'ataque-global',
		FIN = 'fin',
		INSTANTANEO = 'instantaneo',
		PERMANENTE = 'permanente',
		ACCION = 'accion';

	var AGRIC = 'agricultura',
		ARTE = 'arte',
		CIENCIA = 'ciencia',
		COMERCIO = 'comercio',
		CULTURA = 'cultura',
		DEFENSA = 'defensa',
		GUERRA = 'guerra';

	var imageUrls = {
		background: cardPath + 'background' + ext
	};

	// IMAGES

	[RED,
		YELLOW,
		ORANGE,
		GREEN,
		BLUE,
		BLUE_S,
		BLACK,
		BLACK_F
	].forEach(col => {
		imageUrls['color-' + col] = cardPath + 'color-' + col + ext;
		imageUrls['icon-' + col] = cardPath + 'icon-' + col + ext;
	});

	[ATAQUE,
		ATAQUE_GLOBAL,
		FIN,
		INSTANTANEO,
		PERMANENTE,
		ACCION
	].forEach(acc => {
		imageUrls['accion-' + acc] = cardPath + 'accion-' + acc + ext;
	});

	[AGRIC,
		ARTE,
		CIENCIA,
		COMERCIO,
		CULTURA,
		DEFENSA,
		GUERRA
	].forEach(acc => {
		imageUrls['ic-' + acc] = cardPath + 'ic-' + acc + ext;
	});

	[ARTE,
		CIENCIA,
		CULTURA
	].forEach(acc => {
		imageUrls['lupa-' + acc] = cardPath + 'lupa-' + acc + ext;
	});


	// PICTURES
	[
		{
			col: BLACK,
			picts:[
				'chichen-itza',
				'ciudad-prohibida',
				'futuro',
				'internet',
				'jardines-colgantes',
				'piramides',
				'programa-apollo',
				'proyecto-manhattan',
				'santa-sofia',
				'stonehenge',
				'templo-mahabodhi',
				'torre-eiffel'
			]
		},{
			col: BLUE,
			picts:[
				'burocracia',
				'capitalismo',
				'comunismo',
				'democracia',
				'feudalismo',
				'mercantilismo',
				'monar-const',
				'republica',
				'teocracia'
			]
		},{
			col: BLUE_S,
			picts:[
				'aristocr',
				'com-marinos',
				'trib-agraria',
				'tribu-artesana',
				'tribu-guerrera',
				'tribu-religiosa'
			]
		},{
			col: GREEN,
			picts:[
				'agric-mecaniz',
				'astronomia',
				'computadoras',
				'domesticacion',
				'filosofía',
				'herreria',
				'imprenta',
				'irrigacion',
				'maquina-vapor',
				'satelites'
			]
		},{
			col: ORANGE,
			picts:[
				'academia-militar',
				'barracas',
				'castillo',
				'central-nuclear',
				'fabrica',
				'faro',
				'mercado-valores',
				'monasterio',
				'puerto',
				'templo'
			]
		},{
			col: RED,
			picts:[
				'armadura',
				'arqueros',
				'avion-guerra',
				'balistica',
				'caballero',
				'caza-reaccion',
				'espadachin',
				'fragata',
				'guerrero',
				'polvora'
			]
		},{
			col: YELLOW,
			picts:[
				'cleopatra',
				'colon',
				'einstein',
				'gandhi',
				'genghis',
				'john-lennon',
				'napoleon',
				'pericles',
				'qin',
				'trajano'
			]
		}		
	].forEach(fol => {

		var col = fol.col;
		fol.picts.forEach(pict => {
			imageUrls[pict] = 'images/'+col+'/'+ pict + ext;
		});
	});

	var setImage = function(options, cardToRender) {
		var newImage = new Konva.Image(options);
		if (cardToRender) {
			cardToRender.add(newImage);
			return setImage;
		}
		return newImage;
	};
	var setText = function(options, cardToRender) {
		var newText = new Konva.Text(options);
		newText.setOffset({
			x: newText.getWidth() / 2
		});
		if (cardToRender) {
			cardToRender.add(newText);
			return setText;
		}
		return newText;
	};


	var accionCoord = {
		x: 50,
		y: 629
	};
	var lupaCoord = {
		x: 588,
		y: 638
	};

	var iconCoord = {
		width: 90,
		y: 983
	}


	var Deck = {
		cardConfig,
		imageUrls,
		images: {},
		renderCard(card) {

			var {
				images
			} = Deck;

			var {
				color,
				age,
				name,
				accion,
				icons,
				fontSize,
				fontY,
				pict
			} = card

			var cardToRender = new Konva.Group();

			//background
			setImage({
				x: 0,
				y: 0,
				image: images.background
			}, cardToRender);

			if(pict){
				var dy = color === YELLOW ? 10 : 0;
				setImage({
					x: card.pictX || 66,
					y: (card.pictY || 74) + dy,
					image: images[pict]
				}, cardToRender);
			}

			//baseColor
			setImage({
				x: 0,
				y: 0,
				image: images['color-' + color]
			}, cardToRender);

			if (accion) {
				//accion
				setImage({
					x: accionCoord.x,
					y: accionCoord.y,
					image: images['accion-' + accion]
				}, cardToRender);
			}

			// lupa
			var lupaImg = null;
			switch (color) {
				case RED:
					lupaImg = CIENCIA;
					break;
				case GREEN:
					lupaImg = CIENCIA;
					break;
				case YELLOW:
					lupaImg = CULTURA;
					break;
				case BLUE:
					lupaImg = CULTURA;
					break;
				case ORANGE:
					lupaImg = ARTE;
					break;
				case BLACK:
					lupaImg = ARTE;
					break;
				default:
					//
			}
			if (lupaImg) {
				setImage({
					x: lupaCoord.x,
					y: lupaCoord.y,
					image: images['lupa-' + lupaImg]
				}, cardToRender);
			}
			// age
			if (age !== 'Z') {
				setText({
					x: cardConfig.width / 2,
					y: 18,
					text: age,
					fontSize: 50,
					fontFamily: 'Minion Pro Semibold',
					fill: 'black'
				}, cardToRender);
			}
			// name
			setText({
				x: cardConfig.width / 2,
				y: 659 + (fontY || 0),
				text: name,
				fontSize: fontSize || 42,
				fontFamily: 'Minion Pro Semibold',
				fill: 'black'
			}, cardToRender);

			if (icons && icons.length > 0) {
				var xIcon = (cardConfig.width / 2) - (0.5 * icons.length * iconCoord.width);
				icons.forEach(ic => {
					// back icon
					setImage({
						x: xIcon,
						y: iconCoord.y,
						image: images['icon-' + color]
					}, cardToRender)
					// icon
					({
						x: xIcon + 17,
						y: iconCoord.y + 16,
						image: images['ic-' + ic]
					}, cardToRender);
					xIcon += iconCoord.width;
				});
			};

			var rect = new Konva.Rect({
				x: 1,
				y: 1,
				width: cardConfig.width - 1,
				height: cardConfig.height - 1,
				stroke: '#444',
				strokeWidth: 1
			});

			// add the shape to the layer
			cardToRender.add(rect);

			return cardToRender;
		}
	};

	var cards = [{
		color: BLUE_S,
		age: S,
		name: 'Tribu Agraria',
		pict: 'trib-agraria',
		icons: [
			AGRIC
		]
	}, {
		color: YELLOW,
		age: IV,
		name: 'Albert Einstein',
		pict: 'einstein',
		accion: FIN,
		icons: [
			CIENCIA, CIENCIA, CIENCIA
		]
	}, {
		color: BLACK,
		age: II,
		name: 'Templo Mahabodhi',
		pict: 'templo-mahabodhi',
		accion: FIN,
		icons: [
			CULTURA, CULTURA
		]
	}, {
		color: BLACK,
		age: V,
		name: 'Programa Apollo',
		pict: 'programa-apollo',
		accion: FIN,
		icons: [
			CULTURA, CULTURA
		]
	}, {
		color: RED,
		age: I,
		name: 'Arqueros',
		pict: 'arqueros',
		accion: PERMANENTE,
		icons: [
			GUERRA
		]
	}, {
		color: BLUE_S,
		age: S,
		name: 'Aristocracia',
		pict: 'aristocr',
		icons: [
			CIENCIA
		]
	}, {
		color: YELLOW,
		age: I,
		name: 'Pericles',
		pict: 'pericles',
		accion: INSTANTANEO,
		icons: [
			CIENCIA, CIENCIA
		]
	}, {
		color: GREEN,
		age: II,
		name: 'Astronomía',
		pict: 'astronomia',
		accion: INSTANTANEO,
		icons: [
			COMERCIO, COMERCIO
		]
	}, {
		color: ORANGE,
		age: A,
		name: 'Barracas',
		pict: 'barracas',
		accion: PERMANENTE,
		icons: [
			GUERRA
		]
	}, {
		color: BLUE,
		age: II,
		name: 'Burocracia',
		pict: 'burocracia',
		accion: ACCION,
		icons: [
			CIENCIA
		]
	}, {
		color: RED,
		age: III,
		name: 'Pólvora',
		pict: 'polvora',
		accion: ATAQUE,
		icons: [
			GUERRA, GUERRA
		]
	}, {
		color: BLUE,
		age: V,
		name: 'Capitalismo',
		pict: 'capitalismo',
		accion: FIN,
		icons: [
			COMERCIO
		]
	}, {
		color: ORANGE,
		age: II,
		name: 'Castillo',
		pict: 'castillo',
		accion: PERMANENTE,
		icons: [
			DEFENSA, DEFENSA
		]
	}, {
		color: YELLOW,
		age: III,
		name: 'Cristóbal Colón',
		pict: 'colon',
		accion: ACCION,
		icons: [
			COMERCIO, COMERCIO
		]
	}, {
		color: BLUE,
		age: IV,
		name: 'Comunismo',
		pict: 'comunismo',
		accion: INSTANTANEO,
		icons: [
			ARTE, ARTE
		]
	}, {
		color: GREEN,
		age: IV,
		name: 'Computadoras',
		pict: 'computadoras',
		accion: INSTANTANEO,
		icons: [
			CIENCIA, CIENCIA, CIENCIA
		]
	}, {
		color: YELLOW,
		age: I,
		name: 'Qin Shi Huang',
		pict: 'qin',
		accion: ACCION,
		icons: [
			CULTURA
		]
	}, {
		color: BLUE,
		age: III,
		name: 'Monarquía Constitucional',
		pict: 'monar-const',
		fontSize: 32,
		fontY: 5,
		accion: PERMANENTE,
		icons: [
			CULTURA
		]
	}, {
		color: BLUE_S,
		age: S,
		name: 'Tribu Artesana',
		pict: 'tribu-artesana',
		icons: [
			ARTE
		]
	}, {
		color: RED,
		age: II,
		name: 'Armadura',
		pict: 'armadura',
		accion: PERMANENTE,
		icons: [
			DEFENSA, GUERRA
		]
	}, {
		color: BLUE,
		age: IV,
		name: 'Democracia',
		pict: 'democracia',
		accion: PERMANENTE,
		icons: [
			CIENCIA, CIENCIA
		]
	}, {
		color: BLACK,
		age: IV,
		name: 'Torre Eiffel',
		pict: 'torre-eiffel',
		accion: FIN,
		icons: [
			ARTE, ARTE
		]
	}, {
		color: ORANGE,
		age: IV,
		name: 'Fábrica',
		pict: 'fabrica',
		accion: PERMANENTE,
		icons: [
			ARTE, ARTE, ARTE
		]
	}, {
		color: BLUE,
		age: II,
		name: 'Feudalismo',
		pict: 'feudalismo',
		accion: PERMANENTE,
		icons: [
			ARTE
		]
	}, {
		color: RED,
		age: V,
		name: 'Caza a Reacción',
		pict: 'caza-reaccion',
		accion: ATAQUE_GLOBAL,
		icons: [
			GUERRA, GUERRA, GUERRA, GUERRA, GUERRA
		]
	}, {
		color: RED,
		age: III,
		name: 'Fragata',
		pict: 'fragata',
		accion: PERMANENTE,
		icons: [
			GUERRA, GUERRA
		]
	}, {
		color: BLACK_F,
		age: 'Z',
		name: 'El Futuro',
		pict: 'futuro',
		icons: [
			CULTURA, CULTURA, CULTURA, CULTURA, CULTURA, CULTURA
		]
	}, {
		color: YELLOW,
		age: II,
		name: 'Genghis Khan',
		pict: 'genghis',
		accion: PERMANENTE,
		icons: [
			GUERRA, GUERRA
		]
	}, {
		color: BLACK,
		age: II,
		name: 'Chichen Itza',
		pict: 'chichen-itza',
		accion: FIN,
		icons: []
	}, {
		color: BLACK,
		age: I,
		name: 'Stonehenge',
		pict: 'stonehenge',
		accion: FIN,
		icons: [DEFENSA, DEFENSA]
	}, {
		color: BLACK,
		age: I,
		name: 'Jardines Colgantes',
		pict: 'jardines-colgantes',
		accion: FIN,
		icons: [ARTE]
	}, {
		color: BLACK,
		age: III,
		name: 'Santa Sofía',
		pict: 'santa-sofia',
		accion: FIN,
		icons: [GUERRA, GUERRA, GUERRA]
	}, {
		color: BLACK,
		age: V,
		name: 'Internet',
		pict: 'internet',
		accion: FIN,
		icons: [COMERCIO, COMERCIO, COMERCIO, COMERCIO]
	}, {
		color: GREEN,
		age: I,
		name: 'Herrería',
		pict: 'herreria',
		accion: INSTANTANEO,
		icons: [ARTE]
	}, {
		color: GREEN,
		age: II,
		name: 'Irrigación',
		pict: 'irrigacion',
		accion: INSTANTANEO,
		icons: [AGRIC]
	}, {
		color: YELLOW,
		age: V,
		name: 'John Lennon',
		pict: 'john-lennon',
		accion: ACCION,
		icons: [CULTURA, CULTURA, CULTURA, CULTURA]
	}, {
		color: YELLOW,
		age: II,
		name: 'Trajano',
		pict: 'trajano',
		accion: INSTANTANEO,
		icons: [CULTURA, CULTURA]
	}, {
		color: RED,
		age: II,
		name: 'Caballero',
		pict: 'caballero',
		accion: ATAQUE,
		icons: [DEFENSA, GUERRA]
	}, {
		color: ORANGE,
		age: I,
		name: 'Faro',
		pict: 'faro',
		accion: PERMANENTE,
		icons: [COMERCIO]
	}, {
		color: YELLOW,
		age: IV,
		name: 'Mahatma Gandhi',
		pict: 'gandhi',
		accion: PERMANENTE,
		icons: [CULTURA, CULTURA, CULTURA]
	}, {
		color: BLACK,
		age: IV,
		name: 'Proyecto Manhattan',
		pict: 'proyecto-manhattan',
		accion: ATAQUE_GLOBAL,
		icons: [DEFENSA, DEFENSA, DEFENSA, DEFENSA, DEFENSA, DEFENSA]
	}, {
		color: GREEN,
		age: IV,
		name: 'Agricultura Mecanizada',
		pict: 'agric-mecaniz',
		fontSize: 34,
		fontY: 4,
		accion: INSTANTANEO,
		icons: [AGRIC, AGRIC, AGRIC]
	}, {
		color: BLUE,
		age: III,
		name: 'Mercantilismo',
		pict: 'mercantilismo',
		accion: PERMANENTE,
		icons: [GUERRA]
	}, {
		color: ORANGE,
		age: III,
		name: 'Academia Militar',
		pict: 'academia-militar',
		accion: PERMANENTE,
		icons: [GUERRA, GUERRA]
	}, {
		color: BLUE_S,
		age: S,
		name: 'Casta Guerrera',
		pict: 'tribu-guerrera',
		icons: [GUERRA]
	}, {
		color: ORANGE,
		age: II,
		name: 'Monasterio',
		pict: 'monasterio',
		accion: PERMANENTE,
		icons: [CULTURA, CULTURA]
	}, {
		color: YELLOW,
		age: III,
		name: 'Napoleón Bonaparte',
		pict: 'napoleon',
		fontSize: 40,
		fontY: 1,
		accion: ATAQUE_GLOBAL,
		icons: [GUERRA, GUERRA, GUERRA]
	}, {
		color: ORANGE,
		age: V,
		name: 'Planta Nuclear',
		pict: 'central-nuclear',
		accion: PERMANENTE,
		icons: [ARTE, ARTE, ARTE, ARTE]
	}, {
		color: GREEN,
		age: I,
		name: 'Filosofía',
		pict: 'filosofía',
		accion: ACCION,
		icons: [CIENCIA]
	}, {
		color: GREEN,
		age: III,
		name: 'Imprenta',
		pict: 'imprenta',
		accion: INSTANTANEO,
		icons: [CIENCIA, CIENCIA]
	}, {
		color: BLACK,
		age: A,
		name: 'Las Pirámides',
		pict: 'piramides',
		accion: FIN,
		icons: []
	}, {
		color: YELLOW,
		age: A,
		name: 'Cleopatra',
		pict: 'cleopatra',
		accion: ACCION,
		icons: [ARTE]
	}, {
		color: BLUE_S,
		age: S,
		name: 'Tribu Religiosa',
		pict: 'tribu-religiosa',
		icons: [CULTURA]
	}, {
		color: BLUE,
		age: I,
		name: 'República',
		pict: 'republica',
		accion: PERMANENTE,
		icons: [CULTURA]
	}, {
		color: GREEN,
		age: V,
		name: 'Satélites',
		pict: 'satelites',
		accion: INSTANTANEO,
		icons: [DEFENSA, DEFENSA]
	}, {
		color: BLUE_S,
		age: S,
		name: 'Comerciantes del Mar',
		pict: 'com-marinos',
		fontSize: 36,
		fontY: 3,
		icons: [COMERCIO]
	}, {
		color: ORANGE,
		age: III,
		name: 'Puerto Marítimo',
		pict: 'puerto',
		accion: PERMANENTE,
		icons: [COMERCIO, COMERCIO]
	}, {
		color: GREEN,
		age: III,
		name: 'Máquina a Vapor',
		pict: 'maquina-vapor',
		accion: INSTANTANEO,
		icons: [ARTE, ARTE]
	}, {
		color: ORANGE,
		age: IV,
		name: 'Bolsa de Valores',
		pict: 'mercado-valores',
		accion: PERMANENTE,
		icons: [COMERCIO, COMERCIO, COMERCIO]
	}, {
		color: RED,
		age: I,
		name: 'Espadachín',
		pict: 'espadachin',
		accion: ATAQUE,
		icons: [GUERRA]
	}, {
		color: BLACK,
		age: III,
		name: 'Ciudad Prohibida',
		pict: 'ciudad-prohibida',
		accion: FIN,
		icons: []
	}, {
		color: RED,
		age: IV,
		name: 'Balística',
		pict: 'balistica',
		accion: ATAQUE,
		icons: [GUERRA, GUERRA, GUERRA]
	}, {
		color: ORANGE,
		age: I,
		name: 'Templo',
		pict: 'templo',
		accion: PERMANENTE,
		icons: [CULTURA]
	}, {
		color: BLUE,
		age: I,
		name: 'Teocracia',
		pict: 'teocracia',
		accion: PERMANENTE,
		icons: [ARTE]
	}, {
		color: RED,
		age: IV,
		name: 'Avión de guerra',
		pict: 'avion-guerra',
		accion: ATAQUE_GLOBAL,
		icons: [GUERRA, GUERRA, GUERRA]
	}, {
		color: RED,
		age: A,
		name: 'Guerrero',
		pict: 'guerrero',
		accion: ATAQUE,
		icons: [DEFENSA]
	}, {
		color: GREEN,
		age: A,
		name: 'Domesticación',
		pict: 'domesticacion',
		accion: INSTANTANEO,
		icons: [AGRIC]
	}];

	var por_age = function(a,b){
		return (a.age < b.age) ? -1:1;
	},
	por_color = function(a,b){
		return (a.color < b.color) ? -1:1;
	},
	por_name = function(a,b){
		return (a.name < b.name) ? -1:1;
	};

	Deck.cards = cards.sort(por_color);

	return Deck;
};