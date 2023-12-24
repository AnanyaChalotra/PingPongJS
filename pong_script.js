import Ball from './Ball.js'
import Paddle from './Paddle.js'
const ball = new Ball(document.getElementById("ball"));
const paddle1 = new Paddle(document.getElementById("player-paddle1"));
const paddle2 = new Paddle(document.getElementById("player-paddle2"));
var  Rod1score = 0; 
var  Rod2score = 0;
let lastTime;
let start = false;
let highscore = 0;
highscore = localStorage.getItem("highscore");
if(highscore)
{
    window.alert("Highcore is "+highscore+" by "+localStorage.getItem('by'));
}
else
{
    window.alert("This is Your First Time Playing");
}
function update(time)
{   
    if(lastTime!=null && start){
        const delta = time - lastTime;        
        ball.update(delta,[paddle1.rect() , paddle2.rect()]);
        paddle1.update(delta);
        paddle2.update(delta);
    }
    lastTime = time; 
    window.requestAnimationFrame(update);
    if(isLose())
    {   
        console.log("lose");
        handleLose();
        start = false;
    }
}

function handleLose()
{
    const rect = ball.rect()
    {
        if(rect.top<=0){
            Rod2score = Rod2score + 1;
            window.alert("Rod 2 Wins with a score of " + Rod2score);
            if(localStorage.getItem('highscore') < Rod2score)
            {
                localStorage.setItem('highscore',Rod2score);
                localStorage.setItem('by',"Rod2");
            }
        }
        if(rect.bottom>=window.innerHeight){
            Rod1score = Rod1score + 1;
            window.alert("Rod 1 Wins with a score of " + Rod1score);
            if(localStorage.getItem('highscore') < Rod1score)
            {
                localStorage.setItem('highscore',Rod1score);
                localStorage.setItem('by',"Rod1");
            }
        }
    }
    ball.reset();
    paddle1.reset();
    paddle2.reset();
    return;
}
window.requestAnimationFrame(update);
function isLose()
{
    const rect = ball.rect(); 
    return (rect.top <= 0 || rect.bottom >= window.innerHeight)
}


function handlekeydown(e)
{
    if(e.keyCode == 13)
    {
        start = true;
    }
    if(e.keyCode == 65)
    {
        // console.log('move left')
        paddle1.position = -1;
        paddle2.position = -1;
    }
    if(e.keyCode == 68)
    {
        // console.log('move right')
        paddle1.position = 1;
        paddle2.position = 1;
    }
}

document.addEventListener('keydown',handlekeydown,false);