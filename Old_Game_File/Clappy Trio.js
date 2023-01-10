let Start = true;
let Pause = true;
let Auto = true;
let TXT = true;
let canvas;
let ctx;
let sfx = 0;
let score = 0;
let order = 0;
let frame = 0;
let Fast = false;
let Wrong = false;

canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 896;
canvas.height = 504;
document.body.appendChild(canvas);
let BG, W, H1, H2, H3, H4, H5, B0_1, B0_2, B1, B2, B3, B4, B5, F1, F2, F3, F4, T, G;

let Title_music_parseInt = 0;

let is_A_press = false;
let T1P = 1;
let T1X = 229;
let ClapFrame1 = 0;
let T2P = 1;
let ClapFrame2 = 0;
let T2X = 397;
let T3P = 1;
let T3X = 565;
let TriosY = 268;
let Shake = 0;

let Trio1_ClapFrame = 0;
let Trio2_ClapFrame = 0;
let Trio3_ClapFrame = 0;

let T1AC = true;
let T2AC = false;
let T3AC = false;

let TrioReady = [ 45, 420, 725, 860, 1045, 1249, 1340, 1570, 1650, 1860, 1955, 2110, 2224];
let Trio1Clap = [120, 460, 765, 900, 1080, 1267, 1380, 1590, 1690, 1880, 1995, 2130, 2301];
let Trio2Clap = [195, 500, 805, 920, 1115, 1285, 1420, 1610, 1730, 1900, 2035, 2150, 2378];
let Trio3Clap = [270, 540, 845, 940, 1150, 1303, 1460, 1630, 1770, 1920, 2075, 2170, 2455];
let Trio3ClapTAD = [];
					
console.log("The Console");

function loadAudio(){
	Title_music = new Audio();
    Title_music.src = "audios/Title_music.mp3";
	Title_music.volume = 0.75;
	Sop = new Audio();
    Sop.src = "audios/Sop.wav";
	Sop.volume = 0.25;
	Clap1 = new Audio();
    Clap1.src = "audios/Clap (1).wav";
	Clap1.volume = 1;
	Clap2 = new Audio();
    Clap2.src = "audios/Clap (2).wav";
	Clap2.volume = 1;
	Clap3 = new Audio();
    Clap3.src = "audios/Clap (3).wav";
	Clap3.volume = 1;
}

function loadImage() {
	BG = new Image();
    BG.src = "images/BG.png";
	W = new Image();
    W.src = "images/W.png";
	H1 = new Image();
    H1.src = "images/H1.png";
	H2 = new Image();
    H2.src = "images/H2.png";
	H3 = new Image();
    H3.src = "images/H3.png";
	H4 = new Image();
    H4.src = "images/H4.png";
	H5 = new Image();
    H5.src = "images/H5.png";
	B0_1 = new Image();
    B0_1.src = "images/B0_1.png";
	B0_2 = new Image();
    B0_2.src = "images/B0_2.png";
	B1 = new Image();
    B1.src = "images/B1.png";
	B2 = new Image();
    B2.src = "images/B2.png";
	B3 = new Image();
    B3.src = "images/B3.png";
	B4 = new Image();
    B4.src = "images/B4.png";
	B5 = new Image();
    B5.src = "images/B5.png";
	F1 = new Image();
    F1.src = "images/F1.png";
	F2 = new Image();
    F2.src = "images/F2.png";
	F3 = new Image();
    F3.src = "images/F3.png";
	F4 = new Image();
    F4.src = "images/F4.png";
	T = new Image();
    T.src = "images/T.png";
	G = new Image();
    G.src = "images/G.png";
}
	
