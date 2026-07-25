function solution(N, M, K, mcr) {
  const dir = [
    [0, 0],
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const reverseDir = [0, 2, 1, 4, 3];
  let sum = 0;

  for (const detail of mcr) {
    map[detail[0]][detail[1]] = detail[2];
  }

  for (let i = 0; i < M; i++) {
    const newMcr = [];

    const newMap = Array.from({ length: N }, () => Array(N).fill(null));

    for (const detail of mcr) {
      const [x, y, count, direction] = detail;

      const nx = x + dir[direction][0];
      const ny = y + dir[direction][1];

      const isBoundary = nx === 0 || nx === N - 1 || ny === 0 || ny === N - 1;

      const live = isBoundary ? Math.floor(count / 2) : count;

      const newDir = isBoundary ? reverseDir[direction] : direction;

      if (live === 0) continue;

      if (newMap[nx][ny] === null) {
        newMap[nx][ny] = [live, newDir, live];
      } else {
        newMap[nx][ny][0] += live;

        if (newMap[nx][ny][2] < live) {
          newMap[nx][ny][1] = newDir;
          newMap[nx][ny][2] = live;
        }
      }
    }

    for (let x = 0; x < N; x++) {
      for (let y = 0; y < N; y++) {
        if (newMap[x][y] !== null) {
          const [total, direction] = newMap[x][y];

          newMcr.push([x, y, total, direction]);
        }
      }
    }

    mcr = newMcr;
  }

  for (const item of mcr) {
    sum += item[2];
  }

  return sum;
}

console.log(
  solution(7, 2, 9, [
    [1, 1, 7, 1],
    [2, 1, 7, 1],
    [5, 1, 5, 4],
    [3, 2, 8, 4],
    [4, 3, 14, 1],
    [3, 4, 3, 3],
    [1, 5, 8, 2],
    [3, 5, 100, 1],
    [5, 5, 1, 1],
  ]),
);
