# https://school.programmers.co.kr/learn/courses/30/lessons/389478

def solution(n, w, num):
    answer = 0
    if ((num + w - 1) // w) % 2 == 1: x = (num + (w - 1)) % w
    else: x = (w - 1) - (num + (w - 1)) % w

    for i in range(num, n + 1):
        if ((((i + w - 1) // w) % 2) == 1 and x == (i + (w - 1)) % w) or ((((i + w - 1) // w) % 2) == 0 and x == (w - 1) - ((i + (w - 1)) % w)):
            answer += 1
    return answer


print(solution(22, 6, 8))
print()
print(solution(13, 3, 6))