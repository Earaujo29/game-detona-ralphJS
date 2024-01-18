

function  init(){
    

    const state = {
        view:{
            timeLeft:document.querySelector("#time"),
            score:document.querySelector("#score"),
            enemy: document.querySelector(".enemy"),
            squares: document.querySelectorAll(".square"),
            lives: document.querySelector(".lives")
        },
    
        values:{
            timerId: null,
            countDownTimerId: setInterval(countDown,1000),
            life:3,
            gameVelocity:1000,
            hitPosition:0,
            result:0,
            currentTime:60
        }
    }

  
   moveEnemy();
   addListenerHitBox();

function lives(){

    state.values.life--;

    state.view.lives.innerHTML = state.values.life;

    if (state.values.life <= 0) {
        clearInterval(state.values.countDownTimerId);
        clearInterval(state.values.timerId);
        alert("Game Over!! Sua pontuação total foi:" + state.values.result);
        location.reload();
                
    }

}   

function countDown(){
    state.values.currentTime--;

    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <=0){
        clearInterval(state.values.countDownTimerId);
        clearInterval(state.values.timerId);
        alert("Game Over!! Sua pontuação total foi:" + state.values.result);
        location.reload();
    }
}

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox(){
    state.view.squares.forEach((square)=>{  
        square.addEventListener("mousedown", ()=>{
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null ;
                playSound();
            }else{
                lives();                
            }
        })

    })
}

function randomSquare(){

    state.view.squares.forEach((square) =>{
        square.classList.remove("enemy");
    })

    let randomNumber = Math.floor(Math.random()* 9);
    let randomSquare = state.view.squares[randomNumber];

    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function playSound(){
        let audio = new Audio("./src/audios/hit.m4a");
        audio.volume = 0.2;
        audio.play();
}



}

init();

