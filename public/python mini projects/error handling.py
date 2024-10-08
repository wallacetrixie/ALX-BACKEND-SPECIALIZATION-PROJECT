# TRY AND CATCH EXCEPTION
with open('Try_exception.txt', 'w') as file:
    file.write("Welcome to Try with exception bocks in python")
try:
    with open('Try_exception.txt', 'r') as file:
        file_content = file.read()
        print(file_content)
except:
    print("The file you want to open does not exist")
