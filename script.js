"use strict";

(function() {

     let board = ["", "", "", "", "", "", "", "", ""];
     const POSITIONS = ["top-left", "top-middle", "top-right", "middle-left", "middle-middle", "middle-right", "bottom-left", "bottom-middle", "bottom-right"];

     window.onload = function() {
          initBoard();
     };

     // initializes the board state
     function initBoard() {
          let boxes = document.querySelectorAll(".box");
          for (let i = 0; i < boxes.length; i++) {
               boxes[i].onclick = function() {
                    if (this.firstElementChild.innerHTML == "" && !winning(board, "O")) {
                         $$("cocky").disabled = true;
                         board[POSITIONS.indexOf(boxes[i].id)] = "X";
                         this.firstElementChild.innerHTML = "X";
                         respond();
                         if (isFull(board)) {
                              alert("It's a draw!");
                         }
                    }
               };
          }
          $$("rematch").onclick = initBoard;
          $$("cocky").onclick = function() {
               $$("cocky").disabled = true;
               applyMove(4);
          }
          $$("cocky").disabled = false;;
          for (let i = 0; i < board.length; i++) {
               board[i] = "";
          }
          boxes = document.querySelectorAll(".box");
          for (let i = 0; i < boxes.length; i++) {
               boxes[i].firstElementChild.innerHTML = "";
          }
     }

     // executes minimax and then applies the best possible move
     function respond() {
          let best = minimax(board.slice(0), "O");
          if (best.move > -1) {
               applyMove(best.move);
          }
     }

     // recursive algorithm that returns the best possible move
     function minimax(boardCopy, player) {

          if (winning(boardCopy, switchPlayer(player))) {
               let move = {move: -1, value: -1};
               return move;
          } else if (winning(boardCopy, player)) {
               let move = {move: -1, value: 1};
               return move;
          } else if (isFull(boardCopy)) {
               let move = {move: -1, value: 0};
               return move;
          }

          let best = {move: -1, value: -2};

          for (let i = 0; i < boardCopy.length; i++) {
               if (boardCopy[i] === "") {
                    let boardWithMove = boardCopy.slice(0);
                    boardWithMove[i] = player;
                    let curr = negate(minimax(boardWithMove, switchPlayer(player)));
                    if (curr.value > best.value) {
                         best.value = curr.value;
                         best.move = i;
                    }
               }
          }

          return best;
     }

     // returns true if there are no moves left
     function isFull(boardCopy) {
          let count = 0;
          for (let i = 0; i < boardCopy.length; i++) {
               if (boardCopy[i] == "") {
                    return false;
               }
          }
          return true;
     }

     // negates the value of a move
     function negate(move) {
          move.value = -move.value;
          return move;
     }

     // returns "X" if player is "O" and vice-versa
     function switchPlayer(player) {
          if (player == "X") {
               return "O";
          } else { // player == "O"
               return "X";
          }
     }

     // updates the board with the given move
     function applyMove(move) {
          board[move] = "O";
          let id = POSITIONS[move];
          let box = document.querySelector("#" + id);
          box.firstElementChild.innerHTML = "O";
          if (winning(board, "O")) {
               alert("You lost!");
          }
     }

     // returns true if the given player is in a winning board state
     function winning(boardCopy, player) {
          if ( (boardCopy[0] == player && boardCopy[1] == player && boardCopy[2] == player) ||
               (boardCopy[3] == player && boardCopy[4] == player && boardCopy[5] == player) ||
               (boardCopy[6] == player && boardCopy[7] == player && boardCopy[8] == player) ||
               (boardCopy[0] == player && boardCopy[3] == player && boardCopy[6] == player) ||
               (boardCopy[1] == player && boardCopy[4] == player && boardCopy[7] == player) ||
               (boardCopy[2] == player && boardCopy[5] == player && boardCopy[8] == player) ||
               (boardCopy[0] == player && boardCopy[4] == player && boardCopy[8] == player) ||
               (boardCopy[2] == player && boardCopy[4] == player && boardCopy[6] == player) ) {
               return true;
          }
          return false;
     }

     // returns the DOM element of the given id
     function $$(id) {
          return document.getElementById(id);
     }

})();
