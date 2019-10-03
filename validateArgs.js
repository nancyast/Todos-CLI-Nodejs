#!/usr/bin/env node

const chalk = require("chalk");
const args = process.argv;

const usage = function() {
  const usageText = `
    Todo helps you manage your todo tasks.

    usage:
    todo <command>

    command can be:

    new: used to create a new todo
    get: used to retrieve yours todos
    complete: used to mark a todo as complete
    help: used to print the usage guide
  `;

  console.log(usageText);
};

const errorLog = error => console.log(chalk.red(error));

const commands = ["new", "get", "complete", "help"];

const validateArgs = () => {
  if (args.length > 3 && args[2] != "complete") {
    errorLog("Only one argument can be accepted");
    usage();
  }

  if (!commands.includes(args[2])) {
    errorLog("invalid command passed");
    usage();
  }
};

module.exports = { validateArgs, usage, errorLog };
