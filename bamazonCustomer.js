//NPM package dependency
var Table = require('cli-table2');
var mysql = require("mysql");
var inquirer = require("inquirer");

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
  printTable();
});

//Use cli-table2 to print the sql table
function printTable() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
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
      head: ['item_id', 'product_name', 'department_name', 'price', 'stock_quantity', 'product_sales']
    });
    for (var i = 0; i < res.length; i++) {
      //Push mysql elements to table array 
      table.push(
        [res[i].item_id, res[i].product_name, res[i].department_name, 
        "$" + res[i].price, res[i].stock_quantity, res[i].product_sales]
      );
    }
    //Print the entire table using the cli-table2 npm
    console.log(table.toString());
  });
  idPrompt();
}

//Ask user for the id of product they wish to buy
function idPrompt() {
  //mysql query
  connection.query("SELECT item_id FROM products", function(err, res) {
    if (err) throw err;
    //ask user for id
    inquirer.prompt({
      type: "input",
      message: "Please enter the ID of the product you would like to buy:",
      name: "id"
    }).then(function(answer) {
      var chosenId;
      //check if id exists in table
      for (var i = 0; i < res.length; i++) {
        if (answer.id == res[i].item_id) {
          //if id exists, grab id number and pass into quantity function
          chosenId = res[i].item_id;
          quantityPrompt(chosenId);
          //break the for loop when id is found
          break;
          //once the loop has reached the end, if the id was not found, prompt user to enter a new one
        } else if (i === res.length - 1) {
          console.log("This ID does not exist.\nPlease choose another from the table above...");
          idPrompt();
        }
      }
    });
  });
}

//prompt user for the quantity they wish to buy. Pass in selected id
function quantityPrompt(id) {
  //mysql query
  connection.query("SELECT stock_quantity, price, product_sales FROM products WHERE ?", {item_id: id}, function(err, res) {
    if (err) throw err;
    //ask user for quantity
    inquirer.prompt({
      type: "input",
      message: "Please enter the quantity you would like to buy:",
      name: "quantity"
    }).then(function(answer) {
      //check if quantity in stock is greater than or equal to the quantity requesed 
      if (res[0].stock_quantity >= parseInt(answer.quantity)) {
      	var newQuantity = res[0].stock_quantity - parseInt(answer.quantity);
      	var newSales = res[0].product_sales + parseInt(answer.quantity);
      	//mysql query to update quantity
        connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: newQuantity,
                product_sales: newSales
              },
              {
                item_id: id
              }
            ],
            function(error) {
              if (error) throw err;
              //if no error tell user their order has been processed and the total
              console.log("Your Order has been processed!\nYour total is $" + 
              	(parseInt(answer.quantity) * res[0].price));
              //end connection to mysql
              connection.end();
            }
          );
        //if quantity requested is higher than in stock, ask the user for a new quantity
      } else {
        console.log("Insufficient quantity in stock.\nPlease select a smaller quantity...");
        quantityPrompt(id);
      }
    });
  });
}

