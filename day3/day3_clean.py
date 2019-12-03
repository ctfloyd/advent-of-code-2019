import sys
import math
from typing import Tuple, List, Set, Dict
from functools import partial

# Brute Force Approach: Build a list of every coordiante the wire is on, and check for the closest intersecting wires
# Although the input only specifies two wires, this implementation is generalized to n wires

# The algorithm is psuedopolynomial in the largest vector magnitude provided

DIRECTIONS : Dict[str, Tuple[int, int]] = {
    'L': (-1, 0),
    'R': (1, 0),
    'U': (0, 1),
    'D': (0, -1)
}

GRID : List[Tuple[int, int]] = []
START_POSITION : Tuple[int,int] = (0, 0)


def parse_vector(serialized_vector : str) -> Tuple[str, int]:
    return serialized_vector[0], int(serialized_vector[1:])

def manhattan_distance(first_point : Tuple[int, int], second_point : Tuple[int, int]) -> int:
    return abs(first_point[0] - second_point[0]) + abs(first_point[1] - second_point[1])

def compute_intersections() -> Set[int]:
    intersections = set(GRID[0])
    for i in range(1, len(GRID)):
        intersections = intersections & set(GRID[i])
    return intersections

def part_1() -> None:
    # Find all intersecting points
    intersections = compute_intersections()
    
    # Find the closest point to START_POSITION by Manhattan Distance
    mapfunc = partial(manhattan_distance, START_POSITION) 
    print(f'Part 1: {min(map(mapfunc, intersections))}')    


def part_2() -> None:
    # Find all intersecting points
    intersections = compute_intersections()

    def mapfunc(point: Tuple[int, int]) -> int:
        path_lengths = []
        for i in range(len(GRID)):
            path_lengths.append(GRID[i].index(point))
        return sum(path_lengths)

    # Minimize the path length to any intersecting points
    # Must add 2 to adjust for 0-based indexing
    print(f'Part 2: {min(map(mapfunc, intersections)) + 2}')



inp = [l.split(',') for l in sys.stdin.readlines()]

for index, wire in enumerate(inp):
    wire_position = START_POSITION
    GRID.append([])
    for vector in wire:
        vector_direction, vector_magnitude = parse_vector(vector)
        wire_offset = DIRECTIONS[vector_direction]
        for _ in range(vector_magnitude):
            wire_position = (wire_position[0] + wire_offset[0], wire_position[1] + wire_offset[1])
            GRID[index].append(wire_position)

part_1()
part_2()
