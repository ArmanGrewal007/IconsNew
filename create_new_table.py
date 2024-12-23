import os 

dir_path = './public/icons'
file_names = os.listdir(dir_path)
print(f"total icons: {len(file_names)}") # same as ls public/icons | wc -l 

base_set = set()
for file_name in file_names:
    base_name = file_name.rstrip(r'.svg').split(r'-')[0]
    base_set.add(base_name)

print(f"unique icons: {len(base_set)}")

base_lst = sorted(list(base_set), key=lambda x: x.lower())
complete_lines = len(base_lst) // 3

# Remove .DS_Store if it exists
if base_lst[0] == ".DS_Store":
    base_lst.pop(0)

with open("output.html", "w") as outputfile:
    outputfile.write(f'<table> <tr><th colspan="6" align="center"> {len(base_lst)} icons and counting... </th></tr>')
    outputfile.write('<tr> <th>Name</th><th>Icon</th> <th>Name</th><th>Icon</th> <th>Name</th><th>Icon</th>  </tr>')
    for i in range(0, len(base_lst), 3):
        if i+2 < len(base_lst): # Only add if within the bounds
            print(f"adding {i}, {i+1}, {i+2}")
            outputfile.write(f'<tr> \
                    <td><code>{base_lst[i].lower()}</code></td>  <td><img src="https://icons-theta.vercel.app/icon?i={base_lst[i].lower()}" width="48"></td> \
                    <td><code>{base_lst[i+1].lower()}</code></td><td><img src="https://icons-theta.vercel.app/icon?i={base_lst[i+1].lower()}" width="48"></td> \
                    <td><code>{base_lst[i+2].lower()}</code></td><td><img src="https://icons-theta.vercel.app/icon?i={base_lst[i+2].lower()}" width="48"></td> \
                            </tr>\n')
    # Adding the last line (either 1 element or two elements)
    items_in_last_line = len(base_lst) % 3
    if items_in_last_line == 1:
        print(f"adding {len(base_lst)-1}")
        outputfile.write(f'<tr> \
                <td><code>{base_lst[-1].lower()}</code></td>  <td><img src="https://icons-theta.vercel.app/icon?i={base_lst[-1].lower()}" width="48"></td> \
                </tr>\n')
    elif items_in_last_line == 2:
        print(f"adding {len(base_lst)-2}, {len(base_lst)-1}")
        outputfile.write(f'<tr> \
                <td><code>{base_lst[-2].lower()}</code></td>  <td><img src="https://icons-theta.vercel.app/icon?i={base_lst[-2].lower()}" width="48"> \
                </td><code><td>{base_lst[-1].lower()}</code></td>  <td><img src="https://icons-theta.vercel.app/icon?i={base_lst[-1].lower()}" width="48"></td> \
                </tr>\n')
    outputfile.write('</table>')
