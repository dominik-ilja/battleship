# Battleship

## Live Site
https://battleship-ilja.netlify.app/

## Technologies
1. HTML
2. Sass
3. JavaScript
4. Parcel

### HTML
The building block of websites. Very little was used within directly within the `index.html` file.

### Sass
Sass stands for Syntactically Awesome Stylesheet. It is a preprocessor for CSS. It allows us to use a different syntax
that I think makes writting styles easier. I use a version of Sass called SCSS, which uses braces to designate code 
blocks rather than indenation like pure Sass. These filese then get compiled into CSS which is what is then given to our HTML files for styling.

### JavaScript
The main components of this project. We used a lot of different topics, Classes, Modules, a Bundler, 
Promises / Async Await, etc. I tried to separate concerns to each individual class, and to do my best to adhere 
to programming principles. I used parcel to allow me to seperate my JavaScript files.

## Approach
Going into this I've seen other people do projects like this. I read the code and played with other battle ship 
projects online to get a feel for what I wanted to do. There were a lot of interesting things I saw people do.
Being able to drag and drop ships, to displaying a coordinate based off of where your cursor is at, to shadowing 
in cells of where your ship would be placed.

I started off by just placing everything into functions and just getting it to work. Then, I thought about what 
variables and functions were interacting the most together and placing them into a class. I knew I wanted to have
two representations of my grid. One would be in the browser and another would be stored in JavaScript. Allowing for the changes to occur through JavaScript rather than having to reach into the browser for the information.

Each, "cell" of the grid was represented by a `Cell` object. This cell has properties that would are updated
to reflect the state of the cell. We also have a `Ship` object representing our ships. Both of these objects would
be kept in our `Board` object. 

## Challenges
1. Drag Events
2. Custom Events
3. Indicating Cells VS. Ships in Board Class
4. Waiting for User Click
5. Hiding computer's ships
6. Extracting information into relevant classes
7. Transition buttons with linear gradients
8. Detecting correct ship placement
9. Updating specific ship segment 


## Extra Features
1. Making the AI smarter
2. Instructions on how to play the game
3. Indicator of who's turn it is
4. Making sunk ship colors more contrasting
5. Add animations to cells & ships to move them slightly
6. Have the game say "You Win!" or "You Lose" before transitioning to "Play Again?" text


## Objectives

### Design
1. Create a background gradient
   1. animate the background gradient to represent water moving
2. Create grids for yourself & opponent
   1. Grid and column gaps should both be equal in width
   2. grid tiles should be mostly transparent (think sea foam)
   3. missed tiles will be colored in black
   4. hovered tiles will be white if there's nothing within the tile
      1. our ship pegs will be slightly darken when hovered. 
         doesn't matter if they're hit or not
      2. hit or missed tiles will also darken slightly
3. A model of the enemy's current fleet will be model beneath their field
   1. When an enemy ship is full destroyed the pegs of the ship will animate red
4. Two red lines will follow the mouse cursor representing "coordinates"
5. Above each grid will be a score for each player
6. All text on the board should be the same color as the grid tiles

### Logic
1. When the user moves the cursor the "coordinate lines" should follow it
2. User should be able to randomly position their ships
3. User should be able to drag their ships onto the board
4. An option to rotate the ship once it's been clicked
5. An option to continue once all our ships are placed should be enabled
6. Should detect if a ship is being placed in an already occupied spot
7. Should detect clicks on only the opponent's side after the user has continued
8. Should detect if it has clicked on an enemy ship
9. Should detect when a game is completed
10. Should update the score of whoever won
11. Should allow for a user to play again once a game is completed
