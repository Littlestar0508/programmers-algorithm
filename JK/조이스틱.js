function solution(name) {
  // 이동 횟수 + 알파벳
  let answer = 0;
  // 이동 횟수(최대 길이는 무조건 name의 길이 - 1)
  let move = name.length - 1;

  const arr = name.split("");
  arr.map((item, idx) => {
    // 정방향과 역방향의 코스트 비교
    answer += Math.min(item.charCodeAt() - 65, 26 - (item.charCodeAt() - 65));

    // A가 아닌 다음 문자
    let nextChar = idx + 1;

    while (nextChar < arr.length && arr[nextChar] === "A") {
      nextChar += 1;
    }

    // 역방향과 정방향 이동 비교
    // idx * 2 + arr.length - nextChar : 정방향 이동 -> 역방향 이동으로 target까지 도달
    // (arr.length - nextChar) * 2 + idx : 역방향 이동 -> 정방향 이동으로 target까지 도달
    move = Math.min(move, idx * 2 + arr.length - nextChar, (arr.length - nextChar) * 2 + idx);
  });
  answer += move;

  return answer;
}

console.log(solution("JEROEN"));
console.log(solution("JAN"));
