# https://school.programmers.co.kr/learn/courses/30/lessons/134239

def solution(k, ranges):
    answer = []
    lst = [k]
    while k != 1:
        if k % 2 == 1:
            k = (k * 3) + 1
        else:
            k = k // 2
        lst.append(k)
    
    cum = [0]

    for i in range(1, len(lst)):
        cum.append(cum[i - 1] + (lst[i] + lst[i - 1])/2)
    l = len(cum) - 1

    for a, b in ranges:
        if a > l + b:
            answer.append(-1.0)
        else:
            answer.append(cum[l + b] - cum[a])

    return answer

print(solution(5, [[0,0],[0,-1],[2,-3],[3,-3]]))
print(solution(3, [[0,0], [1,-2], [3,-3]]))