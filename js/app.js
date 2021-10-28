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
    const thePark = new Objects (canvas.width-40,canvas.height-250,40,60, 'green')
    const theBeach = new Objects (canvas.width-40,canvas.height-155,40,60, 'lightblue')
    const theBar = new Objects (canvas.width-40,canvas.height-60,40,60, 'darkred')
    const endZone = new Objects (canvas.width-55,canvas.height-250,2,250, 'black')
    const safety = new Objects (10,90,40,40, 'blue')
    const hazard = new Objects(100,250,15,15,'red')
    const secondHazard = new Objects(150,300,20,20, 'black')
    const thirdHazard = new Objects(195,-20,10,10, 'brown')
    const fourthHazard = new Objects(215,-40,10,10, 'brown')
    const fifthHazard = new Objects(250,300,35,35, 'grey')
    const sixthHazard = new Objects(300,400,15,15, 'yellow')
    const seventhHazard = new Objects(340,-10,10,10, 'brown')
    const eigthHazard = new Objects(370,-60,10,10, 'brown')
    const ninthHazard = new Objects(420,400,15,15, 'pink')
    const tenthHazard = new Objects(450,-10,10,10, 'aqua')
    const eleventhHazard = new Objects(500,-60,10,10, 'purple')
    const twelfthHazard = new Objects(550,-60,10,10, 'gold')
    const thirteenthHazard = new Objects(600,-60,10,10, 'gray')
    const fourteenthHazard = new Objects(525,300,10,10, 'blue')
    const fifteenthHazard = new Objects(575,300,10,10, 'red')
    // //Test that render method works
    // player.render()
    // hazard.render()
    
    //Define actions that affect Health Counter
    //There are two kinds of objects, Blue and Green restore health
    //getting hit by moving objects kills the character.
    //We can include both in one function
    //Win condition
//The player must visit at least one of the three locations and make it back home before the health bar reaches 0.
//Conditions: 
//  1. Player surface area must touch the end zone
    let winCon = false
//  &&
    const winGame = () => {
        if(winCon && (
            player.x < safety.x + safety.width &&
            player.x + player.width > safety.x &&
            player.y < safety.y + safety.height &&
            player.y + player.height > safety.y 
        )) {
            clearInterval(gameInterval)
            let createWin = document.createElement('h2')
            createWin.innerText = "You made it!"
            document.querySelector('p').appendChild(createWin)
        }
    }
//  2. Be "Home" 

