# FILE MANAGEMENT IN PYTHON WRITING INTO A FILE
with open('file management.txt', 'w') as file:
    number = 500
    file.write(str(number))


# FILE MANAGEMENT READING FROM A FILE

with open('file management.txt', 'r') as file:
    file_content = file.read()
    print(file_content)