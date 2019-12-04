from typing import List

# Not entirely happy with this code, something about it just feels messy to me still

def check_for_runs(candidate_as_string : str, do_part1 : bool) -> bool:
    run_length = []
    current_run = 1
    for i in range(len(candidate_as_string) - 1):
        if candidate_as_string[i] == candidate_as_string[i + 1]:
            current_run += 1
        else:
            run_length.append(current_run)
            current_run = 1

    # Append the last run
    run_length.append(current_run)
    if do_part1:
        return True if len(set([2, 3, 4, 5, 6]) & set(run_length)) > 0 else False
    else:
        return 2 in run_length

def check_for_increasing_digits(candidate_as_string : str) -> bool:
    c = candidate_as_string
    return c[0] <= c[1] and c[1] <= c[2] and c[2] <= c[3] and c[3] <= c[4] and c[4] <= c[5]

def check_conditions(candidate : int, lower_bound : int, upper_bount : int, do_part1 : bool) -> bool:
    candidate_as_string = str(candidate)
    if candidate < lower_bound or candidate > upper_bound:
        return False
    if len(candidate_as_string) != 6:
        return False
    if not check_for_runs(candidate_as_string, do_part1):
        return False
    if not check_for_increasing_digits(candidate_as_string):
        return False

    return True

def number_of_matches(lower_bound : int, upper_bound : int, do_part1 : bool) -> int:
    matches : int = 0
    for candidate in range(lower_bound, upper_bound + 1):
        if check_conditions(candidate, lower_bound, upper_bound, do_part1):
            matches += 1 
    return matches

# File IO
with open('/home/leo/code/advent-of-code-2019/day4/input', 'r') as file:
    lines : List[str] = file.readlines()

lines = lines[0].split('-')

lower_bound : int = int(lines[0])
upper_bound : int = int(lines[1])

print(f'Part 1: {number_of_matches(lower_bound, upper_bound, True)}')
print(f'Part 2: {number_of_matches(lower_bound, upper_bound, False)}')