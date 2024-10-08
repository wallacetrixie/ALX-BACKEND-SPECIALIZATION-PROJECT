# fruits=["mangoes","oranges","guavas","pineapples","apples","beetroot"]
# numbers=list(range(20))
# letters=list("LISTS IN PYTHON")
# print(len(fruits))

# #operations around lists

# fruits=["mangoes","oranges","guavas","pineapples","apples","ovacadoes"]

# #prints the specific value in a list at a specified index

# print(fruits[0])

# #using the -1 to print the last item in a list

# print(fruits[-1])


# #how to insert a specific element in a list at a specified index

# fruits[0]="bananas"

# print(fruits)

# #return the specified range of items in a list ie from 1 to 3

# print(fruits[0:3])

# #returns a range of values btwn the list ie if we want even numbers btwn 1 and 20
# numbers=list(range(20))
# print(numbers[::4])

# #returns integers in a list as from the last one to first

# print(numbers[::-1])

# #UNPACKING LISTS
# first=fruits[0]
# second=fruits[1]
# third=fruits[2]
# forth=fruits[3]
# print(first,second,third,forth)

# #using a for loop to print values in a list

# for fruits in fruits:
#     print(fruits)
    
# #to print the value and its index in a list we use

# letters=["A","B","C","D","E","F"]
# for index,letter in enumerate(letters):
#     print(index,letter)
    
# #Adding items at the end of a list
# letters.append("G")

# #adding items at the beginning of the list or at a specified index in the list

# letters.insert(0,"alphabets")

# #removing items at the end of the list
# letters.pop()
# #removing item in a list at a specified position
# letters.pop(0)
# letters.remove("A") # removes the fist alphabet that is =A
# del letters[0:3] # removes the specified range ie it will remove the first 3 elements in the list
# letters.clear()  #removes everything in the list

# #finding elements in a list

# letters.count("A")  #finds the number of occurences of a specified letter in 

 #sorting elements in a list


