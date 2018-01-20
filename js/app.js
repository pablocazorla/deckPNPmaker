// APP
var config = {
	INCHES: 25.4,
	resolution: 150,
	widthMM: 60,
	heightMM: 95,
	getSize: config => {
		return {
			width: config.resolution * (config.widthMM / config.INCHES),
			height: config.resolution * (config.heightMM / config.INCHES),
		}
	}
}

////////////////////////////////////////

var pageSize = config.getSize(config),
	page = new Konva.Stage({
		container: 'container',
		width: pageSize.width,
		height: pageSize.height
	});

var cardGrid = new Konva.Layer();

var Deck = getDeck(config);
var {
	renderCard,
	cards,
	imageUrls
} = Deck;

var imagesCount = 0,
	imagesLoaded = 0;
for (var a in imageUrls) {
	imagesCount++;
	var imageObj = new Image();
	imageObj.onload = () => {
		imagesLoaded++;
	};
	imageObj.onerror = () => {
		console.log('ERROR. La imagen "' + a + '" no se pudo cargar.');
	};
	var r = +new Date;
	imageObj.src = imageUrls[a] + '?' + r;
	Deck.images[a] = imageObj;
}

var renderPage = () => {
	cards.forEach(card => {
		var cardToRender = renderCard(card);
		cardGrid.add(cardToRender);
	});
	page.add(cardGrid);
}

var imagesWait = setInterval(function() {
	if (imagesLoaded === imagesCount) {
		clearInterval(imagesWait);
		renderPage();
	}
}, 100);