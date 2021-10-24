//1. Set up my project to use Canvas
//  A. Add Easel Element on HTML
//  B. Create a main function that runs on DOMContentLoaded that accesses canvas context using the
//  getContext method on our canvas element. Set our context to 2d
//  C. Instead of setting hard-coded dimensions for the width and height attributes, use getComputedStyle()
//  so that the canvasArea is responsive (adjusts automatically per the screen size.)

    //Get our canvas element via the id
    const canvas = document.getElementById('canvasArea');
    const h1 = document.getElementById('heading')

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
    const player = new Objects(10,10,10,10, 'red')
    const hazard = new Objects(20,20,15,15,'red')
    //Test that render method works
    player.render()
    hazard.render()

    