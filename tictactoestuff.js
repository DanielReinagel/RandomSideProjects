const moveList = {};
const start = [0, 0, 0, 0, 0, 0, 0, 0, 0];

makeAllMoves(start, moveList);

function botMove(moveList, movesArr){
  let list = moveList;
  for(let i = 0; i < movesArr.length; i++)
    list = list[movesArr[i]];
  let options = Object.keys(list);
  
  console.log(`options before: ${options}`);
  
  const outcomes = [];
  for(let i = 0; i < options.length; i++)
    outcomes.push(resultWithBestPlay(list[options[i]]));
  const bestOutcome = Math.max(...outcomes);
  
  console.log(`bestOutcome: ${bestOutcome}, outcomes:`, outcomes);
  
  options = options.filter((opt, idx) => outcomes[idx]===bestOutcome);
  
  console.log(`options after: ${options}`);
  
  return options[Math.floor(Math.random()*options.length)];
}

function resultWithBestPlay(list){
  if(typeof list === "number") return list===0 ? 1 : 2;
  let output = 2;
  const enemyOptions = Object.values(list);
  for(let i = 0; i < enemyOptions.length; i++){
    if(typeof enemyOptions[i] === "number"){
      if(enemyOptions[i] === 0) output = Math.min(1, output);
      else return 0;
    } else {
      let best = 0;
      const myOptions = Object.values(enemyOptions[i]);
      for(let j = 0; j < myOptions.length; j++)
        best = Math.max(best, resultWithBestPlay(myOptions[j]));
      output = Math.min(output, best);
    }
  }
  return output;
}

console.log(botMove(moveList, [1,4,7]));
const movesArr = [];
for(let i = 0; i < 9; i++){
  movesArr.push(botMove(moveList, movesArr));
}
console.log(movesArr);

function makeAllMoves(board, moveList){
  const options = board.reduce((acc, val, idx) => val ? acc : [...acc, idx], []);
  const player = options.length%2 ? 1 : 2;
  for(let i = 0; i < options.length; i++){
    moveList[options[i]] = {};
    const tempBoard = [...board];
    tempBoard[options[i]] = player;
    const result = checkIfGameEnded(tempBoard);
    if(result!==false){
      moveList[options[i]] = result;
    } else {
      makeAllMoves(tempBoard, moveList[options[i]]);
    }
  }
}

function checkIfGameEnded(board){
  if(board[0] && (board[0]===board[1]&&board[1]===board[2] || board[0]===board[4]&&board[4]===board[8] || board[0]===board[3]&&board[3]===board[6]))
    return board[0];
  else if(board[4] && (board[1]===board[4]&&board[4]===board[7] || board[2]===board[4]&&board[4]===board[6] || board[3]===board[4]&&board[4]===board[5]))
    return board[4];
  else if(board[8] && (board[2]===board[5]&&board[5]===board[8] || board[6]===board[7]&&board[7]===board[8]))
    return board[8];
  else if(board.find(x=>x===0)!==0)
    return 0;
  else
    return false;
}