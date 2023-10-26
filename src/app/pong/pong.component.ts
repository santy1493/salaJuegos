import { Component, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-pong',
  templateUrl: './pong.component.html',
  styleUrls: ['./pong.component.css']
})
export class PongComponent implements AfterViewInit  {

  @ViewChild('boardGame', {static: false}) gameBoard: ElementRef<HTMLCanvasElement>;

  context: CanvasRenderingContext2D;
  scoreText: string = '0 : 0';

  ctx;
  gameWidth;
  gameHeight;
  boardBackground;
  paddle1Color;
  paddle2Color;
  paddleBorder;
  ballColor;
  ballBorderColor;
  ballRadius;
  paddleSpeed;
  intervalID;
  ballSpeed;
  ballX;
  ballY;
  ballXDirection;
  ballYDirection;
  player1Score;
  player2Score;
  paddle1;
  paddle2;

  ngAfterViewInit(): void {
    this.ctx = this.gameBoard.nativeElement.getContext('2d');
    
    this.gameWidth = this.gameBoard.nativeElement.width;
    this.gameHeight = this.gameBoard.nativeElement.height;
    this.boardBackground = "forestgreen";
    this.paddle1Color = "lightblue";
    this.paddle2Color = "red";
    this.paddleBorder = "black";
    this.ballColor = "yellow";
    this.ballBorderColor = "black";
    this.ballRadius = 12.5;
    this.paddleSpeed = 75;
    this.intervalID;
    this.ballSpeed;
    this.ballX = this.gameWidth / 2;
    this.ballY = this.gameHeight / 2;
    this.ballXDirection = 0;
    this.ballYDirection = 0;
    this.player1Score = 0;
    this.player2Score = 0;
    this.paddle1 = {
        width: 25,
        height: 100,
        x: 0,
        y: 0
    };
    this.paddle2 = {
        width: 25,
        height: 100,
        x: this.gameWidth - 25,
        y: this.gameHeight - 100
    };

    //window.addEventListener("keydown", this.changeDirection);

    this.gameStart();
  }


  
  gameStart(){
    
    this.createBall();
    this.nextTick();
  };
  
  nextTick(){
      this.intervalID = setTimeout(() => {
          this.clearBoard();
          this.drawPaddles();
          this.moveBall();
          this.drawBall(this.ballX, this.ballY);
          this.checkCollision();
          this.nextTick();
      }, 10)
  };
  
  clearBoard(){
      this.ctx.fillStyle = this.boardBackground;
      this.ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
  };
  
  drawPaddles(){
      this.ctx.strokeStyle = this.paddleBorder;

      this.ctx.fillStyle = this.paddle1Color;
      this.ctx.fillRect(this.paddle1.x, this.paddle1.y, this.paddle1.width, this.paddle1.height);
      this.ctx.strokeRect(this.paddle1.x, this.paddle1.y, this.paddle1.width, this.paddle1.height);

      this.ctx.fillStyle = this.paddle2Color;
      this.ctx.fillRect(this.paddle2.x, this.paddle2.y, this.paddle2.width, this.paddle2.height);
      this.ctx.strokeRect(this.paddle2.x, this.paddle2.y, this.paddle2.width, this.paddle2.height);
  };
  
  createBall(){
      this.ballSpeed = 1.5;
      if(Math.round(Math.random()) == 1){
          this.ballXDirection =  1; 
      }
      else{
          this.ballXDirection = -1; 
      }
      if(Math.round(Math.random()) == 1){
          this.ballYDirection = Math.random() * 1; //more random directions
      }
      else{
          this.ballYDirection = Math.random() * -1; //more random directions
      }
      this.ballX = this.gameWidth / 2;
      this.ballY = this.gameHeight / 2;
      this.drawBall(this.ballX, this.ballY);
  };
  
  moveBall(){
      this.ballX += (this.ballSpeed * this.ballXDirection);
      this.ballY += (this.ballSpeed * this.ballYDirection);
  };
  
  drawBall(ballX, ballY){
      this.ctx.fillStyle = this.ballColor;
      this.ctx.strokeStyle = this.ballBorderColor;
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.arc(ballX, ballY, this.ballRadius, 0, 2 * Math.PI);
      this.ctx.stroke();
      this.ctx.fill();
  };
  
  checkCollision(){
      if(this.ballY <= 0 + this.ballRadius){
          this.ballYDirection *= -1;
      }
      if(this.ballY >= this.gameHeight - this.ballRadius){
          this.ballYDirection *= -1;
      }
      if(this.ballX <= 0){
          this.player2Score+=1;
          this.updateScore();
          this.createBall();
          return;
      }
      if(this.ballX >= this.gameWidth){
          this.player1Score+=1;
          this.updateScore();
          this.createBall();
          return;
      }
      if(this.ballX <= (this.paddle1.x + this.paddle1.width + this.ballRadius)){
          if(this.ballY > this.paddle1.y && this.ballY < this.paddle1.y + this.paddle1.height){
              this.ballX = (this.paddle1.x + this.paddle1.width) + this.ballRadius; // if ball gets stuck
              this.ballXDirection *= -1;
              this.ballSpeed += 0.25;
          }
      }
      if(this.ballX >= (this.paddle2.x - this.ballRadius)){
          if(this.ballY > this.paddle2.y && this.ballY < this.paddle2.y + this.paddle2.height){
              this.ballX = this.paddle2.x - this.ballRadius; // if ball gets stuck
              this.ballXDirection *= -1;
              this.ballSpeed += 0.25;
          }
      }
  };
  
  @HostListener('document:keydown', ['$event'])
  changeDirection(event){
      const keyPressed = event.keyCode;
      const paddle1Up = 87;
      const paddle1Down = 83;
      const paddle2Up = 38;
      const paddle2Down = 40;

      switch(keyPressed){
          case(paddle1Up):
              if(this.paddle1.y > 0){
                  this.paddle1.y -= this.paddleSpeed;
              }
              break;
          case(paddle1Down):
              if(this.paddle1.y < this.gameHeight - this.paddle1.height){
                  this.paddle1.y += this.paddleSpeed;
              }
              break;
          case(paddle2Up):
              if(this.paddle2.y > 0){
                  this.paddle2.y -= this.paddleSpeed;
              }
              break;
          case(paddle2Down):
              if(this.paddle2.y < this.gameHeight - this.paddle2.height){
                  this.paddle2.y += this.paddleSpeed;
              }
              break;
      }
  };

  updateScore(){
      this.scoreText = `${this.player1Score} : ${this.player2Score}`;
  };

  resetGame(){
      this.player1Score = 0;
      this.player2Score = 0;
      this.paddle1 = {
          width: 25,
          height: 100,
          x: 0,
          y: 0
      };
      this.paddle2 = {
          width: 25,
          height: 100,
          x: this.gameWidth - 25,
          y: this.gameHeight - 100
      };
      this.ballSpeed = 1.5;
      this.ballX = 0;
      this.ballY = 0;
      this.ballXDirection = 0;
      this.ballYDirection = 0;
      this.updateScore();
      clearInterval(this.intervalID);
      this.gameStart();
  };



}
