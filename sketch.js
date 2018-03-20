let pointX = [];
let pointY = [];

let rad = 10;
let offset = 0;

let points = [];
let noOfPoints = 0;
let pointLimit = 12;

let oldMillisPoint = 0;

let showStar = true;
let showSquares = true;
let showTriangles = true;

function setup() {
	createCanvas(windowWidth, windowHeight)
	
	if (width > height) {
		rad = height*0.4;
	} else {
		rad = width*0.4;
	}
	
	for (let i = 0; i < pointLimit; i++) {
		points[i] = new Point;
	}
}

function draw() {
	background(51);
	translate(width/2, height/2);
	star();
	triangles();
	squares();
	pointUpdate();
}

function pointUpdate() {
	for (let i = 0; i < noOfPoints; i++) { 
		points[i].update();
	}
	if ((millis() - oldMillisPoint > 7704.28/3.25) && noOfPoints < pointLimit) {
		noOfPoints++;
		oldMillisPoint = millis();
	}
}

function star() {
	let r = []
	let angle = [];
	let angle2 = [];
	offset -= 0.001;
	
	//Updating angles
	for (let i = 0; i < 7; i++) {
		r[i] = rad;
		angle[i] = (TWO_PI / 7) * i;
		angle[i] += offset;
	}
	
	//Converting to polar
	for (let i = 0; i < 7; i++) {
		pointX[i] = r[i] * cos(angle[i]);
		pointY[i] = r[i] * sin(angle[i]);
	}
	
	//Drawing lines
	strokeWeight(1);
	stroke(map(mouseY, 0, height, 100, 51));
	beginShape(LINES)
	for (let i = 0; i < 7; i++) {
		vertex(pointX[i], pointY[i]);
		vertex(pointX[(i+4) % 7], pointY[(i+4) % 7]);
	}
	endShape();
}

function triangles() {
	for (let i = 0; i < 4; i++) {
		noFill();
		strokeWeight(2);
		stroke(map(mouseX, 0, width, 255, 0), map(mouseX, 0, width, 255, 200), map(mouseX, 0, width, 255, 200));
		beginShape()
		for (let j = 0; j < 3; j++) {
			vertex(points[(j*4+i)%12].x, points[(j*4+i)%12].y);
		}
		vertex(points[i].x, points[i].y);
		endShape(CLOSE);
	}
}

function squares() {
	for (let i = 0; i < 3; i++) {
		noFill();
		strokeWeight(2);
		stroke(map(mouseX, 0, width, 255, 200), map(mouseX, 0, width, 255, 200), map(mouseX, 0, width, 255, 0));
		beginShape()
		for (let j = 0; j < 4; j++) {
			vertex(points[(j*3)+i].x, points[(j*3)+i].y);
		}
		endShape(CLOSE);
	}
}