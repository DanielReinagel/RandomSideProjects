const ranks = [];

const f = () => Math.floor(Math.random()*8);
const convertToRank = (rankArray) => {
  return rankArray.reduce((acc, value) => {
    if(value === 1){
        acc[1]++;
    } else {
      if(acc[1]){
        acc[0] += acc[1];
        acc[1] = 0;
      }
      acc[0] += value;
    }
    return acc;
  }, ["", 0]).reduce((a, b) => b ? a+b : a);
}

const K = [f(), f()];
const k = [f(), f()];
const B = [f(), f()];
const N = [f(), f()];

while(Math.abs(k[0]-K[0])<2 && Math.abs(k[1]-K[1])<2){
  k[0] = f();
  k[1] = f();
}
while(B[0]===k[0]&&B[1]===k[1] || B[0]===K[0]&&B[1]===K[1]){
  B[0] = f();
  B[1] = f();
}
while(N[0]===B[0]&&N[1]===B[1] || N[0]===k[0]&&N[1]===k[1] || N[0]===K[0]&&N[1]===K[1]){
  N[0] = f();
  N[1] = f();
}

for(let i = 0; i < 8; i++){
  const rank = [1, 1, 1, 1, 1, 1, 1, 1];
  if(K[0]===i) rank[K[1]] = "K";
  if(k[0]===i) rank[k[1]] = "k";
  if(B[0]===i) rank[B[1]] = "B";
  if(N[0]===i) rank[N[1]] = "N";
  ranks.push(convertToRank(rank));
}

console.log(`${ranks.join("/")} w - - 0 1`);