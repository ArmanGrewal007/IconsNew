import os 

dir_path = './public/icons'
file_names = os.listdir(dir_path)
print(f"total icons: {len(file_names)}") # same as ls public/icons | wc -l 

base_set = set()
for file_name in file_names:
    base_name = file_name.rstrip(r'.svg').split(r'-')[0]
    base_set.add(base_name)

print(f"unique icons: {len(base_set)}")

base_lst = sorted(list(base_set))
complete_lines = len(base_lst) // 3

with open("output.html", "w") as outputfile:
    outputfile.write('<table> <tr> <th>Name</th><th>Icon</th> <th>Name</th><th>Icon</th> <th>Name</th><th>Icon</th>  </tr>')
    for i in range(0, len(base_lst), 3):
        if i+2 < len(base_lst): # Only add if within the bounds
            print(f"adding {i}, {i+1}, {i+2}")
            outputfile.write(f'<tr> \
                    <td><code>{base_lst[i]}</code></td>  <td><img src="./public/icons/{base_lst[i]}-Dark.svg" width="48"></td> \
                    <td><code>{base_lst[i+1]}</code></td><td><img src="./public/icons/{base_lst[i+1]}-Dark.svg" width="48"></td> \
                    <td><code>{base_lst[i+2]}</code></td><td><img src="./public/icons/{base_lst[i+2]}-Dark.svg" width="48"></td> \
                            </tr>\n')
    # Adding the last line (either 1 element or two elements)
    items_in_last_line = len(base_lst) % 3
    if items_in_last_line == 1:
        print(f"adding {len(base_lst)-1}")
        outputfile.write(f'<tr> \
                <td><code>{base_lst[-1]}</code></td>  <td><img src="./public/icons/{base_lst[-1]}-Dark.svg" width="48"></td> \
                </tr>\n')
    elif items_in_last_line == 2:
        print(f"adding {len(base_lst)-2}, {len(base_lst)-1}")
        outputfile.write(f'<tr> \
                <td><code>{base_lst[-2]}</code></td>  <td><img src="./public/icons/{base_lst[-2]}-Dark.svg" width="48"> \
                </td><code><td>{base_lst[-1]}</code></td>  <td><img src="./public/icons/{base_lst[-1]}-Dark.svg" width="48"></td> \
                </tr>\n')
    outputfile.write('</table>')
