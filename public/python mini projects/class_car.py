# CLASSES ,CONSTRUCTORS AND METHODS
class Car:
    def __init__(self, paint, model, engine_type):
        self.paint = paint
        self.model = model
        self.engine_type = engine_type

    def drive(self):
        print(self.model + " is driving")

    def stop(self):
        print(self.model + " has stopped")


Car_1 = Car("Red", "Audi", "Toyota")
print(Car_1.paint)
print(Car_1.model)
print(Car_1.engine_type)

Car_1.drive()
Car_1.stop()
