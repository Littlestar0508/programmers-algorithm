function solution(n, m, x, y, queries) {
  let minX = BigInt(x);
  let maxX = BigInt(x);
  let minY = BigInt(y);
  let maxY = BigInt(y);
  n = BigInt(n);
  m = BigInt(m);

  for (let i = queries.length - 1; i > -1; i--) {
    const [d, dist] = queries[i];
    const distance = BigInt(dist);

    if (d === 0) {
      if (minY > 0) minY += distance;
      maxY = maxY + distance >= m ? m - 1n : maxY + distance;
    } else if (d === 1) {
      if (maxY < m - 1n) maxY -= distance;
      minY = minY - distance < 0n ? 0n : minY - distance;
    } else if (d === 2) {
      if (minX > 0) minX += distance;
      maxX = maxX + distance >= n ? n - 1n : maxX + distance;
    } else if (d === 3) {
      if (maxX < n - 1n) maxX -= distance;
      minX = minX - distance < 0n ? 0n : minX - distance;
    }

    if (minX > maxX || minY > maxY) return 0;
  }

  return (maxX - minX + 1n) * (maxY - minY + 1n);
}

console.log(
  solution(2, 2, 0, 0, [
    [2, 1],
    [0, 1],
    [1, 1],
    [0, 1],
    [2, 1],
  ])
);
