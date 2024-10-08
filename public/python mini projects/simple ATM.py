import sys

print("THIS IS A SIMULATION OF ATM OPERATION IN PYTHON LANGUAGE")
balance=5000
def check_pin():
    pin = 2580
    pas = int(input("Enter your pin to view your account: "))
    
    if pas != pin:
        print("Incorrect pin. Try again in two attempts")
        pas = int(input("Enter your pin to view your account: "))
    elif pas != pin:
        print("Incorrect pin. Try again in one attempt")
        pas = int(input("Enter pin for the last attempt"))
    elif pas != pin:
        print("Account blocked")
        sys.exit(0)
    
    print("Logged in successfully")

while True:
    check_pin()
    
    print("Choose the operation you want to perform")
    print("Press 1 to check your balance")
    print("Press 2 to deposit some cash")
    print("Press 3 to withdraw cash")
    print("Press 4 to exit")
    
    option = int(input("Enter an option: "))
    
    if option == 1:
        def check_balance():
            global balance
            print("Your balance is:", balance)
        check_balance()
    
    elif option == 2:
        def deposit():
            dep = int(input("Enter the amount you want to deposit: "))
            global balance
            balance += dep
            print("You have deposited", dep, "and your new account balance is", balance)
        deposit()
    
    elif option == 3:
        def withdraw():
            global balance
            wid = int(input("Enter the amount you want to withdraw: "))
            if wid > balance:
                print("Insufficient balance")
            else:
                balance -= wid
                print("You have withdrawn", wid, "and your new balance is:", balance)
        withdraw()
    
    elif option == 4:
        print("Exiting the ATM program. Have a nice day!")
        break
    
    else:
        print("Invalid choice")
