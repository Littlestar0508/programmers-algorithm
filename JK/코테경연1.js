function solution(N, K, time) {
  let answer = N;
  const diff = [];
  for (let i = 0; i < N - 1; i++) {
    diff[i] = time[i + 1] - time[i];
    answer += time[i + 1] - time[i] - 1;
  }

  diff.sort((a, b) => b - a);

  for (let i = 0; i < K - 1; i++) {
    answer -= diff[i] - 1;
  }

  return answer;
}

console.log(solution(3, 2, [1, 3, 6]));
