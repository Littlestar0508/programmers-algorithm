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

const DP = Array.from({ length: n }).fill(0);

for (let i = 0; i < n; i++) {
  const time = arr[i][0];
  const cost = arr[i][1];

  if (time + i > n) continue;

  DP[i] = DP[i] + cost;

  for (let j = time + i; j < n; j++) {
    DP[j] = Math.max(DP[i], DP[j]);
  }
}

console.log(Math.max(...DP));
