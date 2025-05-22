function solution(k, node, edge) {
  let answer = 0;

  function dfs(left, right, cur, depth) {
    if (depth === k) return;

    for (let i = 0; i < node.length; i++) {
      if (i + 1 === cur) continue;
      if (node[i] === "(") {
        if (k / 2 >= left) continue;
        const leftArr = edge.filter((item) => item.includes(cur) && item.includes(i + 1));
        for (let j = 0; j < leftArr.length; j++) {
          const [x, y] = leftArr[j];
          if (x === cur) dfs(left + 1, right, y, depth + 1);
          if (y === cur) dfs(left + 1, right, x, depth + 1);
        }
      }
      if (node[i] === ")") {
        if (left <= right) continue;
        const rightArr = edge.filter((item) => item.includes(cur) && item.includes(i + 1));
        for (let j = 0; j < rightArr; j++) {
          const [x, y] = rightArr[j];
          if (x === cur) dfs(left, right + 1, y, depth);
          if (y === cur) dfs(left, right + 1, x, depth);
        }
      }
    }
  }

  for (let i = 0; i < node.length; i++) {
    if (node[i] === "(") dfs(1, 0, i + 1, 1);
  }
}

console.log(
  solution(4, "((())", [
    [1, 2],
    [1, 3],
    [2, 3],
    [2, 4],
    [3, 5],
    [4, 5],
  ])
);
