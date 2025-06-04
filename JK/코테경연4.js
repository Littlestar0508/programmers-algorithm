// 아이디어
// 몫과 나머지로 판단 -> 자신의 몫보다 큰 경우를 판단 -> 본래의 몫에 더해주는 방식 -> 시간 복잡도 좀 에바일듯..
// 자기보다 몫이 작다면 온전히 그 숫자를 그대로 더해주기

// 2번째는 1차례에 사용하는 총 시간의 수를 모두 저장
// ex) 1:9시간 2:9시간 과 같이

function solution(N, T, time) {
  const answer = [];
  let spend = 0;

  while (true) {
    if (Math.max(...time) === 0) break;

    for (let i = 0; i < time.length; i++) {
      if (time[i] === 0) continue;
      if (time[i] > T) {
        spend += T;
        time[i] -= T;
      } else if (time[i] <= T) {
        spend += time[i];
        answer[i] = spend;
        time[i] = 0;
      }
    }
  }
  console.log(answer);
}

console.log(solution(3, 3, [4, 2, 3]));
