print("A simple project to display concepts in oop and classes in python")


class User:
    def __init__(self, name, password, id_number, city, age, gender):
        self.name = name
        self.password = password
        self.id_number = id_number
        self.city = city
        self.age = age
        self.gender = gender

    def log_in(self):
        print("Welcome back: " + self.name)
        password = int(input("To proceed,enter password:"))
        if password == self.password:
            print("Logged in successful")

    def change_password(self):
        print("password changed")


user_1 = User("Wallace Wambulwa", "0000", "28282829", "Nairobi kenya", "19", "male")
# print("****___USER___DETAILS****")
# print("NAME: " + user_1.name)
# print("CITY: " + user_1.city)
# print("PASSWORD: " + user_1.password)
# print("IDENTITY NUMBER: " + user_1.id_number)
# print("AGE: " + user_1.age)
# print("GENDER: " + user_1.gender)

user_1.log_in()
