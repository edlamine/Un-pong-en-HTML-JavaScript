"use strict"
document.addEventListener('DOMContentLoaded',init);

class Ball {
    constructor() {
        this.id = "ball";
        this.x = 0;
        this.y = 0;
        this.vx = 30;
        this.vy = 30;
        this.width = 64;
        this.height = 64;
    }
}

class Paddle{
    constructor(id){
        this.id= id;
        this.up = false; 
        this.down = true; 
        this.x = 0;
        this.y = 0;
        this.py = 10;
        this.width = 24;
        this.height = 192;
    }
}

function place_objects(objects) {
    for(let object of objects) {
        let element = document.getElementById(object.id);
        element.style.left = object.x + "px";
        element.style.top = object.y + "px";
    }
}

let score1 = 0;
let score2 = 0;

function update() {
    let myVar =  document.body.getBoundingClientRect();
    if (ball.x < 0 || ball.x >= myVar.width - ball.width){
        ball.vx = - ball.vx;
    }

    if (ball.y < 0 || ball.y >= myVar.height - ball.height){
        ball.vy = - ball.vy;
    }

    ball.x += ball.vx;
    ball.y += ball.vy;

    place_objects([ball]);

    paddle1.x = 0;
    paddle2.x = myVar.width - paddle2.width;

    if(paddle1.y <= 0){
        paddle1.y = 0;
        buttons.p1_up = false;
        buttons.p1_down = true;
    }

    if(paddle1.y >= myVar.height - paddle1.height){
        paddle1.y = myVar.height - paddle1.height;
        buttons.p1_up = true;
        buttons.p1_down = false;
    }

    if(paddle2.y <= 0){
        paddle2.y = 0;
        buttons.p2_up = false;
        buttons.p2_down = true;
    }

    if(paddle2.y >= myVar.height - paddle1.height){
        paddle2.y = myVar.height - paddle1.height;
        buttons.p2_up = true;
        buttons.p2_down = false;
    }

    place_objects([paddle1]);
    place_objects([paddle2]);

    if (((ball.x < paddle1.width) && ((ball.y > paddle1.y) && (ball.y < paddle1.y + paddle1.height))) || (ball.x > (document.body.getBoundingClientRect().width - ball.width - paddle2.width) && ((ball.y > paddle2.y) && (ball.y < paddle2.y + paddle2.height)))){
        ball.vx = - ball.vx;
    }
        
    if(ball.x < 0){
        score2++;
        ball.x = document.body.getBoundingClientRect().width / 2;   
        ball.x = document.body.getBoundingClientRect().height / 2;             
    }

    if(ball.x > document.body.getBoundingClientRect().width - ball.width){
        score1++;
        ball.x = document.body.getBoundingClientRect().width / 2;   
        ball.x = document.body.getBoundingClientRect().height / 2;             
    }

    document.getElementById('score1').innerHTML = score1.toString();
    document.getElementById('score2').innerHTML = score2.toString();
}

let ball;
let paddle1;
let paddle2;

function init() {
    ball = new Ball();
    paddle1 = new Paddle("paddle1");
    paddle2 = new Paddle("paddle2");

    setInterval(update, 100);
}

class Button{
    constructor(){
        this.p1_up = true;
        this.p1_down = true;
        this.p2_up = true;
        this.p2_down = true;
    }
}

let buttons = new Button();

function track_player_input(event) {
    if(event.type == "keydown") {
        switch(event.key) {
            case "a": 
                buttons.p1_up = true;
                paddle1.y -= paddle1.py;
            break;
            case "q": 
                buttons.p1_down = true;
                paddle1.y += paddle1.py;
            break;
            case "p": 
                buttons.p2_up = true;
                paddle2.y -= paddle2.py; 
            break;
            case "m": 
                buttons.p2_down = true;
                paddle2.y += paddle2.py; 
            break;
        }
    }else if(event.type == "keyup") {
        switch(event.key) {
            case "a": 
                buttons.p1_up = false;
                paddle1.y -= paddle1.py;
            break;
            case "q": 
                buttons.p1_down = false;
                paddle1.y += paddle1.py; 
            break;
            case "p": 
                buttons.p2_up = false; 
                paddle2.y -= paddle2.py; 
            break;
            case "m": 
                buttons.p2_down = false; 
                paddle2.y += paddle2.py;  
            break;
        }
    }
}
document.addEventListener("keydown", track_player_input);
document.addEventListener("keyup", track_player_input);