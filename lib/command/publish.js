

module.exports = (commander) => {
    commander
        .command('publish [publish]')
        .description('this is the end')
        .action((publish) => {
            // console.log(publish);
        });
};