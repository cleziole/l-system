//Based on the L-System implementation by Daniel Shiffman

var drop;
var axiom = "F";
var sentence = axiom;
var len = 100;
var angle;
var windFactor = 10;
var d = 0;
var width = 300;
var height = 300;

var rules = [];


rules[0] = {
  a: "F",
  b: "FF+[+F-F+F]G[-F+F+F]"
 // b: "FF+[+F-F+F]G[-F+F+F]"
}

function generate(){
  len *= 0.45;
  var nextSentence = "";
  for(var i = 0; i < sentence.length; i++){
    var current = sentence.charAt(i);
    var found = false;
    for(j = 0; j < rules.length; j++){
      if(current == rules[j].a){
        nextSentence += rules[j].b;
        found = true;
        break;
      }
    }
    if(!found)
      nextSentence += current;
  }
  sentence = nextSentence;
}

function turtle(){
  //background(51);
  resetMatrix();
  translate(width/2, height);
  //stroke(255);
  strokeWeight(1);

  for(var i = 0; i < sentence.length; i++){
    var current = sentence.charAt(i);

    if(current == "F"){
      line(0,0,0,-len);
      translate(0,-len);
    } else if (current == "+"){
      rotate(angle*windFactor);
    } else if (current == "-"){
      rotate(-angle+windFactor/10);
    } else if(current == "G"){
      rotate(-angle*windFactor);
    } else if(current == "["){
      push();
    } else if (current == "]"){
      pop();
    }
  }
}

function clearCanvas(){
  angle = radians(10);
  //createCanvas(300, 300);
   var canvas = createCanvas(100, 100);

  translate(width/2, height);
  len = 100;
  sentence = axiom;

  canvas.parent('sketch-holder');
}

function setup() {
  clearCanvas();
  frameRate(60);
}

function draw(){
  clearCanvas();
  for(var i = 0; i < 3; i++){
    generate();
  }
  turtle();
  windFactor = 1+cos(d)/20;
  d+=noise(d)/8;
}
