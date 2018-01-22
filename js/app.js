// APP
var config = {
	INCHES: 25.4,
	resolution: 300,
	widthMM: 420,
	heightMM: 297,
	getSize: config => {
		return {
			width: config.resolution * (config.widthMM / config.INCHES),
			height: config.resolution * (config.heightMM / config.INCHES),
		}
	}
}

////////////////////////////////////////

var pageSize = config.getSize(config),
	createPage = () =>{
		var container = document.getElementById('container');
		var div = document.createElement('div');
		div.className = 'page';
		container.appendChild(div);
		return new Konva.Stage({
			container: div,
			width: pageSize.width,
			height: pageSize.height
		});
	},
	page = createPage();




	// page = new Konva.Stage({
	// 	container: 'container',
	// 	width: pageSize.width,
	// 	height: pageSize.height
	// });



var Deck = getDeck(config);
var {
	cardConfig,
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

var calculateMargin = (pageSize,cardSize) => {
	var cols = Math.floor(pageSize/cardSize);
	return 0.5 * (pageSize - (cols * cardSize));
};

var renderPage = () => {

	var xInit = calculateMargin(pageSize.width,cardConfig.width),
		yInit = calculateMargin(pageSize.height,cardConfig.height),
		xPos = xInit, yPos = yInit,
		cardGrid = new Konva.Layer();
		page.add(cardGrid);

	cards.forEach(card => {
		var cardToRender = renderCard(card);

		if((xPos + cardConfig.width) > pageSize.width){
			xPos = xInit;
			yPos += cardConfig.height;
		}

		if((yPos + cardConfig.height) > pageSize.height){
			xPos = xInit;
			yPos = yInit;
			page.add(cardGrid);
			page = createPage();
			cardGrid = new Konva.Layer();
			
		}

		cardToRender.x(xPos);
		cardToRender.y(yPos);

		xPos += cardConfig.width;

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