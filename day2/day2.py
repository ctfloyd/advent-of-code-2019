import sys
from typing import List
import copy

def do_compute(l: List[int]):
    i = 0
    while i < len(l):
        num = l[i]
        if num == 99:
            break
        if i + 3 >= len(l):
            break
        store = l[i + 3]
        num1 = l[i + 1]
        num2 = l[i + 2]
        if num == 1:
            l[store] = l[num1] + l[num2]
        elif num == 2:
            l[store] = l[num1] * l[num2]
        i += 4
        
inp = [l.split(',') for l in sys.stdin.readlines()][0]
inp = [int(i) for i in inp]
for i in range(100):
    for j in range(100):
        inp[1] = i
        inp[2] = j
        c = copy.deepcopy(inp)
        do_compute(c)
        if c[0] == 19690720:
            print(i, j)


        