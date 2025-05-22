function solution(k, node, edge) {
  let answer = 0;

  function dfs(left, right, cur, depth) {
    // 깊이가 k가 된다면 return
    if (depth === k) {
      answer %= 10007;
      answer++;
      return;
    }

    // 다음으로 갈 수 있는 방법이 '(' 인 것과 ')' 로 나눠서 생각
    for (let i = 0; i < node.length; i++) {
      // 자기 자신을 조회하는 경우는 없다고 가정하고 생략
      if (i + 1 === cur) continue;
      // '(' 인 경우
      if (node[i] === "(") {
        // 만약 '('가 할당량을 채웠다면 즉, 절반을 채웠다면 pass
        if (k / 2 <= left) continue;
        // 그리고 현재 위치와 다음 위치가 연결된 edge를 모두 탐색(보통 1개만 나오지 않을까 싶음)
        const leftArr = edge.filter((item) => item.includes(cur) && item.includes(i + 1));
        // 그리고 dfs를 돌리기
        for (let j = 0; j < leftArr.length; j++) {
          const [x, y] = leftArr[j];
          if (x === cur) dfs(left + 1, right, y, depth + 1);
          if (y === cur) dfs(left + 1, right, x, depth + 1);
        }
      }
      // ')'인 경우
      if (node[i] === ")") {
        // 만약 ')'가 '(' 보다 많다면 오류이므로 그런 경우는 pass
        if (left <= right) continue;
        // 현재 위치 + 다음 위치가 연결된 edge를 모두 탐색
        const rightArr = edge.filter((item) => item.includes(cur) && item.includes(i + 1));
        // 그리고 dfs를 돌리기
        for (let j = 0; j < rightArr.length; j++) {
          const [x, y] = rightArr[j];
          if (x === cur) dfs(left, right + 1, y, depth + 1);
          if (y === cur) dfs(left, right + 1, x, depth + 1);
        }
      }
    }
  }

  // node에서 '('로 시작하는 녀석들을 모두 기본 시작점으로 지정해서 dfs돌리기
  for (let i = 0; i < node.length; i++) {
    if (node[i] === "(") dfs(1, 0, i + 1, 1);
  }

  return answer;
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
