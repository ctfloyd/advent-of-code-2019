def check_valid(num):
    return check_adjacnet_digits(num) and check_increasing_digits(num)

def check_adjacnet_digits(num):
    str_num = str(num)
    return  (str_num[0] == str_num[1] and str_num[0] != str_num[2]) or (str_num[1] == str_num[2] and str_num[1] != str_num[3] and str_num[2] != str_num[0]) or \
            (str_num[2] == str_num[3] and str_num[2] != str_num[4] and str_num[3] != str_num[1]) or (str_num[3] == str_num[4] and str_num[3] != str_num[5] and str_num[4] != str_num[2]) or \
            (str_num[4] == str_num[5] and str_num[5] != str_num[3])

def check_increasing_digits(num):
    str_num = str(num)
    return str_num[5] >= str_num[4] and str_num[4] >= str_num[3] and str_num[3] >= str_num[2] and str_num[2] >= str_num[1] and str_num[1] >= str_num[0]


count = 0
valid = []
for val in range(136818, 685980):
    if check_valid(val):
        valid.append(val)
        count += 1
print(valid)
print(count)