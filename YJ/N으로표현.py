# https://school.programmers.co.kr/learn/courses/30/lessons/42895

def solution(N, number):
    answer = 0
    dp = [set() for _ in range(9)]
    
    for i in range(1, 9):
        t = int(str(N)*i)
        dp[i].add(int(str(N)*i))
        if t == number:
            return i

    for i in range(1, 9):
        for j in range(1, i):
            k = i - j
            for numj in dp[j]:
                for numk in dp[k]:
                    dp[i].add(numk + numj)
                    if numk != numj:
                        dp[i].add(abs(numk - numj))
                    dp[i].add(numk * numj)
                    if numj != 0:
                        dp[i].add(numk // numj)
                    if numj != 0:
                        dp[i].add(numk // numj)

    for i in range(1, 9):
        if number in dp[i]:
            return i
    return -1

print(solution(5, 12))
print(solution(2, 11))