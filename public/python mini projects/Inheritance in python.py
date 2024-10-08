class Animal:
    alive = True

    def eat(self):
        print("This animal is eating")

    def sleep(self):
        print("This animal is sleeping")


class dog(Animal):
    pass


class zebra(Animal):
    pass


class monkey(Animal):
    pass


Dog = dog()
Zebra = zebra()
Monkey = monkey()

print(dog.alive)
Dog.eat()
Zebra.sleep()
