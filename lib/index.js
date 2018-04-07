const { version } = require('../package.json');
const commander = require('commander');
const { register } = require('./command');

register(commander);
commander
    .version(version)
    .parse(process.argv);
