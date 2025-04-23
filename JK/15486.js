const n = 7;

const arr = [
  [3, 10],
  [5, 20],
  [1, 10],
  [1, 20],
  [2, 15],
  [4, 40],
  [2, 200],
];

const DP = Array.from({ length: n + 1 }).fill(0);

let max = 0;

for (let i = 0; i < n; i++) {
  max = Math.max(max, DP[i]);

  const [time, cost] = arr[i];

  if (i + time <= n) DP[i + time] = Math.max(DP[i + time], max + cost);
}

console.log(Math.max(...DP));
