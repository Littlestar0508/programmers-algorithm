function rotateSingle(arr, num, dir, pos) {
  const digit = num.split("").map(Number);

  const result = [...digit];
  let carry = dir;

  for (let i = pos; i >= 0; i--) {
    if (carry === 0) break;
    result[i] += carry;

    if (result[i] > arr[i]) {
      result[i] = 0;
      carry = 1;
    } else if (result[i] < 0) {
      result[i] = arr[i];
      carry = -1;
    } else {
      carry = 0;
    }
  }

  return result.join("");
}

function rotateMulti(arr, num, dir) {
  const digit = num.split("").map(Number);

  const result = digit.map((item, idx) => {
    let next = item + dir;
    if (next > arr[idx]) return 0;
    if (next < 0) return arr[idx];
    return next;
  });

  return result.join("");
}

function solution(arr, num, password) {
  const dx = [-1, 1];

  const visited = new Set();
  const queue = [[num, 0]];
  visited.add(num);

  while (queue.length > 0) {
    const [cur, step] = queue.shift();

    if (cur === password) return step;

    for (let i = 0; i < arr.length; i++) {
      for (let dir = 0; dir < 2; dir++) {
        const next = rotateSingle(arr, cur, dx[dir], i);

        if (!visited.has(next)) {
          visited.add(next);
          queue.push([next, step + 1]);
        }
      }
    }

    for (let dir = 0; dir < 2; dir++) {
      const next = rotateMulti(arr, cur, dx[dir]);

      if (!visited.has(next)) {
        visited.add(next);
        queue.push([next, step + 1]);
      }
    }
  }

  return -1;
}

console.log(solution([3, 4, 5, 6], "1111", "3456"));
