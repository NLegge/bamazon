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
  head: ['department_id', 'department_name', 'over_head_costs', 'product_sales', 'total_profit']
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
      "View Product Sales by Department",
      "Create New Department"
    ]
  }).then(function(answer) {
    switch (answer.menuItem) {
      case "View Product Sales by Department":
        viewProducts();
        break;

      case "Create New Department":
        createDepartment();
        break;
    }
  });
}

function viewProducts() {
  var query = "SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales, products.product_sales - departments.over_head_costs AS total_profit FROM departments INNER JOIN products ON products.product_sales GROUP BY department_name ORDER BY total_profit";
  connection.query(query, function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      //Push mysql elements to table array 
      table.push(
        [res[i].department_id, res[i].department_name, res[i].over_head_costs, "$" + res[i].product_sales, "$" + res[i].total_profit]
      );
    }
    //Print the entire table using the cli-table2 npm
    console.log(table.toString());
    //Select another action? yes/no
    another();
  });
}

function createDepartment() {
  // prompt for info about the department being added
  inquirer.prompt([{
        name: "name",
        type: "input",
        message: "What is the department you would like to add?"
      },
      {
        name: "cost",
        type: "input",
        message: "What is the overhead cost for this department?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new department into the db with that info
      connection.query(
        "INSERT INTO departments SET ?", {
          department_name: answer.name,
          over_head_costs : answer.cost
        },
        function(err) {
          if (err) throw err;
          console.log("Your department has been added successfully!");
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