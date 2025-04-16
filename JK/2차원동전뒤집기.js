// 미해결

function solution(beginning, target) {
  const chk = Array.from(Array(beginning.length), () => new Array(beginning[0].length).fill(false));
  const visited = Array.from(Array(2), () => new Array(beginning[0].length).fill(false));

  while (!isAllVisited(visited)) {
    const row_col = Array.from(Array(2), () => new Array(beginning[0].length).fill(0));

    for (let i = 0; i < beginning.length; i++) {
      for (let j = 0; j < beginning[0].length; j++) {
        chk[i][j] = beginning[i][j] === target[i][j];
        if (!chk[i][j]) {
          row_col[0][i]++;
          row_col[1][j]++;
        }
      }
    }

    console.log(row_col);

    const max_idx = find_max_idx(row_col, visited);

    if (max_idx > 4) {
      change_col(beginning, max_idx - 5);
      visited[1][max_idx - 5] = true;
    } else {
      change_row(beginning, max_idx);
      visited[0][max_idx] = true;
    }
  }

  console.log(1);
}

function change_row(arr, n) {
  for (let i = 0; i < arr.length; i++) {
    arr[n][i] = !arr[n][i];
  }
}

function change_col(arr, n) {
  for (let i = 0; i < arr.length; i++) {
    arr[i][n] = !arr[i][n];
  }
}

function find_max_idx(arr, visited) {
  const list = arr.flat();
  const max = find_max(list);

  return list.indexOf(max);
}

function find_max(arr) {
  return Math.max(...arr);
}

function isAllVisited(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      if (!arr[i][j]) return false;
    }
  }

  return true;
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
