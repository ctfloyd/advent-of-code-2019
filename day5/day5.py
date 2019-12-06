import copy
import sys
from typing import List

OPCODES = {
    1: 4,
    2: 4,
    3: 2,
    4: 2,
    5: 3,
    6: 3,
    7: 4,
    8: 4,
    99: 0
}

def parse_opcode(opcode : int):
    opcode_length = len(str(opcode))
    base_opcode = [0, 0, 0, int(str(opcode)[-1])]

    def op3():
        base_opcode[2] = int(str(opcode)[-3])
    
    def op4():
        base_opcode[1] = int(str(opcode)[-4])
    
    def op5():
        base_opcode[0] = int(str(opcode)[-5])

    if opcode_length == 3: #00 102
        op3()
    elif opcode_length == 4: # 1102 1002
        op3()
        op4()
    elif opcode_length == 5:
        op3()
        op4()
        op5()

    return base_opcode


def execute(instructions: List[int]) -> List[int]:
    memory = copy.deepcopy(instructions)
    

    i = 0
    while(memory[i] != 99):
        no_inc = False
        # print(memory)
        operation_list = parse_opcode(memory[i])
        print(f'${i} : {memory[i]} => {operation_list} => {memory[i:i + 3]}')

        opcode = operation_list[3]

        arg1_mode = operation_list[2]
        arg2_mode = operation_list[1]

        if arg1_mode == 0:
            arg1 = memory[memory[i + 1]]
        else:
            arg1 = memory[i + 1]
        if arg2_mode == 0 and opcode not in [3, 4]:
            arg2 = memory[memory[i + 2]]
        elif arg2_mode == 1 and opcode not in [3, 4]:
            arg2 = memory[i + 2]

        # print("#", arg1, " : ", arg2)
        if opcode == 1:
            memory[memory[i + 3]] = arg1 + arg2
        elif opcode == 2:
            memory[memory[i + 3]] = arg1 * arg2
        elif opcode == 3:
            inp = input("IN: ")
            memory[memory[i + 1]] = int(inp)
        elif opcode == 4:
            print(f'OUT: {arg1}')
        elif opcode == 5:
            if arg1 != 0:
                i = arg2
                no_inc = True
        elif opcode == 6:
            if arg1 == 0:
                i = arg2
                no_inc = True
        elif opcode == 7:
            if arg1 < arg2:
                memory[memory[i + 3]] = 1
            else:
                memory[memory[i + 3]] = 0
        elif opcode == 8:
            if arg1 == arg2:
                memory[memory[i + 3]] = 1
            else:
                memory[memory[i + 3]] = 0
        elif opcode == 99:
            break


        if not no_inc: 
            i += OPCODES[opcode]

    return memory

def part1(instructions: List[int]):
    output_memory = execute(instruction_list)
    print(f'Part 1 Solution: {output_memory[0]}')

# def part2(instructions: List[int]):
#     # We need to brute force some verb and noun to give us an output
#     for noun in range(100):
#         for verb in range(100):
#             output_memory = execute(instruction_list, noun, verb)
#             if(output_memory[0] == 19690720):
#                 print(f'Part 2 Solution {noun * 100 + verb}')
#                 return

with open('input', 'r') as file:
    instruction_list = file.readlines()[0]
    instruction_list = [int(instruction) for instruction in instruction_list.split(',')]
    part1(instruction_list)

# part2(instruction_list)