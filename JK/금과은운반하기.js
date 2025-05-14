function solution(a, b, g, s, w, t) {
  let start = 0;
  let end = 10e9 * 10e5 * 4;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    let [gold, silver, res] = [0, 0, 0];

    for (let i = 0; i < g.length; i++) {
      const remain = Math.round(mid / (2 * t[i]));
      const max = remain * w[i];
      gold += Math.min(g[i], max);
      silver += Math.min(s[i], max);
      res += Math.min(g[i] + s[i], max);
    }

    if (gold >= a && silver >= b && res >= a + b) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return start;
}

console.log(solution(10, 10, [100], [100], [7], [10]));
