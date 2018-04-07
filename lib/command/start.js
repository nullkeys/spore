const { start } = require('../action/start');

module.exports = (commander) => {
    commander
        .command('start')
        .description('this is the start')
        .arguments('<package> <name>')
        .action((package, name) => {
            start(package, name).then(x => console.log('done'));
        });
};
