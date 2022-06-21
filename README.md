# Battleship

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
