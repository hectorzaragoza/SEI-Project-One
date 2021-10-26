//1. Set up my project to use Canvas
//  A. Add Easel Element on HTML
//  B. Create a main function that runs on DOMContentLoaded that accesses canvas context using the
//  getContext method on our canvas element. Set our context to 2d
//  C. Instead of setting hard-coded dimensions for the width and height attributes, use getComputedStyle()
//  so that the canvasArea is responsive (adjusts automatically per the screen size.)

    //Get our canvas element via the id
    const canvas = document.getElementById('canvasArea');
    const h1 = document.getElementById('heading')
    //def health counter
    const healthCounter = document.getElementById('healthCounter')


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
    const healthUp = new Objects (canvas.width - 50,50,40,40, 'green')
    const healthDown = new Objects (canvas.width - 50,150,40,40, 'red')
    const safety = new Objects (10,90,40,40, 'blue')
    const hazard = new Objects(100,250,15,15,'red')
    // //Test that render method works
    // player.render()
    // hazard.render()
    
    //Define actions that affect Health Counter
    //There are two kinds of objects, Blue and Green restore health
    //getting hit by moving objects kills the character.
    //We can include both in one function
    //let's start with taking away health if you get hit by a target.
    healthCounter.innerHTML = 100
    const detectHit = () => {
        if (
            player.x < safety.x + safety.width &&
            player.x + player.width > safety.x &&
            player.y < safety.y + safety.height &&
            player.y + player.height > safety.y 
        ) {
            healthCounter.innerHTML = 100
        } else if (
            player.x < hazard.x + hazard.width &&
            player.x + player.width > hazard.x &&
            player.y < hazard.y + hazard.height &&
            player.y + player.height > hazard.y 
        ) {
            healthCounter.innerHTML -= 10
        } else if (
            player.x < healthUp.x + healthUp.width &&
            player.x + player.width > healthUp.x &&
            player.y < healthUp.y + healthUp.height &&
            player.y + player.height > healthUp.y
        ) {
            healthCounter.innerHTML += 1
        } else if (
            player.x < healthDown.x + healthDown.width &&
            player.x + player.width > healthDown.x &&
            player.y < healthDown.y + healthDown.height &&
            player.y + player.height > healthDown.y
        ) {
            healthCounter.innerHTML += 1
        } else if (
            !(player.x < safety.x + safety.width &&
            player.x + player.width > safety.x &&
            player.y < safety.y + safety.height &&
            player.y + player.height > safety.y) 
        ) {
            healthCounter.innerHTML -= 1
        }
    }


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
            hazard.y -= 10
            hazard.render()
        } else {
            hazard.y = 250
        }
        detectHit()
    }

    let gameInterval = setInterval(gameLoop, 100)

    //I need to have an object go from outside the canvas, bottom up, automatically
    //at a set rate.
    //I will need: 
    //  1. an object
    //  2. a movement control method (maybe a loop because no keys
    //      are used to manipulate movement)

        
    document.addEventListener('keydown', moveControl)