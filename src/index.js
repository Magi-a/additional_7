module.exports = function solveSudoku(matrix) {

  var sudokuLine = [1, 2, 3, 4, 5, 6, 7 , 8, 9];

  var freeNumbers = [];

  // init check matrix
  var tempSudoku = [];

  for(let i = 0; i < 9; i++){
    tempSudoku[i] = [];
    for(let j = 0; j < 9; j++){

      tempSudoku[i][j] = [0, []];
    }
  }
  //

  for(var i = 0; i < 9; i++){
    for(var j = 0; j < 9; j++){

      if(matrix[i][j] === 0){
        var a = [];
        var b = [];
        var c = [];

        // x
        for(let x = 0; x < 9; x++){
          if(x !== j && matrix[i][x] !==0){
            a.push(matrix[i][x]);
          }
        }

        // y
        for(let y = 0; y < 9; y++){
          if(y !== i && matrix[y][j] !==0){
            b.push(matrix[y][j]);
          }
        }

        // cube
        for(let x = 0; x < 9; x = x+3){

          if(i >= x && i < x+3){

            for(let y = 0; y < 9; y = y+3){

              if(j >= y && j < y+3){

                var str1 = matrix[x].slice(y, y+3);
                var str2 = matrix[x+1].slice(y, y+3);
                var str3 = matrix[x+2].slice(y, y+3);

                c = str1.concat(str2, str3);
                c = c.filter(function(el){
                  return el !== 0;
                });

              }
            }
          }
        }

        freeNumbers = sudokuLine
          .filter(el => a.indexOf(el) == -1 && b.indexOf(el) == -1 && c.indexOf(el) == -1);

        
        console.log("sudoku Line = " + sudokuLine);
        console.log("x - " + a);
        console.log("y - " + b);
        console.log("cube - " + c);
        console.log("free numb = " + freeNumbers);
        console.log(matrix);

      }

    }
  }

  //console.log(matrix);
  return matrix;
}
