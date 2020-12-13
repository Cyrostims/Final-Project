var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//ctx = context
var ctx = canvas.getContext('2d');

//rectangle
// canvas.fillStyle = "#393893";
// ctx.fillRect(10, 10, 125, 125);

//line
// ctx.beginPath();
// ctx.moveTo(50, 50);
// ctx.lineTo(250, 250);
// ctx.strokeStyle = "#BC955C";
// ctx.stroke();

// Arc / Circle
// ctx.beginPath();
// ctx.arc(300, 300, 30, 0, Math.PI * 2, false);
// ctx.strokeStyle = 'red';
// ctx.stroke();

// for (var i = 0; i < 9; i++) {
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     var ranColour = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
//     ctx.beginPath();
//     ctx.arc(x, y, 30, 0, Math.PI * 2, false);
//     ctx.strokeStyle = ranColour;
//     ctx.stroke();
// }
var mouse = {
    x: undefined,
    y: undefined
}

var mouseDis = 150;
var maxRadius = 100;
var minRadius = 10;

var gravity = 1;
var friction = 0.99;

var circleAmount = 100;
var maxRadius = 100;
var minRadius = 10;

var circleArray = [];
var colourArray = [
    '#010A26',
    '#F2490C',
    '#F26835',
    '#BFBFBF',
    '#595959',
];


window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;

})

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
})

function Circle(x, y, vx, vy, radius, ranColour) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    this.minRadius = radius;
    this.ranColour = ranColour;
    this.arrayColour = colourArray[Math.floor(Math.random() * colourArray.length)];

    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // ctx.strokeStyle = this.ranColour;
        // ctx.stroke();
        // ctx.fillStyle = this.ranColour;
        // ctx.fill();
        ctx.strokeStyle = this.arrayColour;
        ctx.stroke();
        ctx.fillStyle = this.arrayColour;
        ctx.fill();
    }

    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius <= 0) {
            this.vx = -this.vx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius <= 0) {
            this.vy = -this.vy * friction;
        } else {
            this.vy += gravity;
        }
        this.x += this.vx;
        this.y += this.vy;

        //interactivity
        if ((mouse.x - this.x < mouseDis && mouse.x - this.x > -mouseDis) && (mouse.y - this.y < mouseDis && mouse.y - this.y > -mouseDis)) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
            if (this.y - mouse.y > 0 && (mouse.y - this.y < mouseDis && mouse.y - this.y > -mouseDis)) {
                this.vy += -3;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }
}

function init() {
    circleArray = [];
    for (var i = 0; i < circleAmount; i++) {
        var x = Math.random() * (window.innerWidth - radius * 2) + radius;
        var y = Math.random() * (window.innerHeight - radius * 2) + radius;
        var vx = (Math.random() - 0.5) * 10;
        var vy = (Math.random() - 0.5) * 5;
        //var vy = 1;
        var radius = Math.random() * 30 + 5;
        var ranColour = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);

        circleArray.push(new Circle(x, y, vx, vy, radius, ranColour));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

animate();

init();

document.body.style.background = 'url(' + c.toDataURL() + ')';