var d = 8;
var n = 5;
var offset = 1;
var mapRange = 3;
var sliderD;
var sliderN;
var angle = 0;

var oldMillis = 0;
var counter = 0;

var colour = [255, 0, 0];
var ascending = [false, false, false];

function setup() {
	createCanvas(windowWidth, windowHeight);
	sliderD = createSlider(1, 4, 1, 0.1);
	sliderN = createSlider(1, 6, 3, 0.1);
}

function draw() {
	offset = sliderD.value();
	mapRange = sliderN.value();
	k = n / d;
	background(255 - colour[0], 255 - colour[1], 255 - colour[2]);
	translate(width/2, height/2);
	
	//showInfo();
	
	n = map(sin(angle), 1, -1, mapRange, 1);
	d = n + offset;
	
	colourChangeBreathe();
	
	beginShape();
	stroke(colour[0], colour[1], colour[2]);
	noFill();
	strokeWeight(5);
	for (let a = 0; a < TWO_PI * d; a += 0.01) {
		let r = map(sin(angle), 1, -1, 500, 200) * cos(k * a);
		let x = r * cos(a);
		let y = r * sin(a);
		vertex(x, y);
	}
	endShape();
	
	angle += 0.02;
}

function showInfo() {
	textSize(50);
	text("k = " + round(n*10)/10 + "/" + round(d*10)/10, -width/2.5, -height/2.5 + 60);
	text(counter, -width/2.5, -height/2.5);
}

function colourChangeBreathe() {
	var colourVal = map(sin(angle), 1, -1, 255, 0);
	if (colourVal > 254 || colourVal < 1) {
		if ((millis() - oldMillis) > 500) {
			if (counter < 5) {
				counter++;
			} else {
				counter = 0;
			}
			oldMillis = millis();
		}
	}
	
	
	switch(counter) {
		case 0:
			colour[2] = colourVal; //Blue up
			break;
		case 1:
			colour[0] = colourVal; //Red down
			break;
		case 2:
			colour[1] = colourVal; //Green up
			break;
		case 3:
			colour[2] = colourVal; //Blue down
			break;
		case 4:
			colour[0] = colourVal; //Red up
			break;
		case 5:
			colour[1] = colourVal; //Green down
			break;
	}
}