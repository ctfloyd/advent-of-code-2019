import sys
import math

def manhattan_dist(x1, y1, x2, y2):
    return abs(x1 - x2) + abs(y1 - y2)



inp = [l.split(',') for l in sys.stdin.readlines()]

p1_coords = []
p1_x = 0
p1_y = 0
p2_coords = []
p2_x = 0
p2_y = 0
for i in range(2):
    for val in inp[i]:
        direction = ""
        amount = ""
        for c in val:
            if c in ['R', 'D', 'U', 'L']:
                direction = c
            else:
                amount += c
        amount = int(amount)
        if direction == 'R':
            for x in range(1, amount + 1):
                if i == 0:
                    p1_coords.append((p1_x + x, p1_y))
                else:
                    p2_coords.append((p2_x + x, p2_y))
            if i == 0:
                p1_x += amount
            else:
                p2_x += amount
        elif direction == 'L':
            for x in range(1, amount + 1):
                if i == 0:
                    p1_coords.append((p1_x - x, p1_y))
                else:
                    p2_coords.append((p2_x - x, p2_y))
            if i == 0:
                p1_x -= amount
            else:
                p2_x -= amount
        elif direction == 'U':
            for y in range(1, amount + 1):
                if i == 0:
                    p1_coords.append((p1_x, p1_y + y))
                else:
                    p2_coords.append((p2_x, p2_y + y))
            if i == 0:
                p1_y += amount
            else:
                p2_y += amount
        elif direction == 'D':
            for y in range(1, amount + 1):
                if i == 0:
                    p1_coords.append((p1_x, p1_y - y))
                else:
                    p2_coords.append((p2_x, p2_y - y))
            if i == 0:
                p1_y -= amount
            else:
                p2_y -= amount

intersect = set(p1_coords) & set(p2_coords)

# part 2
min = 99999999
for val in intersect:
    if p1_coords.index(val) + p2_coords.index(val) < min:
        min = p1_coords.index(val) + p2_coords.index(val)
    

# part 1
# min = 99999999999999
# for val in intersect:
#     if manhattan_dist(0, 0, val[0], val[1]) < min:
#         min = manhattan_dist(0, 0, val[0], val[1])

print(min + 2)
    
    
            