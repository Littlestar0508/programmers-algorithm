function solution(N, M, S, K, culture, edge) {
  const length = Array(N).fill(-1);
  const visited = Array(N).fill(-1);

  const indexArr = [];

  for (let i = 0; i < culture.length; i++) {
    length[culture[i] - 1] = 0;
    visited[culture[i] - 1] = 0;
    indexArr.push(culture[i]);
  }

  while (indexArr.length > 0) {
    const index = indexArr.shift();
    visited[index - 1] = 1;

    const connected = edge.filter((item) => item.includes(index));

    for (let j = 0; j < connected.length; j++) {
      const [x, y] = connected[j];
      if (x === index && visited[y - 1] === -1) {
        length[y - 1] = length[x - 1] + 1;
        visited[y - 1] = 0;
        indexArr.push(y);
      }
      if (y === index && visited[x - 1] === -1) {
        length[x - 1] = length[y - 1] + 1;
        visited[x - 1] = 0;
        indexArr.push(x);
      }
    }
  }
  const answer = length.filter((item) => item <= S);
  return answer.length;
}

console.log(
  solution(
    6,
    6,
    1,
    2,
    [4, 5],
    [
      [1, 2],
      [1, 3],
      [2, 3],
      [1, 4],
      [2, 5],
      [3, 6],
    ]
  )
);
