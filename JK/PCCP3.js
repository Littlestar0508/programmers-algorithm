// 한 자리만 움직이는 경우의 함수
function rotateSingle(arr, num, dir, pos) {
  const digit = num.split("").map(Number);

  const result = [...digit];
  let carry = dir;

  // carry는 자신보다 높은 단계에 있는 곳에만 영향을 끼치므로
  // 전달받은 position으로 부터 상위 단계만 탐색하고
  // carry가 일어나지 않는다면 반복문 종료
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

// 전체를 돌리는 경우
function rotateMulti(arr, num, dir) {
  const digit = num.split("").map(Number);

  // 각각의 자리수를 방문해서 조건문에 따라 숫자를 다르게(carry가 일어나지 않으므로 간단한 로직)
  const result = digit.map((item, idx) => {
    let next = item + dir;
    if (next > arr[idx]) return 0;
    if (next < 0) return arr[idx];
    return next;
  });

  return result.join("");
}

function solution(arr, num, password) {
  // -1과 1의 방향으로 bfs 탐색
  const dx = [-1, 1];

  // 방문 Set
  const visited = new Set();
  const queue = [[num, 0]];
  visited.add(num);

  while (queue.length > 0) {
    const [cur, step] = queue.shift();

    if (cur === password) return step;

    for (let i = 0; i < arr.length; i++) {
      for (let dir = 0; dir < 2; dir++) {
        // 하나의 자리수만 돌리는 경우와 모두 돌리는 경우 둘 다 체크
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

  // 도달하지 못할 것을 대비하여 -1 출력
  return -1;
}

// console.log(solution([3, 4, 5, 6], "1111", "3456"));

console.log(rotateSingle([3, 4, 5, 6], "1111", -3, 3));
