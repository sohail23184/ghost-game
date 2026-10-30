let ghosts = [];
let bats = [];
let tombstones = [];
let score = 0;
let missed = 0;
let state = 'start';
let spawnTimer = 0;
let spawnInterval = 75;

function setup() {
createCanvas(480, 360);
textFont('Courier New');
for(let i=0;i<5;i++){
tombstones.push({x: 50 + i * 90, y: 310, w: 40, h: 50});
}
for(let i=0;i<3;i++){
bats.push({x: random(width), y: random(40, 150), speed: random(1, 2.5)});
}
}

function draw() {
background(15, 10, 25);
noStroke();
fill(180, 20, 20);
ellipse(380, 70, 80, 80);
fill(200, 30, 30, 40);
ellipse(380, 70, 100, 100);

for(let i=0;i<bats.length;i++){
let b = bats[i];
b.x += b.speed;
if(b.x > width + 20) b.x = -20;
fill(20);
ellipse(b.x, b.y, 16, 10);
triangle(b.x, b.y, b.x - 12, b.y - 8, b.x - 4, b.y + 2);
triangle(b.x, b.y, b.x + 12, b.y - 8, b.x + 4, b.y + 2);
}

fill(25, 40, 25);
rect(0, 310, width, 50);

for(let i=0;i<tombstones.length;i++){
let t = tombstones[i];
fill(80, 85, 90);
rect(t.x, t.y, t.w, t.h, 10, 10, 0, 0);
fill(50, 55, 60);
rect(t.x - 4, t.y + t.h - 8, t.w + 8, 8);
fill(40);
rect(t.x + 16, t.y + 12, 8, 22);
rect(t.x + 9, t.y + 18, 22, 7);
}

if(state === 'start'){
textAlign(CENTER, CENTER);
fill(255, 200, 200);
textSize(24);
text('Ghost Wobble Hunt', width / 2, height / 2 - 25);
textSize(15);
fill(220);
text('Catch the wobbling ghosts before they escape!\nIf 5 ghosts escape before you catch 4,\nit is game over.\n\nClick to start', width / 2, height / 2 + 25);
return;
}

if(state === 'over'){
textAlign(CENTER, CENTER);
fill(255, 60, 60);
textSize(26);
text('Game Over', width / 2, height / 2 - 30);
textSize(18);
fill(255);
text('Score: ' + score, width / 2, height / 2 + 5);
textSize(14);
fill(200);
text('Click to retry', width / 2, height / 2 + 40);
return;
}

spawnTimer++;
if(spawnTimer >= spawnInterval){
spawnTimer = 0;
ghosts.push({
x: random(40, width - 40),
y: random(40, height - 90),
alpha: 0,
wobbleSpeed: random(0.08, 0.2),
wobbleAmount: random(5, 15),
timer: 0});
if(spawnInterval > 30){
spawnInterval -= 2}}

for(let i = ghosts.length - 1; i >= 0; i--){
let g = ghosts[i];
g.timer++;

if(g.alpha < 255){
g.alpha += 4;}

let currentWobble = sin(g.timer * g.wobbleSpeed) * g.wobbleAmount;
let drawX = g.x + currentWobble;
let drawY = g.y + cos(g.timer * g.wobbleSpeed) * 3;
drawGhost(drawX, drawY, g.alpha);
if(g.timer > 140){
ghosts.splice(i, 1);
missed++;
if(missed >= 5){
state = 'over';}}}

textAlign(LEFT, TOP);
fill(255);
textSize(16);
text('Score: ' + score, 16, 16);
textAlign(RIGHT, TOP);
text('Missed: ' + missed + '/5', width - 16, 16);}
function mousePressed() {
if(state === 'start' || state === 'over'){
state = 'play';
score = 0;
missed = 0;
ghosts = [];
spawnTimer = 0;
spawnInterval = 75;
return;}
for(let i = ghosts.length - 1; i >= 0; i--){
let g = ghosts[i];
let currentWobble = sin(g.timer * g.wobbleSpeed) * g.wobbleAmount;
let drawX = g.x + currentWobble;
let drawY = g.y + cos(g.timer * g.wobbleSpeed) * 3;
if(dist(mouseX, mouseY, drawX, drawY) < 30){
score++;
ghosts.splice(i, 1);
break;}}}

function drawGhost(x, y, a) {
noStroke();
fill(200, 255, 220, a);
ellipse(x, y, 50, 50);
fill(20, a);
ellipse(x - 10, y - 5, 8);
ellipse(x + 10, y - 5, 8);}