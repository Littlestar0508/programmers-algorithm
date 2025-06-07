function solution(n, cores) {
  let rest = n - cores.length;
  let left = 1;
  let right = (Math.max(...cores) * rest) / cores.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    let count = 0;

    for (const core of cores) {
      count += Math.floor(mid / core);
    }

    if (count >= rest) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  for (const core of cores) {
    rest -= Math.floor((right - 1) / core);
  }

  for (let i = 0; i < cores.length; i++) {
    if (right % cores[i] === 0) {
      rest--;
      if (!rest) {
        return i + 1;
      }
    }
  }
}

console.log(solution(6, [1, 2, 3]));