let keysDown = {};
function setKeyboardListener() {
    document.addEventListener("keydown", function (event) {
        keysDown[event.keyCode] = true;
    });
    document.addEventListener("keyup", function (event) {
        delete keysDown[event.keyCode];

		if(event.keyCode == 13){
			Start = false;
			//Sop.play();
			//T1P = 5;
			//T2P = 5;
			//T3P = 5;
			
			//T1AC = false;
			//T2AC = false;
		}

		if(event.keyCode == 74){
			is_A_press = false;
			T3AC = false;
		}

		if(event.keyCode == 49){
			console.log("1, ", frame);
		}
		if(event.keyCode == 50){
			console.log("2, ", frame);
		
		}
		if(event.keyCode == 51){
			console.log("3, ", frame);
		}
		//console.log(event.keyCode);
    });
}

function TTC(){	
	//console.log(frame);

	for(let i = 0; i < TrioReady.length; i++){
		if(frame == TrioReady[i]){
			if(T1AC){
				Sop.play();
				T1P = 1;
				T2P = 1;
				T3P = 1;

				T1AC = false;
				T2AC = false;
				T3AC = false;
			}
		}
	}
	
	for(let i = 0; i < Trio1Clap.length; i++){
		if(frame == Trio1Clap[i]){
			if(!T1AC){
				T1P = 2;
			}
		}
	}

	for(let i = 0; i < Trio2Clap.length; i++){
		if(frame == Trio2Clap[i]){
			if(!T2AC){
				T2P = 2;
			}
		}
	}

	if(Auto){
		for(let i = 0; i < Trio3Clap.length; i++){
			if(frame == Trio3Clap[i]){
				if(!T3AC){
					T3P = 2;
				}
			}
		}
	}
}

function update() {
	if(frame == 0 && Title_music.currentTime == 0 || frame != 0 && !Title_music.ended){
		frame++;
	}

	TTC();

    if(74 in keysDown){
		if(!is_A_press){
			Trio3ClapTAD.push(frame);
			T3P = 2;
		}
		
        is_A_press = true;		
	}

	Shake++;
	
	if(T1P >= 2 && T1P <= 3){
		Trio1_ClapFrame++;

		if(Trio1_ClapFrame >= 5){
			T1P++;
			Trio1_ClapFrame = 0;
		}
	}

	if(T2P >= 2 && T2P <= 3){
		Trio2_ClapFrame++;

		if(Trio2_ClapFrame >= 5){
			T2P++;
			Trio2_ClapFrame = 0;
		}
	}
	
	if(T3P >= 2 && T3P <= 3){
		Trio3_ClapFrame++;

		if(Trio3_ClapFrame >= 5){
			T3P++;
			Trio3_ClapFrame = 0;
		}
	}

	if(T1P >= 5 && T1P <= 20){
		if(Shake >= 2){
			if(T1P < 20){
				T1P++;
			}else{
				T1P = 5;
			}
		}
	}

	if(T2P >= 5 && T2P <= 20){
		if(Shake >= 2){
			if(T2P < 20){
				T2P++;
			}else{
				T2P = 5;
			}
		}
	}
	
	if(T3P >= 5 && T3P <= 20){
		if(Shake >= 2){
			if(T3P < 20){
				T3P++;
			}else{
				T3P = 5;
			}
		}
	}

	if(Shake >= 2){
		Shake = 0;
	}

	//score
}

