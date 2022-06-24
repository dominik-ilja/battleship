https://codepen.io/P1N2O/pen/pyBNzX
https://mycolor.space/gradient3

# Tasks
- [X] ~~*Create a background gradient*~~ [2022-06-17]
- [X] ~~*Animate the background gradient*~~ [2022-06-17]
- [ ] Make sure that ships can only be placed on one board not both
- [ ] Create a start button after all the user's ships are placed
- [ ] once the start button is pressed the computer's ships should be randomly placed
- [ ] Should be able to fire on cells
- [ ] detect when all ships for a side are sunk
- [ ] updating score of the victor
- [ ] Give option to play again

# Review Functions
I need to go about making these functions uniform in what
input they should be expecting.
- [X] ~~*_shipWasPlaced*~~ [2022-06-22]
- [X] ~~*_dragover*~~ [2022-06-22]
- [X] ~~*_drop*~~ [2022-06-22]
- [X] ~~*_removeCellHTML*~~ [2022-06-22]
- [X] ~~*_allShipsPlaced*~~ [2022-06-22]
- [X] ~~*init*~~ [2022-06-22]
- [X] ~~*areCellsEmpty*~~ [2022-06-22]
- [X] ~~*updateCell*~~ [2022-06-22]
- [X] ~~*replaceCell*~~ [2022-06-22]
- [X] ~~*addShip*~~ [2022-06-22]
- [X] ~~*randomlyAddShips*~~ [2022-06-22]
- [X] ~~*get ships*~~ [2022-06-22]




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


# Board 
our board takes a size then generates a square board based off of that size.
Each cell on our board is an HTML element. We append these elements to the root
element that was passed to our board.

Each cell gets two event listeners. One that listens for an element being dragged over it
and another that listens for the element being dropped on it.


