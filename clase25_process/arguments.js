console.log(process.argv.slice(2) )

const { Command } = require("commander")
const program = new Command()

program
    .option('-d', 'Variable debug', false)
    .option('-p <port>','Puerto del servcidor', 8080 )
    .option('--mode <mode>', 'Modo de trbabajo', 'prodution')
    .requiredOption('-u <user>', 'User que usa el app', 'No se ha declarado un user')

program.parse()

console.log('Options: ', program.opts())
console.log('Arguments: ', program.args)