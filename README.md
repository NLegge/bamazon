# Bamazon: Node.js & MySQL

## Overview

Execute command line functions as one of three users:

	*The CUSTOMER can purchase items from Bamazon.
	*The MANAGER can View Products for Sale, View Low Inventory, Add to Inventory, or Add New Product.
	*The SUPERVISOR can View Product Sales by Department or Create New Department.

## User Guide

### Initialization

There is a package.json file provided. The user will need to navigate to the directory containing the project files and execute npm install command.  

![NPM Syntax](/images/npm.PNG)

### Customer

Upon opening the command line, the user will execute the bamazonCustomer.js file using the following syntax.

![Node Syntax](/images/nodeBamazonCustomer.PNG)

Upon executing the above code, a table with all of the available items will populate in the command line and the user will be prompted to "Please enter the ID of the product you would like to buy." Once an ID is selected, the user will be prompted to "Please enter the quantity you would like to buy."

If the quantity entered is available, the user will be notified "Your Order has been processed!" along with their total. 

They will then be asked "Would you like to buy another product?".

A No answer will say "Thank you for shopping with us!" and close out the connection. 

![Customer Prompts](/images/fullCustPrompt.PNG)

#### Alternate Prompts/Messages

##### Invalid ID Message
If the user enters an ID that does not exist, they will receive a message "This ID does not exist. Please choose another from the table above..." They will then be prompted to enter an ID again.

![Invalid ID](/images/.PNG)

##### Invalid Quantity Message

If the user tried to purchase more of an item than what is in stock, they will receive a message "Insufficient quantity in stock.Please select a smaller quantity..." They will then be prompted to enter a quantity again.

![Invalid Quantity](/images/.PNG)

##### Purchase Another Product Prompt

A yes answer will reprint the table with updated values and begin the ID/Quantity functions again.

![Invalid Quantity](/images/.PNG)

### Manager

Upon opening the command line, the user will execute the bamazonManager.js file using the following syntax.

![Node Syntax](/images/managerSyntax.PNG)

Upon executing the above code, a list of menu options will become available. Each option will run a different function.

![Manager Menu](/images/managerMenu.PNG)

#### View Products for Sale

If the option "View Products for Sale" is selected, the entire table of available items will print to the console. The user will then be prompted "Would you like to select another action?". 

If the user selects No, the session will end.

![View Products](/images/viewProducts.PNG)

If the user selects Yes, the console will populate the menu again. 

![Another Action](/images/yes.PNG)

#### View Low Inventory