//Stop condition
//When the health counter reaches 0, an h2 element that displays "Game Over!" is created and appended to the h1 heading and the game loop is stopped using clearInterval.
const stopGame = () => {
    if (healthCounter.innerText == 0) {
        clearInterval(gameInterval)
        let createEnd = document.createElement('h2')
        createEnd.setAttribute('id', "gameOver")
        createEnd.innerText = "Game Over!"
        document.querySelector('p').appendChild(createEnd)
    }
}


    //let's start with taking away health if you get hit by a target.
    healthCounter.innerText = 200
    const detectHit = () => {
        if (
            player.x < safety.x + safety.width &&
            player.x + player.width > safety.x &&
            player.y < safety.y + safety.height &&
            player.y + player.height > safety.y 
        ) {
            healthCounter.innerText = 200
        } else if (
            player.x < hazard.x + hazard.width &&
            player.x + player.width > hazard.x &&
            player.y < hazard.y + hazard.height &&
            player.y + player.height > hazard.y 
        ) {
            healthCounter.innerText -= 5
        } else if (
            player.x < secondHazard.x + secondHazard.width &&
            player.x + player.width > secondHazard.x &&
            player.y < secondHazard.y + secondHazard.height &&
            player.y + player.height > secondHazard.y 
        ) {
            healthCounter.innerText -= 10
        } else if (
            player.x < thirdHazard.x + thirdHazard.width &&
            player.x + player.width > thirdHazard.x &&
            player.y < thirdHazard.y + thirdHazard.height &&
            player.y + player.height > thirdHazard.y 
        ) {
            healthCounter.innerText -= 5
        } else if (
            player.x < fourthHazard.x + fourthHazard.width &&
            player.x + player.width > fourthHazard.x &&
            player.y < fourthHazard.y + fourthHazard.height &&
            player.y + player.height > fourthHazard.y 
        ) {
            healthCounter.innerText -= 5
        } else if (
            player.x < fifthHazard.x + fifthHazard.width &&
            player.x + player.width > fifthHazard.x &&
            player.y < fifthHazard.y + fifthHazard.height &&
            player.y + player.height > fifthHazard.y 
        ) {
            healthCounter.innerText -= 15
        } else if (
            player.x < sixthHazard.x + sixthHazard.width &&
            player.x + player.width > sixthHazard.x &&
            player.y < sixthHazard.y + sixthHazard.height &&
            player.y + player.height > sixthHazard.y 
        ) {
            healthCounter.innerText -= 5
        } else if (
            player.x < seventhHazard.x + seventhHazard.width &&
            player.x + player.width > seventhHazard.x &&
            player.y < seventhHazard.y + seventhHazard.height &&
            player.y + player.height > seventhHazard.y 
        ) {
            healthCounter.innerText -= 5
        } else if (
            player.x < eigthHazard.x + eigthHazard.width &&
            player.x + player.width > eigthHazard.x &&
            player.y < eigthHazard.y + eigthHazard.height &&
            player.y + player.height > eigthHazard.y 
        ) {
            healthCounter.innerText -= 5
        } else if (
            player.x < ninthHazard.x + ninthHazard.width &&
            player.x + player.width > ninthHazard.x &&
            player.y < ninthHazard.y + ninthHazard.height &&
            player.y + player.height > ninthHazard.y 
        ) {
            healthCounter.innerText -= 5
        } else if (
            player.x < tenthHazard.x + tenthHazard.width &&
            player.x + player.width > tenthHazard.x &&
            player.y < tenthHazard.y + tenthHazard.height &&
            player.y + player.height > tenthHazard.y 
        ) {
            healthCounter.innerText -= 5
        } else if (
            player.x < eleventhHazard.x + eleventhHazard.width &&
            player.x + player.width > eleventhHazard.x &&
            player.y < eleventhHazard.y + eleventhHazard.height &&
            player.y + player.height > eleventhHazard.y 
        ) {
            healthCounter.innerText -= 5
        } else if (
            player.x < twelfthHazard.x + twelfthHazard.width &&
            player.x + player.width > twelfthHazard.x &&
            player.y < twelfthHazard.y + twelfthHazard.height &&
            player.y + player.height > twelfthHazard.y 
        ) {
            healthCounter.innerText -= 5
        } else if (
            player.x < thirteenthHazard.x + thirteenthHazard.width &&
            player.x + player.width > thirteenthHazard.x &&
            player.y < thirteenthHazard.y + thirteenthHazard.height &&
            player.y + player.height > thirteenthHazard.y 
        ) {
            healthCounter.innerText -= 5
        } else if (
            player.x < fourteenthHazard.x + fourteenthHazard.width &&
            player.x + player.width > fourteenthHazard.x &&
            player.y < fourteenthHazard.y + fourteenthHazard.height &&
            player.y + player.height > fourteenthHazard.y 
        ) {
            healthCounter.innerText -= 5
        } else if (
            player.x < fifteenthHazard.x + fifteenthHazard.width &&
            player.x + player.width > fifteenthHazard.x &&
            player.y < fifteenthHazard.y + fifteenthHazard.height &&
            player.y + player.height > fifteenthHazard.y 
        ) {
            healthCounter.innerText -= 5
        } else if (
            player.x < endZone.x + endZone.width &&
            player.x + player.width > endZone.x &&
            player.y < endZone.y + endZone.height &&
            player.y + player.height > endZone.y 
        ) {
            winCon = true
        } else if (
            player.x < thePark.x + thePark.width &&
            player.x + player.width > thePark.x &&
            player.y < thePark.y + thePark.height &&
            player.y + player.height > thePark.y
        ) { if(healthCounter.innerText < 200){
            healthCounter.innerText = Number(healthCounter.innerText) + 1
        } else {
            healthCounter.innerText = 200
        }
        } else if (
            player.x < theBeach.x + theBeach.width &&
            player.x + player.width > theBeach.x &&
            player.y < theBeach.y + theBeach.height &&
            player.y + player.height > theBeach.y
        ) { if(healthCounter.innerText < 200){
            healthCounter.innerText = Number(healthCounter.innerText) + 2
        } else {
            healthCounter.innerText = 200
        }
        } else if (
            player.x < theBar.x + theBar.width &&
            player.x + player.width > theBar.x &&
            player.y < theBar.y + theBar.height &&
            player.y + player.height > theBar.y
        ) { if(healthCounter.innerText < 200){
            healthCounter.innerText = Number(healthCounter.innerText) - 1
            healthCounter.innerText = Number(healthCounter.innerText) 
        } else {
            healthCounter.innerText = 200
        }
        } else if (
            !(player.x < safety.x + safety.width &&
            player.x + player.width > safety.x &&
            player.y < safety.y + safety.height &&
            player.y + player.height > safety.y) 
        ) {
            if(healthCounter.innerText > 0){
                healthCounter.innerText -= 1
        } else {
            healthCounter.innerText = 0
        }
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
        endZone.render()
        safety.render()
        thePark.render()
        theBeach.render()
        theBar.render()
        player.render()
        console.log(winCon)
        if(hazard.y > 0) {
            hazard.y -= 10
            hazard.render()
        } else {
            hazard.y = 250
        }

        if(secondHazard.y > 0) {
            secondHazard.y -= 20
            secondHazard.render()
        } else {
            secondHazard.y = 300
        }
        if(thirdHazard.y < 300) {
            thirdHazard.y = Number(thirdHazard.y) + 10
            thirdHazard.render()
        } else {
            thirdHazard.y = -20
        }
        if(fourthHazard.y < 300) {
            fourthHazard.y = Number(fourthHazard.y) + 15
            fourthHazard.render()
        } else {
            fourthHazard.y = -20
        }

        if(fifthHazard.y > 0) {
            fifthHazard.y -= 10
            fifthHazard.render()
        } else {
            fifthHazard.y = 500
        }
        if(sixthHazard.y > 0) {
            sixthHazard.y -= 10
            sixthHazard.render()
        } else {
            sixthHazard.y = 500
        }

        if(seventhHazard.y < 300) {
            seventhHazard.y = Number(seventhHazard.y) + 10
            seventhHazard.render()
        } else {
            seventhHazard.y = -20
        }
        if(eigthHazard.y < 300) {
            eigthHazard.y = Number(eigthHazard.y) + 20
            eigthHazard.render()
        } else {
            eigthHazard.y = -20
        }
        if(ninthHazard.y > 0) {
            ninthHazard.y -= 30
            ninthHazard.render()
        } else {
            ninthHazard.y = 500
        }
        if(tenthHazard.y < 300) {
            tenthHazard.y = Number(tenthHazard.y) + 15
            tenthHazard.render()
        } else {
            tenthHazard.y = -20
        } 
        
        if(eleventhHazard.y > 0) {
            eleventhHazard.y -= 30
            eleventhHazard.render()
        } else {
            eleventhHazard.y = 500
        }
        if(twelfthHazard.y > 0) {
            twelfthHazard.y -= 30
            twelfthHazard.render()
        } else {
            twelfthHazard.y = 500
        }
        if(thirteenthHazard.y > 0) {
            thirteenthHazard.y -= 30
            thirteenthHazard.render()
        } else {
            thirteenthHazard.y = 500
        }
        if(fourteenthHazard.y < 300) {
            fourteenthHazard.y = Number(fourteenthHazard.y) + 10
            fourteenthHazard.render()
        } else {
            fourteenthHazard.y = -20
        }
        if(fifteenthHazard.y < 300) {
            fifteenthHazard.y = Number(fifteenthHazard.y) + 10
            fifteenthHazard.render()
        } else {
            fifteenthHazard.y = -20
        }
        detectHit()
        winGame()
        stopGame()
        
    }

    let gameInterval = setInterval(gameLoop, 100)
    //I need to have an object go from outside the canvas, bottom up, automatically
    //at a set rate.
    //I will need: 
    //  1. an object
    //  2. a movement control method (maybe a loop because no keys
    //      are used to manipulate movement)
    document.addEventListener('keydown', moveControl)

    