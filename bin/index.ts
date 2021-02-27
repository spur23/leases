import { Command } from 'commander';

const program = new Command();

program
  .command('add <note>')
  .alias('a')
  .description('Add a new note.')
  .action((note) => console.log(note));

program.parse(process.argv);
