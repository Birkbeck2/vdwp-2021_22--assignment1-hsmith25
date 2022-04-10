var x1 = 0;
var y1 = 0;
var stepSize = 5.0;
let x;
let y;
var font = 'Comic Sans MS';
var letters = "You're getting distracted! Stay focused";
var fontSizeMin = 13;
var angleDistortion = 0.0;

var counter = 0;

//Creating the notes for each key
var notes = [];
notes [0] = new Array ("60", "64", "67", "72"); //C Major
notes [1] = new Array ("62", "66", "69", "74"); //D Major
notes [2] = new Array ("64", "68", "71", "76"); //E Major
notes [3] = new Array ("65", "69", "72", "77"); //F Major
notes [4] = new Array ("67", "71", "74", "79"); //G Major
notes [5] = new Array ("69", "73", "76", "81"); //A Major
notes [6] = new Array ("71", "75", "78", "83"); //B Major
notes [7] = new Array ("72", "76", "79", "84"); //C' Major

let walking;

function setup() {
  createCanvas(displayWidth, 850);
background(random(255), random(255), random(255));

  pos = createVector(x, y);
  prev = pos.copy();
  frameRate (18);
  osc = new p5.TriOsc();
  osc.start();
  osc.amp(0);

walking = new Walker(random(width), random(height));

  cursor(CROSS);

  x1 = mouseX;
  y1 = mouseY;

  textFont(font);
  textAlign(LEFT);


}

//Turning the array into MIDI tones
function playNote(notes, duration) {
  osc.freq(midiToFreq(notes));
  osc.fade(0.5,0.2);

  if (duration) {
    setTimeout(function() {
      osc.fade(0,0.2);
    }, duration-50);
  }
}

function mouseReleased() {
  osc.fade(0,0.5);
}

function draw() {

//Mesmerising circle pattern
push ();
  stroke(random(200), random(200), random(200));
  strokeWeight(random(5));
  noFill();
  translate (width/2, height/2);


for (let i=1; i<4000; i++){
  let expand = i*frameCount/10;
  circle(0,0, random(expand), random(displayWidth));

}
pop ();

//Calling the walker
walking.makeLine ();
walking.drawLine ();

function mousePressed() {
  userStartAudio();
}

//You're getting distracted!
stroke(random(255));
strokeWeight(5);
noFill();
var d = dist(x1, y1, mouseX, mouseY);
textSize(fontSizeMin + d / 2);
var newLetter = letters.charAt(counter);
stepSize = textWidth(newLetter);

if (d > stepSize) {
  var angle = atan2(mouseY - y1, mouseX - x1);

  push();
  translate(x1, y1);
  rotate(angle + random(angleDistortion));
  text(newLetter, 0, 0);
  pop();

  counter++;
  if (counter >= letters.length) counter = 0;

  x1 = x1 + cos(angle) * stepSize;
  y1 = y1 + sin(angle) * stepSize;
}
constrain (width, height)


}



//Play on mouse click
let num = 0;
function mousePressed() {
  //So the audio plays on click on Google Chrome
  if (getAudioContext().state !== 'running') {
getAudioContext().resume();
}
      playNote(random(notes[num]));
    }

//Go up a key every time the spacebar is pressed
function keyPressed() {
  if (keyCode === 32) {
    num++;
    if (num >= 8) {
      num = 0;
    }
  }
}

//Defining the Walker Class

class Walker {
  constructor(x,y) {
    
    this.x = random(width);
    this.y = random(height);
    pos = createVector(x, y);
    prev = pos.copy();

  }


  drawLine () {

    stroke(random(255), random(255), random(255));
    strokeWeight(10);
    noFill();
    line(pos.x, pos.y, prev.x, prev.y);

  }
  makeLine () {
    prev.set(pos);
    let step = p5.Vector.random2D();
    step.setMag(50);
    pos.add(step);
    pos.x = constrain(pos.x, 0, width);
    pos.y = constrain(pos.y, 0, height);
  }


}
