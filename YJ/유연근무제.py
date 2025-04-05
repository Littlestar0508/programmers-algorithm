# https://school.programmers.co.kr/learn/courses/30/lessons/388351

def solution(schedules, timelogs, startday):
    answer = 0
    for i in range(len(schedules)):
        b = True
        h = schedules[i] // 100 + ((schedules[i] % 100) + 10) // 60
        m = ((schedules[i] % 100) + 10) % 60
        temp_startday = startday
        for j in range(len(timelogs[i])):
            if temp_startday <= 5 and timelogs[i][j] <= h*100+m:
                pass
            elif temp_startday <= 5:
                b = False
            temp_startday = (temp_startday % 7) + 1
        if b:
            answer += 1
    return answer

print(solution([700, 800, 1100], [[710, 2359, 1050, 700, 650, 631, 659], [800, 801, 805, 800, 759, 810, 809], [1105, 1001, 1002, 600, 1059, 1001, 1100]], 5))
solution([730, 855, 700, 720], [[710, 700, 650, 735, 700, 931, 912], [908, 901, 805, 815, 800, 831, 835], [705, 701, 702, 705, 710, 710, 711], [707, 731, 859, 913, 934, 931, 905]], 1)