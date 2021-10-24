//1. Set up my project to use Canvas
//  A. Add Easel Element on HTML
//  B. Create a main function that runs on DOMContentLoaded that accesses canvas context using the
//  getContext method on our canvas element. Set our context to 2d
//  C. Instead of setting hard-coded dimensions for the width and height attributes, use getComputedStyle()
//  so that the canvasArea is responsive (adjusts automatically per the screen size.)

    //Get our canvas element via the id
    const game = document.getElementById('canvasArea');
    const h1 = document.getElementById('heading')
    //Set the dimensions of the canvas area to be responsive by using getComputedStyle
    // game.setAttribute('width', getComputedStyle(game)['width'])
    // game.setAttribute('height', getComputedStyle(game)['height'])   
    game.setAttribute('width', getComputedStyle(game)['width'])
    game.setAttribute('height', getComputedStyle(game)['height'])