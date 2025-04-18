# https://school.programmers.co.kr/learn/courses/30/lessons/42860

def solution(name):
    answer = 0

    min_move = len(name) - 1
    for i, s in enumerate(name):
        answer += min(ord(s) - ord("A"), 26 - (ord(s) - ord("A")))

        t = i + 1
        while t < len(name) and name[t] == "A":
            t += 1
        
        min_move = min(min_move, 2 * i + (len(name) - t), 2 * (len(name) - t) + i)

    answer += min_move
    return answer

print(solution("BABBAABB")) # 11
print(solution("BAABBAAA")) # 7
# 아예 긴 거를 선택하는 거도 있음 => 그래서 그냥 0으로 된 뭉치를 한 개 배제하고 싹다 돌리자.

print(solution("JEROEN")) # 56
print(solution("JAN")) # 23
print(solution("JAZ")) # 11
print(solution("ABABBA")) # 7
print(solution("AAABBA")) # 5
print(solution("BBBAAAAB")) # 8
print(solution("BAAAAABAA")) # 5
print(solution("BBBABAABABABB")) # 20
print(solution("BBABAAAAAAB")) # 9
print(solution("BBAAAAAAABAB")) # 9
