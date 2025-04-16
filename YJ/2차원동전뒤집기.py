# https://school.programmers.co.kr/learn/courses/30/lessons/131703


# 235 532 바꾸는 건 같음.
# 그리고 한 번 바꾸는 애는 다시 바꾸는게 의미가 없음

from copy import deepcopy

def solution(beginning, target):
    answer = 999999999
    lx = len(beginning)
    ly = len(beginning[0])
    for i in range(2**lx):
        for j in range(2**ly):
            x, y = str(bin(i))[2:].zfill(lx), str(bin(j))[2:].zfill(ly)
            if turn(beginning, target, x, y):
                answer = min(answer, x.count("1") +  y.count("1"))
    if answer != 999999999:
        return answer
    else:
        return -1

def turn(beginning, target, x, y):
        t = deepcopy(beginning)
        for i in range(len(x)):
            if x[i] == "1":
                for j in range(len(t[i])):
                    t[i][j] = int(not t[i][j])
        for i in range(len(y)):
            if y[i] == "1":
                for j in range(len(t)):
                    t[j][i] = int(not t[j][i])
        
        if t == target:
            return True
                       
print(solution([[0, 1, 0, 0, 0], [1, 0, 1, 0, 1], [0, 1, 1, 1, 0], [1, 0, 1, 1, 0], [0, 1, 0, 1, 0]], [[0, 0, 0, 1, 1], [0, 0, 0, 0, 1], [0, 0, 1, 0, 1], [0, 0, 0, 1, 0], [0, 0, 0, 0, 1]]))