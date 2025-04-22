function solution(N, number) {
  let answer = -1;
  // 초기 배열 길이를 8로 설정했더니 무한 루프가 일어남
  const arr = Array.from(new Array(9), () => new Set());

  // 만약 주어진 수하고 목표가 같다면 1을 return
  if (N === number) return 1;

  // 위치를 나타내기 위한 index
  let index = 1;

  // 8번까지 반복했는데 return되지 않았다면 -1을 return
  while (index <= 8) {
    // 5, 55, 555 와 같은 수를 배열에 넣기 위한 식
    let init = "";
    for (let i = 0; i < index; i++) {
      init += N;
    }
    arr[index].add(Number(init));

    // 3번째의 경우 모든 수가 1번째와 2번째를 조합한 사칙연산으로 나타남
    // 4번째의 경우는 1,3을 조합, 2,2를 조합, 3,1을 조합한 사칙연산으로 나타남
    for (let i = 0; i < index; i++) {
      for (let front of arr[i]) {
        for (let back of arr[index - i]) {
          arr[index].add(front + back);
          arr[index].add(front - back);
          arr[index].add(front * back);
          arr[index].add(Math.floor(front / back));
        }
      }
    }

    // 계산 결과가 나왔다면 return
    if (arr[index].has(number)) return index;
    index++;
  }

  return answer;
}

console.log(solution(2, 11));
