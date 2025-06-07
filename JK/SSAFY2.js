function solution(N, K, N_list) {
  let answer = 0;
  N_list.sort((a, b) => a - b);

  const diff = [];

  for (let i = 0; i < N - K + 1; i++) {
    diff[i] = N_list[i + K - 1] - N_list[i];
  }

  const min = Math.min(...diff);
  const start = diff.indexOf(min);

  for (let i = start; i < start + K - 1; i++) {
    for (let j = start + 1; j < start + K; j++) {
      answer += N_list[j] - N_list[i];
    }
  }

  return answer;
}

console.log(solution(5, 3, [3, 5, 1, 8, 6]));
