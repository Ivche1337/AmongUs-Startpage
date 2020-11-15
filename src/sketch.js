//TODO: Collision detection with the table
//		MAYBE REPORT BUTTON

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
	impostor = new Impostor(50, displayHeight - 150 , 1, 5)

	// Crewmate stuff
	let colors = ['red', 'brown', 'blue', 'cyan', 'pink', 'purple']
	let links = [
					'https://www.facebook.com', 
					'https://www.youtube.com', 
					'https://www.reddit.com', 
					'https://courses.finki.ukim.mk/', 
					'https://www.netflix.com', 
					'https://wiki.archlinux.org'
				]
	let names = ['Facebook','Youtube','Reddit','Moodle','Netflix','Arch Wiki']

	let inc = TWO_PI / -10.0;
	let a = 0;
	for(let i = 0; i < 6; i++){
		crewmates.push(new Crewmate(names[i], colors[i], links[i] ,i * 170 + 250, 300 + (sin(a) * 180.0)));
		a = a + inc;
	}
}

function draw() {
	background(7,54,66)
	// ellipse(displayWidth/2 - table.width/200, displayHeight/2 - table.height/200, 450 ,350);
  	image(table, displayWidth/2 - table.width/2, displayHeight/2 - table.height/2);

	// Get closest crewmate & 
	// Draw and UI
	kill_x = displayWidth - kill.width - 30
	kill_y = displayHeight-kill.height - 30
	closestCrewmate = impostor.getClosestCrewmate(crewmates);

	// Kill button logic
	if(closestCrewmate.dist <= 100 && !crewmates[closestCrewmate.index].isDed){
		push()
		image(kill, kill_x, kill_y)
		pop()
		//Kill button logic
		let mouseOverKill = isInsideRect(kill_x, kill_y, kill_x+200, kill_y+200, mouseX, mouseY);
		if(mouseOverKill && mouseIsPressed){
			crewmates[closestCrewmate.index].isDed = true;
			window.location.replace(crewmates[closestCrewmate.index].link);
		}
	}
	else{
		push()
		tint(255, 100);
		image(kill, kill_x, kill_y)
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

function isInsideRect(x1, y1, x2, y2, px, py){
	return px >= x1 && px <= x2 && py >= y1 && py <= y2; 
}

function mouseClicked() {
  if (value === 0) {
    value = 255;
  } else {
    value = 0;
  }
}