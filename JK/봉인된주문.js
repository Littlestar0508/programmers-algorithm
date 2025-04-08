function solution(n, bans) {
  let len = 0;
  while (n > 26 ** len) {
    len++;
  }

  // 문자열의 합을 숫자로 변환
  const sumStr = (str) => str.split("").reduce((acc, cur) => acc * 26 + (cur.charCodeAt(0) - 96), 0);

  // bans 배열 정렬
  bans.sort((a, b) => sumStr(a) - sumStr(b));

  // n이 bans에 존재하는 문자열의 길이보다 작다면 반복문 종료
  // 만약 n이 bans에 존재하는 배열의 합보다 크다면 n보다 작은 문자가 삭제됐으므로 n증가(이후 탐색을 위해)
  for (const i of bans) {
    if (i.length > n) break;
    if (sumStr(i) <= n) n++;
  }

  let answer = "";

  while (len > 0) {
    len--;

    // 나머지를 구하고 26으로 나눠 answer에 적립
    const charCode = String.fromCharCode(Math.floor((n - 1) % 26) + 97);
    answer = charCode + answer;
    n = Math.floor((n - 1) / 26);
  }

  return answer;
}

console.log(solution(7388, ["gqk", "kdn", "jxj", "jxi", "fug", "jxg", "ewq", "len", "bhc"]));

// 처음엔 합을 abc처럼 있으면 1*100+2*10+3 처럼 생각했는데 그렇게 되면 2*10(b* 과 t가 똑같은 경우)이 20이랑 똑같은 경우가 발생해서 에러가 생겨서 인터넷 찬스를 썼다..
