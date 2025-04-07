# https://school.programmers.co.kr/learn/courses/30/lessons/388352

from itertools import combinations

def solution(n, q, ans):
    answer = 0
    c = list(combinations([i for i in range(1, n + 1)], 5))
    for i in c:
        lst = []
        for j in q:
            lst.append(len(set(j) & set(i)))
        b = True

        for j in range(len(q)):
            if ans[j] == lst[j]:
                continue
            else:
                b = False
                break

        if b:
            answer += 1

    return answer

print(solution(10, [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [3, 7, 8, 9, 10], [2, 5, 7, 9, 10], [3, 4, 5, 6, 7]], [2, 3, 4, 3, 3]))