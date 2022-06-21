- [References](#references)
- [Grid.js](#gridjs)
  - [Properties](#properties)
    - [size](#size)
    - [cells](#cells)
      - [Cell States](#cell-states)
  - [Methods](#methods)
    - [init](#init)
    - [updateCell](#updatecell)
      - [parameters](#parameters)
        - [row](#row)
        - [col](#col)
        - [cellState](#cellstate)
        - [targetPlayer](#targetplayer)
    - [isUndamagedShip](#isundamagedship)
    - [isMiss](#ismiss)
    - [isDamagedShip](#isdamagedship)
    - [get size](#get-size)
[row](#parameters)
        - [col](#col)
        - [cellState](#cellstate)
        - [targetPlayer](#targetplayer)
    - [isUndamagedShip](#isundamagedship)
    - [isMiss](#ismiss)
    - [isDamagedShip](#isdamagedship)
    - [get size](#get-size)
[size](#size)
[cells](#cells)
      - [Cell States](#cell-states)
  - [Methods](#methods)
    - [init](#init)

# References
-

# Grid.js

The Grid deals with creating the two grids used by the user & computer.

## Properties

### size
The size property determines the dimensions for the grid. The grid will be equal
in width and height. So, if we pass 9 for the size then we'll have a 9 columns wide
and 9 row high grid.

### cells
The cells property is an array that contains sub-arrays that represent each row.
Each row then has columns. Each element of these sub-arrays is represented by
a number. The number represents various states that the cell can be in.

#### Cell States
- 0 (Empty) : Represents an empty cell or simply a cell that hasn't been interacted with.
- 1 (Ship)  : Represents a cell that part of a ship has been placed on.
- 2 (Miss)  : Represents a cell that has been fired on, but no ship was located there.
- 3 (Hit)   : Represents a cell that has been fired on, and a ship was located there.
- 4 (Sunk)  : Represents a cell of a ship that has been sunk.

## Methods

### init
Creates the rows and columns of the grid. The amount of rows and columns is determined
by the size property. Each column of every row is given a default value of `0`.

### updateCell
Is used to update a single cell within our grid. It Takes four parameters.
It locates the cell based off of the row & col arguments passed. Then, it uses
the target player to determine which css to utilize. 

We then update the cell's state iside our grid and then update the dom's corresponding cell.
Updating its CSS classes to reflect the changes made.

#### parameters

##### row 
A number representing the row we wish to update. Starts at 0. Will error if number isn't in range.

##### col 
A number representing the column within the row we wish to update. Starts at 0.
Will error if number isn't in range.

##### cellState
A number representing a cell state. Will error if the state can't be found.

##### targetPlayer
0 or 1 representing the user or computer grid respectively. Will error if not one of these numbers.

### isUndamagedShip

### isMiss

### isDamagedShip

### get size






