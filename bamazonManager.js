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
        addInventory();
        break;

      case "Add New Product":
        addItem();
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
    //Select another action? yes/no
    another();
  });
}

function lowInventory() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      var stockQuantity = res[i].stock_quantity;
      if (stockQuantity < 5) {
        table.push(
          [res[i].item_id, res[i].product_name, res[i].department_name, "$" + res[i].price, res[i].stock_quantity]
        );
      }
    }
    //Print the entire table using the cli-table2 npm
    console.log(table.toString());
    //Select another action? yes/no
    another();
  });
}

function addInventory() {
  connection.query("SELECT product_name, stock_quantity FROM products", function(err, res) {
    if (err) throw err;
    inquirer.prompt([{
        name: "choice",
        type: "list",
        choices: function() {
          var choiceArray = [];
          for (var i = 0; i < res.length; i++) {
            choiceArray.push(res[i].product_name);
          }
          return choiceArray;
        },
        message: "Please select an item to update?"
      },
      {
        name: "quantity",
        type: "input",
        message: "Please enter the new quantity?"
      }
    ]).then(function(answer) {
      connection.query(
        "UPDATE products SET ? WHERE ?", [{
            stock_quantity: answer.quantity
          },
          {
            product_name: answer.choice
          }
        ],
        function(err, res) {
          if (err) throw err;
          //Select another action? yes/no
          another();
        }
      )
      console.log("The quantity of " + answer.choice + " has been updated to " + answer.quantity);
    });
  });
}

function addItem() {
  // prompt for info about the item being added
  inquirer.prompt([{
        name: "item",
        type: "input",
        message: "What is the item you would like to add?"
      },
      {
        name: "department",
        type: "input",
        message: "What department would you like to place your item in?"
      },
      {
        name: "price",
        type: "input",
        message: "How much does the item cost?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "quantity",
        type: "input",
        message: "How many do you have in stock?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO products SET ?", {
          product_name: answer.item,
          department_name: answer.department,
          price: answer.price,
          stock_quantity: answer.quantity
        },
        function(err) {
          if (err) throw err;
          console.log("Your item has been added successfully!");
          //Select another action? yes/no
          another();
        }
      );
  });
}

function another() {
  inquirer.prompt({
      type: "list",
      message: "Would you like to select another action?",
      name: "another",
      choices: [
        "Yes",
        "No"
      ]
    }).then(function(answer) {
      if (answer.another === "Yes") {
      	menuOptions();
      } else {
        console.log("Thank you!")
        //end connection to mysql
        connection.end();
      }
    }); 
}