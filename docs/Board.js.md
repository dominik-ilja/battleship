- [References](#references)
- [TODO](#todo)
- [Board.js](#boardjs)
  - [Properties](#properties)
    - [size](#size)
    - [grid](#grid)
    - [root](#root)
  - [Methods](#methods)
    - [Private](#private)
      - [createCell](#createcell)
        - [States (cell.dataset.state)](#states-celldatasetstate)
      - [dragover](#dragover)
      - [drop](#drop)
    - [Public](#public)
      - [init](#init)
      - [areCellsEmpty](#arecellsempty)
        - [Parameters](#parameters)
      - [updateCell](#updatecell)
        - [Parameters](#parameters-1)

# References


# TODO
- [X] ~~*The board needs to detect when an element will overflow the grid*~~ [2022-06-19]
- [X] ~~*The board needs to detect when a ship is being placed ontop of another ship*~~ [2022-06-20]
- [ ] Create ships class
  - [ ] Should create 
- [ ]
- [ ]
- [ ]




# Board.js
Represents a game board. This creates and updates the elements related to our game.

## Properties

### size
Size represents the amount of rows and columns within the board.

### grid
Grid is an exact model of what the game board looks like.

### root 
This is the element that will have the cells we create appended inside of it.

## Methods

### Private

#### createCell
Creates a board cell. A cell is a div HTML Element. It's given a class of `cell`
and styling is dependent on the user. There are also multiple dataset attributes given
to it. These dataset attributes provide us with information about what row & col 
the cell is in and the code of the cell.

##### States (cell.dataset.state)
The states on a cell provide us with information about the cell. The states are:
1. empty : nothing is placed in the cell
2. ship : a ship is located in the cell
3. hit : a ship that has been damaged
4. miss : the cell has been clicked on, but no ship was located in the cell
5. sunk : the cell is apart of a ship that has been completely destroyed

#### dragover
dragover is used only for our cells. It's used with the dragover event to make
an area able to recieve drop events.

#### drop
drop is used with our cells and their drop events.

### Public

#### init
This initializes our board. It does so by creating a row up to the size property.
These rows are then filled with "cells". Cells are made using createCell private method.
These cells are then pushed to the grid property and appended to the root property.

#### areCellsEmpty
The `areCellsEmpty` method takes four parameters. It returns a boolean whether all 
the cells are empty or not.

##### Parameters
**row (number)**

- The starting row to begin checking

**rowSpan (number)**

- How many rows should be checked. Must be at least `1` to check a single row.

**col (number)**

- The starting column to begin checking

**colSpan (number)**

- How many columns should be checked. Must be at least `1` to check a single column.



```js
areCellsEmpty(row, rowSpan, col, colSpan)
```

#### updateCell
Takes three parameters.

##### Parameters
**row (number)**

- The row of the cell to be updated.

**col (number)**

- The column of the cell to be updated.

**options**

- An object that has the following keys :

```js
// options
{
  css: null, // string, represeting a css class to add to the cell
  state: null // string, must be one of the cell states
}
```