function Trio1() {
	if(T1P == 1) {
		ctx.drawImage(G, T1X + 7, TriosY + 136);
		ctx.drawImage(F4, T1X + 19, TriosY + 118);
		ctx.drawImage(B0_1, T1X - 4, TriosY + 64);
		if(!Fast){
			ctx.drawImage(H1, T1X + 13, TriosY + 46);
		}else{
			ctx.drawImage(H5, T1X + 13, TriosY + 46);
		}
		ctx.drawImage(W, T1X, TriosY + 20);
		ctx.drawImage(B2, T1X - 7, TriosY + 62);
	}
	if(T1P == 2) {
		if(!T1AC){
			Clap1.pause();
			Clap1.currentTime = 0;
			Clap1.play();
			T1AC = true;
		}
			
		ctx.drawImage(G, T1X + 7, TriosY + 136);
		ctx.drawImage(F1, T1X + 19, TriosY + 104);
		ctx.drawImage(B0_2, T1X + 8, TriosY + 4);
		ctx.drawImage(H3, T1X + 13, TriosY + 32);
		ctx.drawImage(W, T1X, TriosY + 10);
		ctx.drawImage(B3, T1X + 8, TriosY - 30);
	}
	if(T1P == 3) {
		ctx.drawImage(G, T1X + 7, TriosY + 136);
		ctx.drawImage(F1, T1X + 19, TriosY + 104);
		ctx.drawImage(B0_2, T1X + 8, TriosY + 4);
		ctx.drawImage(H3, T1X + 13, TriosY + 32);
		ctx.drawImage(W, T1X, TriosY + 8);
		ctx.drawImage(B4, T1X + 8, TriosY - 18);
	}
	if(T1P == 4) {
		ctx.drawImage(G, T1X + 7, TriosY + 136);
		ctx.drawImage(F2, T1X + 19, TriosY + 116);
		ctx.drawImage(B0_2, T1X + 8, TriosY + 16);
		ctx.drawImage(H3, T1X + 13, TriosY + 44);
		ctx.drawImage(W, T1X, TriosY + 18);
		ctx.drawImage(B5, T1X + 8, TriosY + 16);
	}
	if(T1P >= 5 && T1P <= 9 || T1P >= 17) {
		ctx.drawImage(G, T1X + 7, TriosY + 136);
		ctx.drawImage(F2, T1X + 19, TriosY + 116);
		ctx.drawImage(B0_1, T1X - 4, TriosY + 64);
		if(Wrong){
			ctx.drawImage(H2, T1X + 13, TriosY + 46);
		}else{
			ctx.drawImage(H4, T1X + 13, TriosY + 46);
		}
		ctx.drawImage(W, T1X, TriosY + 18);
		ctx.drawImage(B1, T1X - 5, TriosY + 62);
	}
	if(T1P == 10 || T1P == 16) {
		ctx.drawImage(G, T1X + 7, TriosY + 136);
		ctx.drawImage(F3, T1X + 19, TriosY + 116);
		ctx.drawImage(B0_1, T1X - 4, TriosY + 64);
		if(Wrong){
			ctx.drawImage(H2, T1X + 13, TriosY + 46);
		}else{
			ctx.drawImage(H4, T1X + 13, TriosY + 46);
		}
		ctx.drawImage(W, T1X, TriosY + 18 + 2);
		ctx.drawImage(B1, T1X - 5, TriosY + 62);
	}
	if(T1P >= 11 && T1P <= 15) {
		ctx.drawImage(G, T1X + 7, TriosY + 136);
		ctx.drawImage(F4, T1X + 19, TriosY + 116 + 2);
		ctx.drawImage(B0_1, T1X - 4, TriosY + 64 + 2);
		if(Wrong){
			ctx.drawImage(H2, T1X + 13, TriosY + 46 + 2);
		}else{
			ctx.drawImage(H4, T1X + 13, TriosY + 46 + 2);
		}
		ctx.drawImage(W, T1X, TriosY + 18 + 4);
		ctx.drawImage(B2, T1X - 7, TriosY + 62 + 2);
	}
}

