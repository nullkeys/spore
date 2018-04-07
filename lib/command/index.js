
function register(commander) {
    require('./start')(commander);
    require('./publish')(commander);
}

module.exports.register = register;
