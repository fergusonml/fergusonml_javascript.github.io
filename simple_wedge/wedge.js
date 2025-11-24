var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d'); 

//var radius = 1;
var color = "#fff000";
var x = 0;
var y = 0;
var X = 0;
var Z = 0;

var theta=17/180*Math.PI
var alpha=Math.tan(theta)
var chi=(1-alpha**2)/(1+alpha**2)**2

 
window.onload = init; 
 
function init() {
  setInterval(onEachStep,1); // 60 fps
};

document.addEventListener("click", (event) => {
    X = 2*(event.clientX/canvas.width-0.5)/Math.cos(theta);
    Z = (1-event.clientY/canvas.height)/Math.sin(theta)**2;
    console.log(`Mouse X: ${X}, Mouse Y: ${Z}`);
});

document.addEventListener("click", changeBground);
let index = 0;
const colors = {
  red: "#FF0000",
  orange: "#FF7F00",
  yellow: "FFFF00",
  green: "#00FF00",
  aqua: "#00FFFF",
  blue: "#0000FF",
  purple: "#8B00FF",
};

function changeBground() {
  const keys = Object.keys(colors);
  //document.body.style.backgroundColor = colors[keys[index]];
  color = colors[keys[index]];
  index = index < keys.length - 1 ? index + 1 : 0;
} 
function onEachStep() {
  [X,Z]=T(X,Z);
  draw_point(); // draw the ball
};
 
function draw_point() {
    with (context){
		x=0.5*(X*Math.cos(theta)+1)*canvas.width;
		y=(1-Z*Math.sin(theta)**2)*canvas.height;
        fillStyle = color;
        beginPath();
		fillRect(x, y, 1, 1); // fillRect is supposted to be faster than arc
        closePath();
        fill();
    };
};

function T(X,Z) {
	var X,Y,Z;
	var X1,Y1,Z1;
	Y=Math.sqrt(Z);
	function f(X,Y) {
		var X,Y;
		return ((X-2*Y)*Math.cos(theta))**2+(Y*Math.sin(theta))**2
	};
	if (f(X,Y)<=1){
		Y1=Y;
		X1=X-2*Y;
		Z1=Y1**2;
		return [X1,Z1];
	} else {
		Y1=Math.sqrt(2+2*chi*(Y-X)**2-Y**2);
		X1=Y-X-Y1;
		Z1=Y1**2;
		return [X1,Z1];
	};
};
