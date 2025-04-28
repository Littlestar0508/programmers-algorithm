// 미해결
// 시간을 부여하고 그에 따른 나머지를 비교하며 일을 부여할 수 있는지를 판단하는 방식 채택
// 정확도,효율성 모두 통과X

function solution(n, cores) {
  let answer = 0;
  let time = 0;

  while (n > 0) {
    for (let i = 0; i < cores.length; i++) {
      if (time % cores[i] === 0 && n > 0) {
        answer = cores[i];
        n--;
      }
    }

    time++;
  }

  return answer;
}

console.log(solution(10, [2, 7, 3]));
