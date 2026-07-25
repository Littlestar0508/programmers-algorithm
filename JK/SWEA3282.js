function solution(N, K, items) {
  const dp = Array.from({ length: N + 1 }, () => Array(K + 1).fill(0));

  for (let i = 1; i <= N; i++) {
    const [volume, value] = items[i - 1];

    for (let c = 0; c <= K; c++) {
      dp[i][c] = dp[i - 1][c];

      if (volume <= c) {
        dp[i][c] = Math.max(dp[i][c], dp[i - 1][c - volume] + value);
      }
    }
  }

  return dp[N][K];
}

console.log(
  solution(4, 5, [
    [1, 2],
    [3, 2],
    [4, 4],
    [2, 3],
  ]),
);
