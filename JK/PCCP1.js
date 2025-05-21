function solution(n, k, core, score) {
  const answer = [];

  for (let i = 0; i < score.length; i++) {
    const sum = score[i].reduce((acc, cur) => acc + cur, 0);
    let chk = true;
    for (let j = 0; j < core.length; j++) {
      if (score[i][j] < 3) chk = false;
    }

    if (sum >= k && chk) answer.push(i + 1);
  }

  return answer.join(" ");
}

console.log(
  solution(
    5,
    20,
    [1, 3],
    [
      [3, 10, 20, 11, 6],
      [2, 10, 10, 11, 6],
      [3, 10, 7, 11, 6],
      [3, 10, 20, 1, 6],
    ]
  )
);
