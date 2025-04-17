// https://school.programmers.co.kr/questions/44033 참고자료

// 기존 방식 -> 모든 행과 열을 한 번만 뒤집는다고 가정하고 계산했지만, 시간 초과 + 미해결 케이스들 발생

// 해결하기 위한 방식
// 각 행의 첫 번째 원소가 서로 다르면 행을 먼저 뒤집는다. 이후 각 열의 첫 번째 원소가 다르면 열을 뒤집는다.
// 각 행의 첫 번째 원소가 서로 같으면 행을 먼저 뒤집는다. 이후 각 열의 첫 번째 원소가 다르면 열을 뒤집는다.
// 각 열의 첫 번째 원소가 서로 다르면 열을 먼저 뒤집는다. 이후 각 행의 첫 번째 원소가 다르면 행을 뒤집는다.
// 각 열의 첫 번째 원소가 서로 같으면 열을 먼저 뒤집는다. 이후 각 행의 첫 번째 원소가 다르면 행을 뒤집는다.
// 를 적용

function solution(beginning, target) {
  const N = beginning.length;
  const M = beginning[0].length;
  let answer = Infinity;

  // 행(불일치)열(불일치) , 행(불일치)열(일치) , 행(일치)열(불일치) , 행(일치)열(일치) 검사 진행
  for (let c = 0; c < 4; c++) {
    let copy = JSON.parse(JSON.stringify(beginning));
    let cnt = 0;

    // 행 뒤집기
    for (let i = 0; i < N; i++) {
      if ((c < 2 && copy[i][0] !== target[i][0]) || (c >= 2 && copy[i][0] === target[i][0])) {
        cnt++;
        for (let j = 0; j < M; j++) {
          copy[i][j] = 1 - copy[i][j];
        }
      }
    }

    // 열 뒤집기
    for (let i = 0; i < M; i++) {
      if ((c % 2 === 0 && copy[0][i] !== target[0][i]) || (c % 2 === 1 && copy[0][i] === target[0][i])) {
        cnt++;
        for (let j = 0; j < N; j++) {
          copy[j][i] = 1 - copy[j][i];
        }
      }
    }

    // 배열 검사
    if (JSON.stringify(copy) === JSON.stringify(target)) {
      answer = Math.min(cnt, answer);
    }
  }

  // 모든 검사를 하고도 일치하는 케이스가 없었다면 -1 반환
  return answer === Infinity ? -1 : answer;
}

console.log(
  solution(
    [
      [0, 1, 0, 0, 0],
      [1, 0, 1, 0, 1],
      [0, 1, 1, 1, 0],
      [1, 0, 1, 1, 0],
      [0, 1, 0, 1, 0],
    ],
    [
      [0, 0, 0, 1, 1],
      [0, 0, 0, 0, 1],
      [0, 0, 1, 0, 1],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 0, 1],
    ]
  )
);
