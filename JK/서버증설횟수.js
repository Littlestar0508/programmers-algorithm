// https://school.programmers.co.kr/learn/courses/30/lessons/389479

function solution(players, m, k) {
  let answer = 0;

  players = players.map((item) => {
    return Math.floor(item / m);
  });

  const arr = new Array(players.length + k).fill(0);

  for (let i = 0; i < players.length; i++) {
    if (arr[i] < players[i]) {
      const diff = players[i] - arr[i];
      answer += diff;

      for (let j = i; j < i + k; j++) {
        arr[j] += diff;
      }
    }
  }

  return answer;
}
