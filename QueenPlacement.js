function initiate(x){
  const spots = [];
  for(let i = 0; i < x; i++){
    spots.push(i);
  }
  return solveIt([], spots);
}

function solveIt(chosen, spots){
  if(spots.length){
    for(let i = 0; i < spots.length; i++){
      let result = solveIt([...chosen, spots[i]], spots.filter((_, idx) => i!==idx));
      if(result) return result;
    }
    return false;
  } else {
    let success = true;
    for(let i = 0; i < chosen.length; i++){
      if(!success) break;
      let s1 = chosen[i];
      for(let j = 0; j < chosen.length; j++){
        if(i===j) continue;
        let s2 = chosen[j];
        if(Math.abs(i-j)===Math.abs(s1-s2)){
          success = false;
          break;
        }
      }
    }
    if(success) return chosen;
    else return false;
  }
}

console.log(initiate(9));