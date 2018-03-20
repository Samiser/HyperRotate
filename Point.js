function Point(off) {
	this.x = 0;
	this.y = 0;
	this.speed;
	this.start;
	this.lineNoTop = 0;
	this.lineNoBottom = 0;
	this.angle = PI/2;
	this.offset = 0;
	this.oldMillisLineNo = 0;
	
	this.flag = true;
	this.timer = 0;
	
	this.setup = function() {

	}
	
	this.update = function() {
		fill(255);
		this.angleUpdate();
		this.lineUpdate();
		this.draw();
		if (this.lineNoTop == 4 && this.flag){
			this.timer = millis();
			this.flag = false;
		}
	}
	
	this.draw = function() {
		this.x = map(sin(this.angle),
					-1, 1,
					pointX[(this.lineNoTop) % 7],
					pointX[(this.lineNoBottom + 3) % 7]
				)
		this.y = map(sin(this.angle),
					-1, 1,
					pointY[(this.lineNoTop) % 7],
					pointY[(this.lineNoBottom + 3) % 7]
				)
		noStroke();
		ellipse(this.x, this.y, 10);
	}
	
	this.angleUpdate = function() {
		this.angle = PI+PI/2 + this.offset;
		this.offset += 0.0125;
	}
	
	this.lineUpdate = function() {
		if (sin(this.angle) > 0.999 && millis() - this.oldMillisLineNo > 20) {
			this.lineNoTop = this.lineNoBottom;
			this.oldMillisLineNo = millis();
		} else if (sin(this.angle) < -0.999 && millis() - this.oldMillisLineNo > 20) {
			this.lineNoBottom = this.lineNoTop + 1;
			this.oldMillisLineNo = millis();
		}
	}
}