function Trio2() {
if(T2P == 1) {
		ctx.drawImage(G, T2X + 7, TriosY + 136);
		ctx.drawImage(F4, T2X + 19, TriosY + 118);
		ctx.drawImage(B0_1, T2X - 4, TriosY + 64);
		if(!Fast){
			ctx.drawImage(H1, T2X + 13, TriosY + 46);
		}else{
			ctx.drawImage(H5, T2X + 13, TriosY + 46);
		}
		ctx.drawImage(W, T2X, TriosY + 20);
		ctx.drawImage(B2, T2X - 7, TriosY + 62);
	}
	if(T2P == 2) {
		if(!T2AC){
			Clap2.pause();
			Clap2.currentTime = 0;
			Clap2.play();
				T2AC = true;
		}
			
		ctx.drawImage(G, T2X + 7, TriosY + 136);
		ctx.drawImage(F1, T2X + 19, TriosY + 104);
		ctx.drawImage(B0_2, T2X + 8, TriosY + 4);
		ctx.drawImage(H3, T2X + 13, TriosY + 32);
		ctx.drawImage(W, T2X, TriosY + 10);
		ctx.drawImage(B3, T2X + 8, TriosY - 30);
	}
	if(T2P == 3) {
		ctx.drawImage(G, T2X + 7, TriosY + 136);
		ctx.drawImage(F1, T2X + 19, TriosY + 104);
		ctx.drawImage(B0_2, T2X + 8, TriosY + 4);
		ctx.drawImage(H3, T2X + 13, TriosY + 32);
		ctx.drawImage(W, T2X, TriosY + 8);
		ctx.drawImage(B4, T2X + 8, TriosY - 18);
	}
	if(T2P == 4) {
		ctx.drawImage(G, T2X + 7, TriosY + 136);
		ctx.drawImage(F2, T2X + 19, TriosY + 116);
		ctx.drawImage(B0_2, T2X + 8, TriosY + 16);
		ctx.drawImage(H3, T2X + 13, TriosY + 44);
		ctx.drawImage(W, T2X, TriosY + 18);
		ctx.drawImage(B5, T2X + 8, TriosY + 16);
	}
	if(T2P >= 5 && T2P <= 9 || T2P >= 17) {
		ctx.drawImage(G, T2X + 7, TriosY + 136);
		ctx.drawImage(F2, T2X + 19, TriosY + 116);
		ctx.drawImage(B0_1, T2X - 4, TriosY + 64);
		if(Wrong){
			ctx.drawImage(H2, T2X + 13, TriosY + 46);
		}else{
			ctx.drawImage(H4, T2X + 13, TriosY + 46);
		}
		ctx.drawImage(W, T2X, TriosY + 18);
		ctx.drawImage(B1, T2X - 5, TriosY + 62);
	}
	if(T2P == 10 || T2P == 16) {
		ctx.drawImage(G, T2X + 7, TriosY + 136);
		ctx.drawImage(F3, T2X + 19, TriosY + 116);
		ctx.drawImage(B0_1, T2X - 4, TriosY + 64);
		if(Wrong){
			ctx.drawImage(H2, T2X + 13, TriosY + 46);
		}else{
			ctx.drawImage(H4, T2X + 13, TriosY + 46);
		}
		ctx.drawImage(W, T2X, TriosY + 18 + 2);
		ctx.drawImage(B1, T2X - 5, TriosY + 62);
	}
	if(T2P >= 11 && T2P <= 15) {
		ctx.drawImage(G, T2X + 7, TriosY + 136);
		ctx.drawImage(F4, T2X + 19, TriosY + 116 + 2);
		ctx.drawImage(B0_1, T2X - 4, TriosY + 64 + 2);
		if(Wrong){
			ctx.drawImage(H2, T2X + 13, TriosY + 46 + 2);
		}else{
			ctx.drawImage(H4, T2X + 13, TriosY + 46 + 2);
		}
		ctx.drawImage(W, T2X, TriosY + 18 + 4);
		ctx.drawImage(B2, T2X - 7, TriosY + 62 + 2);
	}
}

