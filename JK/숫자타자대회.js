function solution(numbers) {
  let answer = 0;

  // 가중치 배열
  const keyboard = [
    [1, 7, 6, 7, 5, 4, 5, 3, 2, 3],
    [7, 1, 2, 4, 2, 3, 5, 4, 5, 6],
    [6, 2, 1, 2, 3, 2, 3, 5, 4, 5],
    [7, 4, 2, 1, 5, 3, 2, 6, 5, 4],
    [5, 2, 3, 5, 1, 2, 4, 2, 3, 5],
    [4, 3, 2, 3, 2, 1, 2, 3, 2, 3],
    [5, 5, 3, 2, 4, 2, 1, 5, 3, 2],
    [3, 4, 5, 6, 2, 3, 5, 1, 2, 4],
    [2, 5, 4, 5, 3, 2, 3, 2, 1, 2],
    [3, 6, 5, 4, 5, 3, 2, 4, 2, 1],
  ];

  numbers = numbers.split("");

  // 메모를 하는 배열
  const DP = Array.from({ length: numbers.length + 1 }, () => Array.from({ length: 10 }, () => Array(10).fill(Infinity)));

  // 초기 손가락 위치 [행동 횟수][오른손 위치][왼손 위치]
  DP[0][4][6] = 0;

  for (let i = 0; i < numbers.length; i++) {
    // 타겟 숫자
    const cur_num = numbers[i];
    for (let j = 0; j < 10; j++) {
      for (let k = 0; k < 10; k++) {
        // 만약 행동을 하지 않았거나 손가락이 같은 위치에 놓이게 될 경우를 배제
        if (j === k || DP[i][j][k] === Infinity) continue;

        // 왼손을 움직이는 경우
        if (DP[i + 1][cur_num][k] > DP[i][j][k] + keyboard[j][cur_num]) {
          DP[i + 1][cur_num][k] = DP[i][j][k] + keyboard[j][cur_num];
        }

        // 오른손을 움직이는 경우
        if (DP[i + 1][j][cur_num] > DP[i][j][k] + keyboard[cur_num][k]) {
          DP[i + 1][j][cur_num] = DP[i][j][k] + keyboard[cur_num][k];
        }
      }
    }
  }

  // 최종적으로 산출된 결과에서 최솟값을 선택
  answer = Math.min(...DP[numbers.length].flat());

  return answer;
}

console.log(solution("5123"));
