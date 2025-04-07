// https://school.programmers.co.kr/learn/courses/30/lessons/389480

function solution(info, n, m) {
  const memo = new Map();

  function dfs(index, sum_a, sum_b) {
    if (sum_a >= n || sum_b >= m) return Infinity;
    if (index === info.length) return sum_a;

    const key = `${index},${sum_a},${sum_b}`;
    if (memo.has(key)) return memo.get(key);

    const set_a = dfs(index + 1, sum_a + info[index][0], sum_b);
    const set_b = dfs(index + 1, sum_a, sum_b + info[index][1]);
    const result = Math.min(set_a, set_b);

    memo.set(key, result);

    return result;
  }

  const answer = dfs(0, 0, 0);
  return answer === Infinity ? -1 : answer;
}

console.log(
  solution(
    [
      [1, 2],
      [2, 3],
      [2, 1],
    ],
    4,
    4
  )
);
