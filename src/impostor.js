class Impostor{

	constructor(x, y, dir, speed) {

		// Attributes		
		this.x = x;
		this.y = y;
		this.dir = dir
		this.speed = speed;

		// Sprite loading
		this.sprites = [];
		this.sprites.push(loadImage('../assets/pngs/impostor/impostor_idle.png'));
		for(let i = 1; i < 5; i++){
			this.sprites.push(loadImage('../assets/pngs/impostor/impostor_walk' + i + '.png'));
		}		
	}

	show(i){
		scale(this.dir,1)
		image(this.sprites[i], this.dir*this.x, this.y);
	}

	move(i){
		// console.log(this.x, this.y)

		if(keyIsDown(LEFT_ARROW) || keyIsDown(65)){
			if(this.dir	=== 1){
				this.dir = -1;
				this.x+=this.sprites[i].width;
			}
			if(this.x - this.sprites[i].width > 0)
				this.x -= this.speed;
		}

		if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
			if(this.dir === -1){
				this.dir = 1;
				this.x-=this.sprites[i].width;
			}
			if(this.x + this.sprites[i].width < displayWidth)
				this.x += this.speed;
		}

		if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
			if(this.y > 0)
				this.y -= this.speed;
		}

		if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
			if(this.y + this.sprites[i].height < displayHeight)
				this.y += this.speed;
		}
	}

	getClosestCrewmate(crewmates){
		let distances = []
		let min = 0;

		// Compute distance to every crewmate
  		for(let i = 0; i < crewmates.length; i++){
			distances[i] = dist(crewmates[i].x, crewmates[i].y, this.x, this.y);
			if(distances[i] < distances[min])
				min = i;
		}
		return {'index':min, 'dist':distances[min]}
	}

	// GETTERS
	getSprite(i){
		return this.sprites[i];
	}

}