function Trio3() {
	if(T3P == 1) {
		ctx.drawImage(G, T3X + 7, TriosY + 136);
		ctx.drawImage(F4, T3X + 19, TriosY + 118);
		ctx.drawImage(B0_1, T3X - 4, TriosY + 64);
		if(!Fast){
			ctx.drawImage(H1, T3X + 13, TriosY + 46);
		}else{
			ctx.drawImage(H5, T3X + 13, TriosY + 46);
		}
		ctx.drawImage(W, T3X, TriosY + 20);
		ctx.drawImage(B2, T3X - 7, TriosY + 62);
	}
	if(T3P == 2) {
		if(!T3AC){
			Clap3.pause();
			Clap3.currentTime = 0;
			Clap3.play();
				T3AC = true;
		}
			
		ctx.drawImage(G, T3X + 7, TriosY + 136);
		ctx.drawImage(F1, T3X + 19, TriosY + 104);
		ctx.drawImage(B0_2, T3X + 8, TriosY + 4);
		ctx.drawImage(H3, T3X + 13, TriosY + 32);
		ctx.drawImage(W, T3X, TriosY + 10);
		ctx.drawImage(B3, T3X + 8, TriosY - 30);
	}
	if(T3P == 3) {
		ctx.drawImage(G, T3X + 7, TriosY + 136);
		ctx.drawImage(F1, T3X + 19, TriosY + 104);
		ctx.drawImage(B0_2, T3X + 8, TriosY + 4);
		ctx.drawImage(H3, T3X + 13, TriosY + 32);
		ctx.drawImage(W, T3X, TriosY + 8);
		ctx.drawImage(B4, T3X + 8, TriosY - 18);
	}
	if(T3P == 4) {
		ctx.drawImage(G, T3X + 7, TriosY + 136);
		ctx.drawImage(F2, T3X + 19, TriosY + 116);
		ctx.drawImage(B0_2, T3X + 8, TriosY + 16);
		ctx.drawImage(H3, T3X + 13, TriosY + 44);
		ctx.drawImage(W, T3X, TriosY + 18);
		ctx.drawImage(B5, T3X + 8, TriosY + 16);
	}
	if(T3P >= 5 && T3P <= 9 || T3P >= 17) {
		ctx.drawImage(G, T3X + 7, TriosY + 136);
		ctx.drawImage(F2, T3X + 19, TriosY + 116);
		ctx.drawImage(B0_1, T3X - 4, TriosY + 64);
		if(Wrong){
			ctx.drawImage(H1, T3X + 13, TriosY + 46);
		}else{
			ctx.drawImage(H4, T3X + 13, TriosY + 46);
		}
		ctx.drawImage(W, T3X, TriosY + 18);
		ctx.drawImage(B1, T3X - 5, TriosY + 62);
	}
	if(T3P == 10 || T3P == 16) {
		ctx.drawImage(G, T3X + 7, TriosY + 136);
		ctx.drawImage(F3, T3X + 19, TriosY + 116);
		ctx.drawImage(B0_1, T3X - 4, TriosY + 64);
		if(Wrong){
			ctx.drawImage(H1, T3X + 13, TriosY + 46);
		}else{
			ctx.drawImage(H4, T3X + 13, TriosY + 46);
		}
		ctx.drawImage(W, T3X, TriosY + 18 + 2);
		ctx.drawImage(B1, T3X - 5, TriosY + 62);
	}
	if(T3P >= 11 && T3P <= 15) {
		ctx.drawImage(G, T3X + 7, TriosY + 136);
		ctx.drawImage(F4, T3X + 19, TriosY + 116 + 2);
		ctx.drawImage(B0_1, T3X - 4, TriosY + 64 + 2);
		if(Wrong){
			ctx.drawImage(H1, T3X + 13, TriosY + 46 + 2);
		}else{
			ctx.drawImage(H4, T3X + 13, TriosY + 46 + 2);
		}
		ctx.drawImage(W, T3X, TriosY + 18 + 4);
		ctx.drawImage(B2, T3X - 7, TriosY + 62 + 2);
	}
}
		
function render() {
	Trio1();
	Trio2();
	Trio3();

	if(TXT){
		ctx.fillStyle = "black";
		ctx.font = "64px VT323";
		ctx.fillText(`${frame}`, 10, 50);
		ctx.fillText(`${score / order}`, 10, 100);
	}
}

function main() {
    if(Start){
		
	}else{
		if(Title_music.currentTime == 0){
	        Title_music.play();
		}
		
		ctx.drawImage(BG, 0, 0);

		update();
		
		render();
	}
    requestAnimationFrame(main);
}

loadAudio();
loadImage();
setKeyboardListener();
main();

//sound
//currentTime, pause, play

//txt
//ctx.fillStyle = "white";
//ctx.font = "64px VT323";
//ctx.fillText(`...`, ..., ...);
