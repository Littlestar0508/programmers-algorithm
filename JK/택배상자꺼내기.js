// https://school.programmers.co.kr/learn/courses/30/lessons/389478

function solution(n, w, num) {
  let answer = 0;

  const max_h = Math.ceil(n / w);
  const cur_h = Math.ceil(num / w);

  let max_line = n % w || n;
  let cur_line = num % w || num;

  answer = max_h - cur_h;

  if (max_h % 2 === cur_h % 2 && max_line >= cur_line) answer++;
  if (max_h % 2 !== cur_h % 2 && max_line + cur_line > w) answer++;

  return answer;
}
