module.exports = function solveSudoku(matrix) {

  var sudokuLine = [1, 2, 3, 4, 5, 6, 7 , 8, 9];

  var freeNumbers = [];

  var tempMatrix = matrix;

  var storyMat = [];

  var tr = 0;

  // init story mat

  for(let i = 0; i < 9; i++){
    storyMat[i] = [];
    for(let j = 0; j < 9; j++){
      if(matrix[i][j] === 0){
        storyMat[i][j] = 0;
      } else {
        storyMat[i][j] = 1;
      }
    }
  }
  ////

  // init check matrix
  var tempSudoku = [];

  function clearMatrix(){
    for(let i = 0; i < 9; i++){
      for(let j = 0; j < 9; j++){
        if(storyMat[i][j] === 0){
          tempMatrix[i][j] = 0;
        }
      }
    }
  }

  function updateMatrix(){
    for(let i = 0; i < 9; i++){

      tempSudoku[i] = [];

      for(let j = 0; j < 9; j++){

        if(tempMatrix[i][j] === 0){
          var a = [];
          var b = [];
          var c = [];

          // x
          for(let x = 0; x < 9; x++){
            if(x !== j && tempMatrix[i][x] !==0){
              a.push(tempMatrix[i][x]);
            }
          }

          // y
          for(let y = 0; y < 9; y++){
            if(y !== i && tempMatrix[y][j] !==0){
              b.push(tempMatrix[y][j]);
            }
          }

          // cube
          for(let x = 0; x < 9; x = x+3){

            if(i >= x && i < x+3){

              for(let y = 0; y < 9; y = y+3){

                if(j >= y && j < y+3){

                  var str1 = tempMatrix[x].slice(y, y+3);
                  var str2 = tempMatrix[x+1].slice(y, y+3);
                  var str3 = tempMatrix[x+2].slice(y, y+3);

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


          if(freeNumbers.length === 0){
            console.log('error');
            //console.log(tempMatrix);
            //tempMatrix = matrix;
            //console.log('old');
            //console.log(tempMatrix);
            return false;
          }

          tempSudoku[i][j] = ['unset', freeNumbers];

        } else {
          tempSudoku[i][j] = ['set', []];
        }
      }
    }
  }

  function shortSet(){
    for(let n = 1; n <=9; n++){
      for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            if(tempSudoku[i][j][1].length === n){
              //console.log(tempSudoku[i][j][1]);
              return [i,j]
            }
        }
      }
    }
  }

  function remaing(){

    var numberOfUnset = 0;

    for(let i = 0; i < 9; i++){
      for(let j = 0; j < 9; j++){
        if(tempSudoku[i][j][0] == 'unset'){
          numberOfUnset++;
        }
      }
    }
    console.log(numberOfUnset);
    return numberOfUnset;
  }
  
  function isSolved(){
    
    for(let i = 0; i < 9; i++){
      for(let j = 0; j < 9; j++){
        if(tempSudoku[i][j][0] == 'unset'){
          return false;
        }
      }
    }

    return true;
  }

  var last = 0;

  do {

    if(last > 20){
      break;
    }

    var steps = 0;
    var z = tr;
    //copyMatrix();
    

    do{

      steps++;
  
      if(steps > 81){
        break;
      }
  

      if(updateMatrix() === false){
        break;
      };

  
      if(isSolved() === true){
        break;
      }
  
      var cord = shortSet();
  
      var x = cord[0];
      var y = cord[1];

      //

      var setLength = tempSudoku[x][y][1].length;

      if(setLength !== 1){
        if(z < setLength){
          tempMatrix[x][y] = tempSudoku[x][y][1][0+z];
          z = 0;
        } else {
          tempMatrix[x][y] = tempSudoku[x][y][1][setLength-1];
          z = z - setLength;
        }
      } else {
        tempMatrix[x][y] = tempSudoku[x][y][1][0];
      }
      

      //
      //remaing();
      //console.log('-----');
  
    } while(true);


    if(isSolved() === true){
      console.log('solved -' + tr);
      break;
    } else {
      console.log('not solved - ' + tr);
      clearMatrix();
      tr++;
    }

    last++;

  } while(true);

  /*
  console.log(tempMatrix);
  console.log('-----------------------------------');
  clearMatrix();*/
  console.log(tempMatrix);
  console.log('-----------------------------------');

  return matrix;
}
