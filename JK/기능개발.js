function solution(progress, speeds) {
  const minus = progress.map((e, idx) => Math.ceil((100 - e) / speeds[idx]));
  let answer = Array(minus.length + 1).fill(0);
  let idx = 0;
  let max = -1;

  for (let i = 0; i < minus.length; i++) {
    if (max < minus[i]) {
      max = minus[i];
      idx++;
      answer[idx]++;
    } else {
      answer[idx]++;
    }
  }

  answer = answer.filter((e) => e !== 0);
  return answer;
}

console.log(solution([95, 90, 99, 99, 80, 99], [1, 1, 1, 1, 1, 1]));
