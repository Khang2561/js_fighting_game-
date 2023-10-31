const canvas = document.querySelector('canvas')//tác động lên canvas đầu tiên 
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)//vẽ hình chữ nhật 

const gravity = 0.7 

/*Sprite start*/
class Sprite{

    //hàm mặt định
    constructor({position, velocity, color,offset}){
        this.position = position//vị trí
        this.velocity = velocity//vân tốc 
        this.height = 150
        this.width = 50
        this.lastKey
        this.color = this.color
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            height: 50,
            width: 100,
        }
        this.isAttacking
        this.health = 100
    }

    //vẽ nhân vật
    draw(){
        //draw player
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width,this.height)//width = 50, height = 100
        
        if (this.isAttacking){
            //draw attack box 
            c.fillStyle = 'green'
            c.fillRect(
                this.attackBox.position.x, 
                this.attackBox.position.y, 
                this.attackBox.width, 
                this.attackBox.height)
        }
        //draw attack box 
       
    }

    update(){
        //duy chuyển attack box theo nhân vật 
        this.draw()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        this.position.x += this.velocity.x//duy chuyen trai phai
        this.position.y += this.velocity.y//roi xuong cua nhan vat
        //tạo phạm vi dưới cho bảng đồ 
        if (this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0
        }
        else{
            this.velocity.y += gravity//thêm trọng lượng cho nhân vật 
        }
    }

    attack() {
        this.isAttacking = true
        setTimeout(() =>{
            this.isAttacking =false
        },100)
    }
}
/*Sprite end*/


//tao ra player 1 start
const player =  new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity:{
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0,
    }
})
player.color = 'red'

//tao ra player 1 end

//tao ra player2 strat
const enemy =  new Sprite({
    position: {
        x: 400,
        y: 100
    },
    velocity:{
        x: 0,
        y: 0
    },
    offset: {
        x: -50,
        y: 0,
    }
})

enemy.color = 'blue'

//tao ra player2 end

console.log(player)

//
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    s: {
        pressed: false
    },
    ArrowLeft:{
        pressed:false
    },
    ArrowRight:{
        pressed:false
    }
}

// hàm nhận diện va chạm 
function rectangulareCollirion({rectangule1, rectangule2}){
    return (
        rectangule1.attackBox.position.x + rectangule1.attackBox.width >= 
        rectangule2.position.x && rectangule1.attackBox.position.x <= rectangule2.position.x + rectangule2.width
        && rectangule1.attackBox.position.y + rectangule1.attackBox.height >= rectangule2.position.y
        && rectangule1.attackBox.position.y <= rectangule2.position.y + rectangule2.height
        )
}


/*Animate start*/
function animate(){
    window.requestAnimationFrame(animate)//vòng lặp liên hồi 
    c.fillStyle = 'black'//background color
    c.fillRect(0,0,canvas.width, canvas.height)//background color
    player.update()
    enemy.update()

    player.velocity.x = 0//dung khi khong con an nut duy chuyen trai phai
    enemy.velocity.x = 0

    //duy chuyển sang trái sang phải (player movement)
    if (keys.a.pressed && player.lastKey ==='a'){
        player.velocity.x = -5
    }
    else if(keys.d.pressed && player.lastKey ==='d'){
        player.velocity.x = 5
    }

    //duy chuyển sang trái sang phải (enemy movement)
    if (keys.ArrowLeft.pressed && enemy.lastKey ==='ArrowLeft'){
        enemy.velocity.x = -5
    }
    else if(keys.ArrowRight.pressed && enemy.lastKey ==='ArrowRight'){
        enemy.velocity.x = 5
    }

    //Nhận diện vùng va chạm player 
    if (
        rectangulareCollirion({
            rectangule1: player,
            rectangule2: enemy
        })
        && player.isAttacking){
        player.isAttacking = false
        enemy.health -= 20
        document.querySelector('#enemy_health').style.width = enemy.health + '%'
    }
    //Nhận diện vùng va chạm enemy 
    if (
        rectangulareCollirion({
            rectangule1: enemy,
            rectangule2: player
        })
        && enemy.isAttacking){
        enemy.isAttacking = false
        player.health -= 20
        document.querySelector('#player_health').style.width = player.health + '%'
    }

    player.isAttacking = false
    enemy.isAttacking =  false
}
/*Animate end*/

animate()

//add Event start

//down
window.addEventListener('keydown',(event)=>{
    switch (event.key){
        //player 1
        //right
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        //left
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        //up
        case 'w':
            //keys.w.pressed = true
            //player.lastKey = 'w'
            player.velocity.y = -20
            break
        case ' ':
            player.isAttacking = true
            break
        

        //player 2
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey='ArrowRight'
            break
         case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey='ArrowLeft'
            break
        case 'ArrowUp':
            enemy.velocity.y = -20
            break 
        case '/':
            enemy.isAttacking = true
            break
    }
})

//up
window.addEventListener('keyup',(event)=>{
    switch (event.key){
        //right
        case 'd':
            keys.d.pressed = false
            break
        //left
        case 'a':
            keys.a.pressed = false
            break

    }

    switch (event.key){
        //right
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        //left
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break

     
    }
})

//add Event end