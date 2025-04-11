function solution(n, q, ans) {
  const answer = [];

  // dfs로 모든 경우의 수를 체크
  const dfs = (idx, combination) => {
    // 5개의 숫자가 선택됐다면 조건에 부합하는지 체크
    if (combination.length === 5) {
      // 조건을 충족했는지 확인을 위한 boolean값
      let chk = true;

      // q를 순회
      for (let i = 0; i < q.length; i++) {
        // q의 원소배열이 선택된 숫자들을 몇 개 포함했는지 거르기
        const len = q[i].filter((elem) => combination.includes(elem));
        if (len.length !== ans[i]) {
          chk = false;
          break;
        }
      }

      // 모든 조건을 만족했다면 answer에 추가
      if (chk) {
        answer.push(combination);
      }

      return;
    }

    // 오름차순 정렬을 위한 반복문
    for (let i = idx; i <= n; i++) {
      dfs(i + 1, [...combination, i]);
    }
  };

  dfs(1, []);

  return answer.length;
}

console.log(
  solution(
    10,
    [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [3, 7, 8, 9, 10],
      [2, 5, 7, 9, 10],
      [3, 4, 5, 6, 7],
    ],
    [2, 3, 4, 3, 3]
  )
);

// 처음엔 combination을 이용해서 모든 정답인 경우를 직접 찾아내야 하는 줄 알고 로직 구현이 어려워 인터넷 검색을 했다
// 근데 내가 생각한 것보다 훨씬 간단한 문제였고, 그걸 바탕으로 직접 구현했다
