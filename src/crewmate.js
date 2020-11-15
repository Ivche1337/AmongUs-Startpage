class Crewmate{

	constructor(name, color, link, x, y){
		
		// Data attributes
		this.name = name
		this.link = link;
		this.idleSprite = loadImage('../assets/pngs/crewmates/' + color + '_idle.png');
		this.dedSprite = loadImage('../assets/pngs/crewmates/' + color + '_ded.png');
		this.isDed = false;

		// Position attributes
		this.x = x;
		this.y = y;	

	}

	show(){

		if(!this.isDed){
			fill(255);
			textSize(32);
			text(this.name, this.x - 20 , this.y-10);
			image(this.idleSprite, this.x, this.y)
		}
		else	
			image(this.dedSprite, this.x, this.y)
	}
}