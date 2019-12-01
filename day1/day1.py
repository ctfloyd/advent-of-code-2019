import sys

def cost(mass: int) -> int:
    return mass // 3 - 2

def rec_cost(mass: int) -> int:
    c = cost(mass)
    return 0 if c <= 0 else c + rec_cost(c)

lines = [int(l) for l in sys.stdin.readlines()]
print(f'Part 1: {sum(map(cost, lines))}')
print(f'Part 2: {sum(map(rec_cost, lines))}')
