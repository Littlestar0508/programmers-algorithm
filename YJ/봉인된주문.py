# https://school.programmers.co.kr/learn/courses/30/lessons/389481

def solution(n, bans):
    c = ['-'] + [chr(i) for i in range(ord('a'), ord('z') + 1)]
    k = n
    # ai는 길이가 되고, at는 원래의 인덱스가 됨
    lst = []
    for ban in bans:
        t = 0
        for i, b in enumerate(reversed(ban)):
            t += (ord(b) - ord('a') + 1) * (26**i)
        lst.append(t)


    lst.sort()
    for i in lst:
        if i <= k:
            k += 1

    answer = ''
    lst = []
    while k != 0:
        lst.append(((k - 1) % 26) + 1) # 0
        if ((k - 1) % 26) + 1 == 26:
            k = (k - 1) // 26
        else:
            k = k // 26
    
    for i in reversed(lst):
        answer += c[i]

    return answer 
    

print(solution(30, ["d", "e", "bb", "aa", "ae"]))
print(solution(52, [])) # az
