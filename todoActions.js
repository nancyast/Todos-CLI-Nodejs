const readline = require("readline");
const args = process.argv;
const chalk = require("chalk");
const { usage, errorLog } = require("./validateArgs.js");

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({ todos: [] }).write();

function prompt(question) {
  const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  return new Promise(function(resolve, reject) {
    read.question(question, function(answer) {
      read.close();
      resolve(answer);
    });
  });
}

const newTodo = () => {
  const question = chalk.blue("Type in your todo\n");
  prompt(question).then(answer => {
    db.get("todos")
      .push({
        title: answer,
        complete: false
      })
      .write();
  });
};

const newTodoAsync = async () => {
  const question = chalk.blue("Type in your todo\n");
  const answer1 = await prompt(question);
  const answer2 = await prompt("Do you want to add more");
  const answer3 = await prompt("Do you want to add more");
};

const getTodo = () => {
  const todos = db.get("todos").value();
  todos.forEach((todo, index) => {
    let todoText = `${index + 1}. ${todo.title}`;
    if (todo.complete) {
      todoText += " ✔ ";
    }
    console.log(chalk.strikethrough(todoText));
  });
};

const completeTodo = () => {
  if (args.length !== 4) {
    errorLog("invalid number of arguments");
    return;
  }

  let n = Number(args[3]);
  if (isNaN(n)) {
    errorLog("Please provide a valid number");
    return;
  }

  let totosLength = db.get("todos").value().length;
  if (n > totosLength) {
    errorLog("the number is greater than total number of todos");
    return;
  }

  db.set(`todos[${n - 1}].complete`, true).write();
};

module.exports = { newTodo, getTodo, newTodoAsync, completeTodo };
