import copy
import sys
from typing import List

def compute_instruction(opcode: int, arg1: int, arg2: int) -> int:
    if opcode == 1:
        return arg1 + arg2
    else:
        return arg1 * arg2

def execute(instructions: List[int], noun: int, verb: int) -> List[int]:
    memory = copy.deepcopy(instructions)
    memory[1:3] = noun, verb

    i = 0
    while(memory[i] != 99):
        memory[memory[i + 3]] = compute_instruction(memory[i], memory[memory[i + 1]], memory[memory[i + 2]])
        i += 4

    return memory

def part1(instructions: List[int]):
    output_memory = execute(instruction_list, 12, 2)
    print(f'Part 1 Solution: {output_memory[0]}')

def part2(instructions: List[int]):
    # We need to brute force some verb and noun to give us an output
    for noun in range(100):
        for verb in range(100):
            output_memory = execute(instruction_list, noun, verb)
            if(output_memory[0] == 19690720):
                print(f'Part 2 Solution {noun * 100 + verb}')

instruction_list_as_string = sys.stdin.readlines()[0]
instruction_list = [int(instruction) for instruction in instruction_list_as_string.split(',')]

part1(instruction_list)
part2(instruction_list)