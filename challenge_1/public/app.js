console.log('app.js loaded!');

////////////////////////MODEL/////////////////////////////
var model = {
  //count hash table to keep track of next play should be X or O
  count: {
    'X': 0,
    'O': 0
  },

  //placement hash table to keep track of all row/col/diag
  placement: {
    row: [0, 0, 0],
    col: [0, 0, 0],
    diagonal: [0, 0]
  },

  //lastWinner to keep track of X or O goes first in next round
  lastWinner:'X'
}

/////////////////////////VIEW/////////////////////////////////
var view = {
  resetMessage: function() {
    var lastWinner = document.getElementById('player' + model.lastWinner).value || model.lastWinner;
    document.getElementById('message').innerHTML = lastWinner + ' Starts First';
  },

  nextMoveMessage: function(player) {
    var nextPlayer = document.getElementById('player' + player).value || player;;
    document.getElementById('message').innerHTML = nextPlayer + ', it\'s your turn!';
  },

  drawMessage: function() {
    document.getElementById('message').innerHTML = 'DRAW! GAME OVER!';
  },

  winMessage: function(player) {
    var name = document.getElementById('player' + player).value || player;
    document.getElementById('message').innerHTML = 'WINNER IS ' + name + '! GAME OVER!';
  },

  placePiece: function(e, player) {
    e.target.innerHTML = player;
    if (player === 'X') {
      e.target.style.color = "black";
    } else {
      e.target.style.color = "white";
    }
  },

  addTallyCount: function(player) {
    document.getElementById(player).innerHTML++;
  }
}

//gameover message html
var message = document.getElementById('message');

//////////////////////////CONTROLLER///////////////////////////
var controller = {
  //addXToPlacement function
  //when placing X, add 1 to corresponding row, col, diagonal
  addXToPlacement: function(rowIndex, colIndex) {
    model.placement.row[rowIndex]++;
    model.placement.col[colIndex]++;
    if (rowIndex === colIndex) {
      model.placement.diagonal[0]++;
    }
    if (rowIndex + colIndex === 2) {
      model.placement.diagonal[1]++;
    }
  },

  //addOToPlacement function
  //when placing O, subtract 1 to corresponding row, col, diagonal
  addOToPlacement: function(rowIndex, colIndex) {
    model.placement.row[rowIndex]--;
    model.placement.col[colIndex]--;
    if (rowIndex === colIndex) {
      model.placement.diagonal[0]--;
    }
    if (rowIndex + colIndex === 2) {
      model.placement.diagonal[1]--;
    }
  },

  //checkGame function
  //check if there are 9 placements
  //if yes, serve up draw message html
  //check table if there are 3 X or O in a row/col/diag
  //if yes,
  //1) serve up winner message html
  //2) add win count to tally html
  //once game over, remove event listener on all cells
  checkGame: function() {
    if (model.count.X + model.count.O === 9) {
      view.drawMessage();
    }
    if (model.placement.row.indexOf(3) > -1 || model.placement.col.indexOf(3) > -1 || model.placement.diagonal.indexOf(3) > -1) {
      view.winMessage('X');
      model.lastWinner = 'X';
      view.addTallyCount('tallyX')
      board.removeEventListener('click', controller.play);
    }
    if (model.placement.row.indexOf(-3) > -1 || model.placement.col.indexOf(-3) > -1 || model.placement.diagonal.indexOf(-3) > -1) {
      view.winMessage('O');
      model.lastWinner = 'O';
      view.addTallyCount('tallyO')
      board.removeEventListener('click', controller.play);
    }
  },

  //reset game function
  //when <button> is clicked,
  //1) clear all X and O on the board
  //2) reset count hash table
  //3) clear game over message div
  //4) restart event listener on each cell
  reset: function() {
    var cells = document.getElementsByTagName('td');
    for (var i = 0; i < cells.length; i++) {
      if (cells[i].innerHTML) {
        cells[i].innerHTML = '';
      }
    }

    model.count.X = 0;
    model.count.O = 0;

    model.placement = {
      row: [0, 0, 0],
      col: [0, 0, 0],
      diagonal: [0, 0]
    }

    view.resetMessage();

    board.addEventListener('click', controller.play);
  },

  //play function
  //when click on <td>, place an X or O to the cell
  //then call addToPlacement() to add value to the placement hash table
  //when placement is 5 or more, call checkGame()
  play: function(e) {
    if (!e.target.innerHTML) {
      var idRow = parseInt(e.target.id.charAt(0));
      var idCol = parseInt(e.target.id.charAt(1));
      if (model.lastWinner === 'X' && model.count.X === 0
      || model.lastWinner === 'X' && model.count.X === model.count.O
      || model.lastWinner === 'O' && model.count.O - model.count.X === 1) {
        view.placePiece(e, 'X');
        model.count.X++;
        controller.addXToPlacement(idRow, idCol);
        view.nextMoveMessage('O');
      } else {
        view.placePiece(e, 'O');
        model.count.O++;
        controller.addOToPlacement(idRow, idCol);
        view.nextMoveMessage('X');
      }
      if (model.count.X + model.count.O >= 5) {
        controller.checkGame();
      }
    }
  }
}

//add event listner to the board
var board = document.getElementById('board');
board.addEventListener('click', controller.play)

//add event listener to 'new game' button
var button = document.getElementById('reset');
button.addEventListener('click', controller.reset);