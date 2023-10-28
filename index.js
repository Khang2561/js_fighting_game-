const canvas = document.querySelector('canvas')//tác động lên canvas đầu tiên 
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)//vẽ hình chữ nhật 

const gravity = 0.2

/*Sprite start*/
class Sprite{

    //hàm mặt định
    constructor({position, velocity}){
        this.position = position//vị trí
        this.velocity = velocity//vân tốc 
        this.height = 150
        this.lastKey
    }

    //vẽ nhân vật
    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 50,this.height)//width = 50, height = 100
    }

    update(){
        this.draw()
        
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
    }
})


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
    }
})

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
    }
}




/*Animate start*/
function animate(){
    window.requestAnimationFrame(animate)//vòng lặp liên hồi 
    c.fillStyle = 'black'//background color
    c.fillRect(0,0,canvas.width, canvas.height)//background color
    player.update()
    enemy.update()

    player.velocity.x = 0//dung khi khong con an nut duy chuyen trai phai

    //duy chuyển sang trái sang phải 
    if (keys.a.pressed && lastKey==='a'){
        player.velocity.x = -1
    }
    else if(keys.d.pressed && lastKey==='d'){
        player.velocity.x = 1
    }
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
            keys.w.pressed = true
            player.lastKey = 'w'
            player.velocity.y = -10
            break
        //down
        case 's':
            keys.s.pressed = true
            player.lastKey = 's'
            break

        //player 1
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey='ArrowRight'
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
        //up
        case 'w':
            keys.w.pressed = false
            break
        //down
        case 's':
            keys.s.pressed = false
            break
    }
})

//add Event end