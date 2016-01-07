(function() { 
  angular.module('ticTacToe', [])
  .controller('ticTacToeController', function() {
   var vm = this;
   vm.message = '';
   vm.gameOver = false;
   vm.current = 'X';
   vm.remaining = 9;
   vm.matrix = [['','',''], ['','',''], ['','','']];
  
    vm.toggle = function(x, y) {
      if (!vm.gameOver && isValidMove(x, y)) {
        vm.matrix[x][y] = vm.current;
        vm.remaining -= 1;
        checkForEndGame(x, y);
        vm.current = vm.current === 'X'? 'O': 'X';
      } else {
        console.log('Start a new game!');
      }
   };
    
    vm.newGame = function() {
      vm.matrix = [['','',''], ['','',''], ['','','']];
      vm.gameOver = false;
      vm.message = '';
      vm.current = 'X';
      vm.remaining = 9;
    };
    
   function checkForEndGame(x, y)  {
     //horizontal victory
     if (checkForVictory({x: x, y: 0}, {x: x, y: 1}, {x: x, y: 2})) {
       return endGame('Player ' + vm.current + ' wins!');
     //vertical victory
     }
     if (checkForVictory({x: 0, y: y}, {x: 1, y: y}, {x: 2, y: y})) {
       return endGame('Player ' + vm.current + ' wins!');
     //diagonal victory
     }
     if (x === y) {
       if (checkForVictory({x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2})) {
         return endGame('Player ' + vm.current + ' wins!');
       }
     }
     //diagonal victory
     if (x + y === 2) {
       if (checkForVictory({x: 2, y: 0}, {x: 1, y: 1}, {x: 0, y: 2})) {
         return endGame('Player ' + vm.current + ' wins!');
       }
     }
     
     if (checkForTie()) {
       return endGame('It\'s a tie!');
     }
   }
    
  function checkForVictory(pos1, pos2, pos3) {
    return (vm.matrix[pos1.x][pos1.y] === vm.current && vm.matrix[pos2.x][pos2.y] === vm.current && vm.matrix[pos3.x][pos3.y] === vm.current);
    }
    
  function checkForTie() {
    return vm.remaining === 0;
  }
  
  function endGame(message) {
    vm.message = message;
    vm.gameOver = true;
    return true;
  }
    
  function isValidMove(x, y) {
    return !vm.matrix[x][y];
  }
    
 });
}());