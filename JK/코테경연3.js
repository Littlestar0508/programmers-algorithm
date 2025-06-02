function solution(N, M, S, K, culture, edge) {
  const length = Array(N).fill(-1);
  const visited = Array(N).fill(-1);

  for (let i = 0; i < culture.length; i++) {
    length[culture[i] - 1] = 0;
    visited[culture[i] - 1] = 0;
  }

  while (true) {
    if (visited.indexOf(-1) === -1) break;

    const index = visited.indexOf(0) + 1;
    visited[index - 1] = 1;
    const connected = edge.filter((item) => item.includes(index));

    for (let i = 0; i < connected.length; i++) {
      const [x, y] = connected[i];
      if (x === index && visited[y - 1] === -1) {
        length[y - 1] = length[x - 1] + 1;
        visited[y - 1] = 0;
      }
      if (y === index && visited[x - 1] === -1) {
        length[x - 1] = length[y - 1] + 1;
        visited[x - 1] = 0;
      }
    }
  }
  const answer = length.filter((item) => item <= S);
  return length;
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
