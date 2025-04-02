function solution(schedules, timelogs, startday) {
  let answer = 0;

  for (let i = 0; i < schedules.length; i++) {
    if (calc(schedules[i], timelogs[i], startday)) {
      answer++;
    }
  }

  return answer;
}

function calc(limit, timeArr, startday) {
  let att = true;

  for (let i = 0; i < timeArr.length; i++) {
    let day = ((startday + i - 1) % 7) + 1;
    if (day >= 6) continue;

    const h = Math.floor(limit / 100) - Math.floor(timeArr[i] / 100);
    const m = (limit % 100) - (timeArr[i] % 100);

    if (h * 60 + m < -10) {
      att = false;
      break;
    }
  }

  return att;
}
