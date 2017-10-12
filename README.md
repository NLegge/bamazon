# Bamazon: Node.js & MySQL

## Overview

Execute command line functions as one of three users:

	*The CUSTOMER can purchase items from Bamazon.
	*The MANAGER can View Products for Sale, View Low Inventory, Add to Inventory, or Add New Product.
	*The SUPERVISOR can View Product Sales by Department or Create New Department.

## User Guide

### Customer

Upon opening the command line, the user will call the bamazonCustomer.js file from the command line using the following syntax.

![Node Syntax](/images/nodeBamazonCustomer.PNG)

Upon executing the above code, a table with all of the available items will populate in the command line and the user will be prompted to "Please enter the ID of the product you would like to buy." Once an ID is selected, the user will be prompted to "Please enter the quantity you would like to buy."

If the quantity entered is available, the user will be notified "Your Order has been processed!" along with their total. 

They will then be asked "Would you like to buy another product?".

A No answer will say "Thank you for shopping with us!" and close out the connection. 

![Customer Prompts](/images/fullCustPrompt.PNG)

####Alternate Prompts

If the user tried to purchase more 

A yes answer will reprint the table with updated values and begin the prompt process again.

