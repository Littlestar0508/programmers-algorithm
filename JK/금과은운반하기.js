function solution(a, b, g, s, w, t) {
  // 이분 탐색을 위한 최솟값과 최대값 설정
  // 최대값은 a,b의 크기 * 도시개수 * 각각2번씩 총 4번 해서 나온 결과값
  let start = 0;
  let end = 10e9 * 10e5 * 4;

  // 이분 탐색 종료 조건
  while (start <= end) {
    // 중앙값 설정
    const mid = Math.floor((start + end) / 2);

    // 금과 은과 총 무게를 측정
    // 여기서 총 무게를 계산하는 이유 : 금과 은만 가지고 비교하면 둘의 시간을 합한 것을 상정하지 못한다
    let [gold, silver, res] = [0, 0, 0];

    for (let i = 0; i < g.length; i++) {
      // mid의 시간 동안 돌아다닐 수 있는 최대 횟수
      const remain = Math.round(mid / (2 * t[i]));
      // 무게 제한을 신경쓰지 않은 최대값
      const max = remain * w[i];
      // 금과 은의 제한을 신경쓰며 작업량 도출
      gold += Math.min(g[i], max);
      silver += Math.min(s[i], max);
      res += Math.min(g[i] + s[i], max);
    }

    // 이분 탐색
    if (gold >= a && silver >= b && res >= a + b) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return start;
}

console.log(solution(10, 10, [100], [100], [7], [10]));
