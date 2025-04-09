function solution(k, ranges) {
  const answer = [];
  const surface = [];

  // 반복문을 통해 우박수열 정의
  // 우박수열을 정의할때 구간별 넓이도 같이 정의
  while (k > 1) {
    const init = k;
    if (k % 2 === 0) {
      k /= 2;
      surface.push((init + k) / 2);
    } else {
      k *= 3;
      k += 1;
      surface.push((init + k) / 2);
    }
  }

  for (let i = 0; i < ranges.length; i++) {
    let sum = 0;
    // 시작점과 종료점 설정
    const start = ranges[i][0];
    const end = surface.length + ranges[i][1];

    // 정상 구간과 그렇지 않은 구간 설정
    if (start <= end) {
      for (let j = start; j < end; j++) {
        sum += surface[j];
      }
    } else {
      sum = -1;
    }

    answer.push(sum);
  }

  return answer;
}

console.log(
  solution(5, [
    [0, 0],
    [0, -1],
    [2, -3],
    [3, -3],
  ])
);
