//1. Set up my project to use Canvas
//  A. Add Easel Element on HTML
//  B. Create a main function that runs on DOMContentLoaded that accesses canvas context using the
//  getContext method on our canvas element. Set our context to 2d
//  C. Instead of setting hard-coded dimensions for the width and height attributes, use getComputedStyle()
//  so that the canvasArea is responsive (adjusts automatically per the screen size.)

    //Get our canvas element via the id
    const canvas = document.getElementById('canvasArea');
    const h1 = document.getElementById('heading')
    //


    //Set the dimensions of the canvas area to be responsive by using getComputedStyle
    // game.setAttribute('width', getComputedStyle(game)['width'])
    // game.setAttribute('height', getComputedStyle(game)['height'])   
    canvas.setAttribute('width', getComputedStyle(canvas)['width'])
    canvas.setAttribute('height', getComputedStyle(canvas)['height'])

    //In order to draw on the canvas, we need to get its context and set it to 2d.
    const ctx = canvas.getContext('2d')

    // //Set the canvas dimensions to the context so that the rendering area knows
    // //the boundaries.
    ctx.width = canvas.width
    ctx.height = canvas.height

    //Create a constructor function with attributes that both the player,
    //hazards, and establishments will share.
    function Objects(x, y, width, height, color) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.alive = true
        //Use the contexts fill styles property and fill rect method
        //to render objects on the canvas
        this.render = function () {
            console.log('Rendering')
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
    
    // ctx.fillStyle = 'red'
    // ctx.fillRect(0,0, 10, 10)

    // ctx.fillStyle = 'blue'
    // ctx.fillRect(100,100, 10, 10)

    //Create objects: Player, Hazard, Two Establishments
    const player = new Objects(25,105,10,10, 'red')
    const healthUp = new Objects (600,50,40,40, 'green')
    const healthDown = new Objects (600,150,40,40, 'red')
    const safety = new Objects (10,90,40,40, 'blue')
    const hazard = new Objects(100,250,15,15,'red')
    // //Test that render method works
    // player.render()
    // hazard.render()

    //We need to control the movement of our player using the WASD keys in 
    //addition to keeping the player moving out side the canvas.
    let moveControl = (e) => {
        switch(e.key.toLowerCase()) {
            case ('w'):
                player.y -= 10
                if (player.y <= 0) {
                    player.y = 0
                }
                break
            case ('a'):
                player.x -= 10
                if (player.x <= 0) {
                    player.x = 0
                }
                break
            case ('s'):
                player.y += 10
                if(player.y + player.height >= canvas.height) {
                    player.y = canvas.height - player.height
                }
                break
            case ('d'):
                player.x += 10
                if (player.x + player.width >= canvas.width) {
                    player.x = canvas.width - player.width
                }    
                break
        }
    } 
    

    document.addEventListener('keydown', moveControl)

    //Build a function that will loop and update the x,y, coordinates
    //of my player to render moevement using the moveControl function
    const gameLoop = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        moveControl.innerContent = `X: ${player.x}\nY: ${player.y}`
        safety.render()
        player.render()
        healthUp.render()
        healthDown.render()
        if(hazard.y > 0) {
            hazard.y -= 20
            hazard.render()
        } else {
            hazard.y = 250
        }
    }

    let gameInterval = setInterval(gameLoop, 70)

    //I need to have an object go from outside the canvas, bottom up, automatically
    //at a set rate.
    //I will need: 
    //  1. an object
    //  2. a movement control method (maybe a loop because no keys
    //      are used to manipulate movement)

        
        
    