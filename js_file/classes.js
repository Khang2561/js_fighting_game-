/*Sprite start*/
class Sprite{
    //hàm mặt định
    constructor({position, imageSrc, scale = 1, framesMax = 1}){
        this.position = position//vị trí
        this.height = 150
        this.width = 50
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
    }

    //vẽ background
    draw(){
        c.drawImage(
            this.image, 
            this.framesCurrent * (this.image.width/this.framesMax),
            0,
            this.image.width/this.framesMax,
            this.image.height,

            this.position.x, 
            this.position.y,
            (this.image.width/this.framesMax) * this.scale, 
            this.image.height * this.scale )
    }

    update(){
        //update background 
        this.draw()
        this.framesElapsed++
        if (this.framesElapsed % this.framesHold === 0){
            if (this.framesCurrent < this.framesMax - 1){
                this.framesCurrent++
            }
            else{
                this.framesCurrent = 0
            }
        }
        
        
        
    }
}
/*Sprite end*/

/*Fighter start*/
class Fighter{

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
        if (this.position.y + this.height + this.velocity.y >= canvas.height-95){
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
/*Fighter end*/
