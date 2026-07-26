function solution(N, arr) {
  let answer = 1;

  const dp = Array(N).fill(1);

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[j] < arr[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }

    answer = Math.max(...dp);
  }

  return answer;
}

console.log(solution(5, [1, 3, 2, 5, 4]));
