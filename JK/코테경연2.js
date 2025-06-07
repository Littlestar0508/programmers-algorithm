function solution(N, score) {
  const minBoard = Array.from(Array(N), () => new Array(3).fill(0));
  const maxBoard = Array.from(Array(N), () => new Array(3).fill(0));

  minBoard[0][0] = score[0][0];
  minBoard[0][1] = score[0][1];
  minBoard[0][2] = score[0][2];
  maxBoard[0][0] = score[0][0];
  maxBoard[0][1] = score[0][1];
  maxBoard[0][2] = score[0][2];

  for (let i = 1; i < N; i++) {
    for (let j = 0; j < 3; j++) {
      if (j === 0) {
        minBoard[i][j] = Math.min(minBoard[i - 1][0], minBoard[i - 1][1]) + score[i][j];
        maxBoard[i][j] = Math.max(maxBoard[i - 1][0], maxBoard[i - 1][1]) + score[i][j];
      } else if (j === 1) {
        minBoard[i][j] = Math.min(minBoard[i - 1][0], minBoard[i - 1][1], minBoard[i - 1][2]) + score[i][j];
        maxBoard[i][j] = Math.max(maxBoard[i - 1][0], maxBoard[i - 1][1], maxBoard[i - 1][2]) + score[i][j];
      } else {
        minBoard[i][j] = Math.min(minBoard[i - 1][1], minBoard[i - 1][2]) + score[i][j];
        maxBoard[i][j] = Math.max(maxBoard[i - 1][1], maxBoard[i - 1][2]) + score[i][j];
      }
    }
  }

  const max = Math.max(...maxBoard[N - 1]);
  const min = Math.min(...minBoard[N - 1]);

  return `최소:${min} 최대:${max}`;
}

console.log(
  solution(3, [
    [1, 2, 3],
    [6, 5, 4],
    [7, 8, 9],
  ])
);
