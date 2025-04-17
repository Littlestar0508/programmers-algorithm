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
            # x, y = str(bin(i))[2:].zfill(lx), str(bin(j))[2:].zfill(ly) # 이 부분 감소해야함
            if turn(beginning, target, i, j):
                answer = min(answer, str(bin(i)).count("1") + str(bin(j)).count("1"))
    if answer != 999999999:
        return answer
    else:
        return -1

def turn(beginning, target, x, y): # 이걸로 하면 시간 초과남
        t = deepcopy(beginning)
        i = 0
        cnt = 0
        while True:
            if not (0 <= i < len(t) or 0 <= i < len(t[0])):
                break
            if 0 <= i < len(t) and 2**i & x:
                cnt += 1
                for j in range(len(t[i])):
                    t[i][j] = int(not t[i][j])
            if 0 <= i < len(t[0]) and 2**i & y:
                cnt += 1
                for j in range(len(t)):
                    t[j][i] = int(not t[j][i])
            i += 1
        if t == target:
            return cnt
        else:
            return - 1

def turn(beginning, target, x, y):
        for i in range(len(beginning)):
            for j in range(len(beginning[0])):
                if x & 2**i and y & 2**j:
                    if beginning[i][j] == target[i][j]:
                        pass
                    else:
                        return False
                elif x & 2**i or y & 2**j:
                    if beginning[i][j] != target[i][j]:
                        pass
                    else:
                        return False
                else:
                    if beginning[i][j] == target[i][j]:
                        pass
                    else:
                        return False
        return True
                 
                       
print(solution([[0, 1, 0, 0, 0], [1, 0, 1, 0, 1], [0, 1, 1, 1, 0], [1, 0, 1, 1, 0], [0, 1, 0, 1, 0]], [[0, 0, 0, 1, 1], [0, 0, 0, 0, 1], [0, 0, 1, 0, 1], [0, 0, 0, 1, 0], [0, 0, 0, 0, 1]]))