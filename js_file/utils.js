// hàm nhận diện va chạm 
function rectangulareCollirion({rectangule1, rectangule2}){
    return (
        rectangule1.attackBox.position.x + rectangule1.attackBox.width >= 
        rectangule2.position.x && rectangule1.attackBox.position.x <= rectangule2.position.x + rectangule2.width
        && rectangule1.attackBox.position.y + rectangule1.attackBox.height >= rectangule2.position.y
        && rectangule1.attackBox.position.y <= rectangule2.position.y + rectangule2.height
        )
}

//Nhận diện ai thắng 
function determineWinner({player, enemy, timeId}){
    clearTimeout(timeId)
    document.querySelector('#displayText').style.display = 'flex'
    if (player.health === enemy.health){
        document.querySelector('#displayText').innerHTML = 'Time'
    }
    else if (player.health > enemy.health){
        document.querySelector('#displayText').innerHTML = 'Player 1 Wins'
    }
    else if (player.health < enemy.health){
        document.querySelector('#displayText').innerHTML = 'Player 2 Wins'
    }
}


//hàm đếm ngược thời gian 
let time = 60
let timeId
function decreaseTimer(){
    if (time>0){
        timeId = setTimeout(decreaseTimer,1000)
        time--
        document.querySelector('#timer').innerHTML = time
    }
    //in ra màn hình thông tin 
    if (time ===0){
       determineWinner({player,enemy, timeId})
    }

}