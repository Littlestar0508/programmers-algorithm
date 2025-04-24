# https://school.programmers.co.kr/learn/courses/30/lessons/136797

# 뭔가 완전탐색으로 가면 노답임 2*100000인가 그건 노답이고
# DP 느낌으로 갖고 가야 함. => 중간의 값을 저장해야 함. 인덱스로 저장하기는 좀 껄끄럽긴 함. 이차원 배열? 좀 껄끄러움 for문을 많이돌지는 않는데 작성하기가 껄끄러움
# map?

def solution(numbers):
    weights = [[1, 7, 6, 7, 5, 4, 5, 3, 2, 3],
               [7, 1, 2, 4, 2, 3, 5, 4, 5, 6],
               [6, 2, 1, 2, 3, 2, 3, 5, 4, 5],
               [7, 4, 2, 1, 5, 3, 2, 6, 5, 4],
               [5, 2, 3, 5, 1, 2, 4, 2, 3, 5],
               [4, 3, 2, 3, 2, 1, 2, 3, 2, 3],
               [5, 5, 3, 2, 4, 2, 1, 5, 3, 2],
               [3, 4, 5, 6, 2, 3, 5, 1, 2, 4],
               [2, 5, 4, 5, 3, 2, 3, 2, 1, 2],
               [3, 6, 5, 4, 5, 3, 2, 4, 2, 1]]
    left_hand = 4
    right_hand = 6
    
    dic = {}
    dic[(left_hand, right_hand)] = 0

    for i in numbers:
        i = int(i)
        temp = {}
        for hand, w in dic.items():
            l, r = hand
            if l == i:
                if not (i, r) in temp.keys() or temp[(i, r)] > w + 1: # 원하는 숫자랑 위치가 각 손과 같을 때
                    temp[(i, r)] = w + 1
            elif r == i:
                if not (l, i) in temp.keys() or temp[(l, i)] > w + 1:
                    temp[(l, i)] = w + 1
            else:
                if not (i, r) in temp.keys() or temp[(i, r)] > w + weights[l][i]: # 왼손으로 누를 경우 : 왼손으로 누를 때 이번 턴에 온적이 없거나, 더 작은 가중치로 갱신이 되거나
                    temp[(i, r)] = w + weights[l][i]
                if not (l, i) in temp.keys() or temp[(l, i)] > w + weights[r][i]: # 오른손으로 누를 경우
                    temp[(l, i)] = w + weights[r][i]
        dic = temp
    return min(list(dic.values()))

print(solution("1756"))
print(solution("5123"))