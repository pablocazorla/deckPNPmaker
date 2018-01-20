// APP
var INCHES = 25.4;

var canvas = {
	resolution: 150,
	widthMM: 60,
	heightMM: 95
};

////////////////////////////////////////

var width = canvas.resolution * (canvas.widthMM / INCHES),
	height = canvas.resolution * (canvas.heightMM / INCHES),
	page = new Konva.Stage({
		container: 'container',
		width: width,
		height: height
	});

var cardGrid = new Konva.Layer();

var {renderCard,cards,images} = Deck;

var imagesCount = 0,
	imagesLoaded = 0;
for(var a in images){
	imagesCount++;
	var imageObj = new Image();
	imageObj.onload = () => {
		imagesLoaded++;
	};
	imageObj.onerror = () => {
		console.log('ERROR. La imagen "'+ a +'" no se pudo cargar.');
	};
	var r = +new Date;
	imageObj.src = images[a]+'?'+r;
}

var renderPage = () => {
	cards.forEach(card => {
		var cardToRender =  renderCard(card);
		cardGrid.add(cardToRender);
	});
	page.add(cardGrid);
}

var imagesWait = setInterval(function(){
	if(imagesLoaded === imagesCount){
		clearInterval(imagesWait);
		renderPage();
	}
},100);