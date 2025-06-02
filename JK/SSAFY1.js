function solution(N, M, N_list, M_list) {
  N_list.sort((a, b) => b - a);
  M_list.sort((a, b) => a - b);

  const min = N_list[0];
  const max = M_list[0];

  if (min > max) return -1;

  return min;
}

console.log(solution(4, 3, [2, 3, 4, 2], [6, 8, 7]));
