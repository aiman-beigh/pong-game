const gameBoard =document.querySelector('.gameBoard')
const context=gameBoard.getContext('2d')
const scoreText= document.querySelector('.scoreText')
const reset= document.querySelector('.reset')

const gameWidth=gameBoard.width;
const gameHeight=gameBoard.height

let backgroundColor='	#AFE1AF';
let paddle1Color='lightblue'
let paddle2Color='pink'
let ballColor='yellow'
let borderColor='black'


let intervalId;
let Xball=gameWidth/2;
let Yball=gameHeight/2;
let ballXdirection=0;
let ballYdirection=0;
let paddleSpeed=50
let player1Score=0;
let player2Score=0;
let ballSpeed;

let paddle1={
   
    width:25,
    height:100,
     x:0,
    y:0,
}
let paddle2={
  width:25,
    height:100,  
    x:gameWidth-25,
    y:gameHeight-100,
    
}




window.addEventListener('keydown',changeDirection)
reset.addEventListener('click',resetGame)


gameStart();

function gameStart(){
createBall()
nextTick()

}
function nextTick(){
    intervalId=setTimeout(()=>{
        clearBoard();
        drawPaddles();
        moveBall();
        drawBall(Xball,Yball)
        checkCollision();
        nextTick()

    },10)
}
function clearBoard(){
    context.fillStyle=backgroundColor;
    context.fillRect(0,0,gameWidth,gameHeight)
}
function drawPaddles(){
    context.strokeStyle=borderColor;
    context.fillStyle=paddle1Color;
    context.fillRect(paddle1.x,paddle1.y,paddle1.width,paddle1.height)
    context.strokeRect(paddle1.x,paddle1.y,paddle1.width,paddle1.height)

    context.strokeStyle=borderColor;
    context.fillStyle=paddle2Color;
    context.fillRect(paddle2.x,paddle2.y,paddle2.width,paddle2.height)
    context.strokeRect(paddle2.x,paddle2.y,paddle2.width,paddle2.height)
}
function createBall(){
    ballSpeed=1
     if(Math.round(Math.random()) == 1)
        {
            ballXdirection=1;
        }
        else 
       {ballXdirection =-1;} 
    if(Math.round(Math.random()) == 1)
            {
                ballYdirection=1;
            }
            else 
           {ballYdirection = -1;} 

     Xball=gameWidth/2;
     Yball=gameHeight/2 
     
     drawBall(Xball,Yball)
}
function moveBall(){
    Xball+=(ballSpeed*ballXdirection);
    Yball+=(ballSpeed*ballYdirection)

}
function drawBall(Xball,Yball){
    context.fillStyle=ballColor;
    context.strokeStyle=borderColor;
    context.lineWidth=2;
    context.beginPath();
context.arc(Xball,Yball,25,0,2*Math.PI)
context.fill()
context.stroke();
}
function checkCollision(){
    if (Yball<=0 +25){
        ballYdirection *= -1;
    }
    if (Yball >= gameHeight -25 ){
        ballYdirection *=-1;
    }
    if (Xball<=0){
        if(player1Score>0)
            {
                player1Score-=1
                updateScore()
            }
createBall()
return;
    }
    if (Xball>=gameWidth){
        if(player2Score>0)
            {
                player2Score-=1
                updateScore()
            }
        createBall()
        return;
            }
  if(Xball<=(paddle1.x +paddle1.width+ 25))
    if(Yball>paddle1.y && Yball< paddle1.y+paddle1.height)  {
        Xball=(paddle1.x +paddle1.width)+25;   //if balls gets stuck
        ballSpeed+=1
ballXdirection*=-1;
player1Score+=1;
updateScore();
  }

  if(Xball>=(paddle2.x - 25))
    if(Yball>paddle2.y && Yball< paddle2.y+paddle2.height)  {
        Xball=(paddle2.x -25)   //if balls gets stuck
ballXdirection*=-1;
ballSpeed+=1
player2Score+=1;
updateScore();
  }
}
function changeDirection(event){
   const pressedKey=event.keyCode
   
 switch(pressedKey){
    case(87):
        if(paddle1.y > 0){
            paddle1.y-=paddleSpeed
        }
        break;
        case(83):
        if(paddle1.y < (gameHeight-100)){
            paddle1.y+=50
        }
        break;
        case(38):
        if(paddle2.y > 0){
            paddle2.y-=paddleSpeed
        }
        break;
        case(40):
        if(paddle2.y < gameHeight-100){
            paddle2.y+=paddleSpeed
        }
        break;
 }
}
function updateScore(){
    
    scoreText.textContent=`${player1Score}:${player2Score}`
}
function resetGame(){
    player1Score=0;
    player2Score=0
     paddle1={
   
        width:25,
        height:100,
         x:0,
        y:0,
    }
    paddle2={
      width:25,
        height:100,  
        x:gameWidth-25,
        y:gameHeight-100,
        
    }
    Xball=0
    Yball=0;
    ballXdirection=0;
    ballYdirection=0;
    updateScore();
    clearInterval(intervalId)
    gameStart();
}