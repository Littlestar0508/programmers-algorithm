# https://school.programmers.co.kr/learn/courses/30/lessons/12952

answer = 0
def solution(n):
    def dfs(lst):
        global answer
        l = len(lst)
        if l == n:
            answer += 1

        for i in range(n): # 열 위치 반복 확인
            b = True
            for tx in range(l): # 리스트 돌면서 len(lst), i 위치에 퀸을 놓아도 되는지 확인
                if lst[tx] - i == 0 or l - tx == abs(lst[tx] - i): # 미친 시간 초과, 이게 맞나 싶은 정도. 뭔가 더 획기적으로 줄이는 방법이 있으면 좋을 듯함
                    b = False
                    break              
            if b:
                lst.append(i)
                dfs(lst)
                lst.pop()
    dfs([])
    return answer

print(solution(4))