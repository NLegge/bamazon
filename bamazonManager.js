//NPM package dependency
var Table = require('cli-table2');
var mysql = require("mysql");
var inquirer = require("inquirer");
var table = new Table({
      // Outputs: 
      //╔══════╤═════╤══════╗ 
      //║ foo  │ bar │ baz  ║ 
      //╟──────┼─────┼──────╢ 
      //║ frob │ bar │ quuz ║ 
      //╚══════╧═════╧══════╝ 
      chars: {
        'top': '═',
        'top-mid': '╤',
        'top-left': '╔',
        'top-right': '╗',
        'bottom': '═',
        'bottom-mid': '╧',
        'bottom-left': '╚',
        'bottom-right': '╝',
        'left': '║',
        'left-mid': '╟',
        'mid': '─',
        'mid-mid': '┼',
        'right': '║',
        'right-mid': '╢',
        'middle': '│'
      },
      //Set table headers
      head: ['item_id', 'product_name', 'department_name', 'price', 'stock_quantity']
    });

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "L0v3myjp!",
  database: "bamazon"
});

//Connect to mysql
connection.connect(function(err) {
  if (err) throw err;
  menuOptions();
});

function menuOptions() {
  inquirer.prompt({
  	name: "menuItem",
    type: "list",
    message: "Please select an action:",
    choices: [
      "View Products for Sale", 
      "View Low Inventory",
      "Add to Inventory",
      "Add New Product"
    ]
  }).then(function(answer) {
  	switch (answer.menuItem) {
  	  case "View Products for Sale":
  	  	viewProducts();
  	    break;

      case "View Low Inventory":
        lowInventory();
        break;

      case "Add to Inventory":
        //function
        break;

      case "Add New Product":
        //function
        break;
  	}
  });
}

function viewProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      //Push mysql elements to table array 
      table.push(
        [res[i].item_id, res[i].product_name, res[i].department_name, "$" + res[i].price, res[i].stock_quantity]
      );
    }
    //Print the entire table using the cli-table2 npm
    console.log(table.toString());
    //end connection to mysql
    connection.end();
  });
}

function lowInventory() {
  connection.query("SELECT * FROM products", function(err, res) {
  	if (err) throw err;
  	for (var i = 0; res.length; i++) {
  	  if (res[i].stock_quantity < 5) {
  	  	table.push(
          [res[i].item_id, res[i].product_name, res[i].department_name, "$" + res[i].price, res[i].stock_quantity]
        );
  	  }
  	}  
    //Print the entire table using the cli-table2 npm
    console.log(table.toString());
    //end connection to mysql
    connection.end();	
  });
}

  	