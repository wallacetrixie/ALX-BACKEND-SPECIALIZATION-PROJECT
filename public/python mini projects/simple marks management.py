print("This program will be used to record students' marks scored in a test and display all possible filters in it")

scores = []
names = []  # Define names globally

def capture_names():
    global names  # Use the global names variable
    for k in range(5):
        name = input("Record the names of the 5 students:")
        names.append(name)
    print("The recorded names are", names)

capture_names()

def capture_marks():
    global scores
    for i in range(5):
        score = int(input("Enter marks for student: "))
        scores.append(score)
    print("The recorded marks are:", scores)

capture_marks()

def marks_operations():
    global scores
    highest = max(scores)
    lowest = min(scores)
    sorted_marks = sorted(scores)
    print("The highest mark recorded is:", highest)
    print("The lower mark recorded is:", lowest)
    print("Marks in sorted order is:", sorted_marks)
    print("Marks in highest to lowest score is:")
    print(sorted_marks[::-1])

marks_operations()

def unpack():
    global names, scores
    student1 = names[0]
    student2 = names[1]
    student3 = names[2]
    student4 = names[3]
    student5 = names[4]
    mark1 = scores[0]
    mark2 = scores[1]
    mark3 = scores[2]
    mark4 = scores[3]
    mark5 = scores[4]
    print(student1, "Scored:", mark1)
    print(student2, "Scored:", mark2)
    print(student3, "Scored:", mark3)
    print(student4, "Scored:", mark4)
    print(student5, "Scored:", mark5)

unpack()
