//TODO: Collision detection with the table
//ellipse(displayWidth/2 - table.width/200, displayHeight/2 - table.height/200, 450 ,350);

// Defining sprite variables
let table;
let kill;
let impostor;
let crewmates = []
let distances = []
let closestCrewmate;

// Let random vars
let runCount;

function preload() {
	// Loading all the assets
	table = loadImage('../assets/pngs/caff_table.png')
	kill = loadImage('../assets/pngs/kill.png')
}

function setup() {
	createCanvas(displayWidth, displayHeight);

	// Impostor stuff
	runCount = 1
	impostor = new Impostor(50, displayHeight - 150 , 1, 10)

	// Crewmate stuff
	let colors = ['red', 'brown', 'blue', 'cyan', 'pink', 'purple']
	let links = [
					'www.facebook.com', 
					'www.youtube.com', 
					'www.reddit.com', 
					'www.courses.finki.ukim.mk', 
					'www.netflix.com', 
					'www.wiki.archlinux.org'
				]
	let names = ['Facebook','Youtube','Reddit','Moodle','Netflix','Arch Wiki']

	for(let i = 0; i < 6; i++){
		crewmates.push(new Crewmate(names[i], colors[i], links[i] ,30 + i * 250, 150))
	}
}

function draw() {
	background(7,54,66)
  	image(table, displayWidth/2 - table.width/2, displayHeight/2 - table.height/2);


	// Get closest crewmate & // Draw UI
	closestCrewmate = impostor.getClosestCrewmate(crewmates)
	if(closestCrewmate.dist <= 100){
		push()
		scale(1.5)
		// image(kill, displayWidth - kill.width, displayHeight-kill.height)
		image(kill, displayWidth - kill.width * 5.5, displayHeight-kill.height*4)
		pop()
	}
	else{
		push()
		tint(255, 100);
		scale(1.5)
		// image(kill, displayWidth - kill.width, displayHeight-kill.height)
		image(kill, displayWidth - kill.width * 5.5, displayHeight-kill.height*4)
		pop()
	}

  	// Drawing the crewmates
  	for(let i = 0; i < 6; i++)
  		crewmates[i].show();

  	// Drawing the impostor
  	impostor.move(runCount);
  	if(keyIsPressed)
  		impostor.show(runCount);
  	else
  		impostor.show(0);

  	if(frameCount % 7 == 0){
	  	if(runCount > 3){
	  		runCount = 1
	  	}
	  	else
  			runCount++;
  	}



}