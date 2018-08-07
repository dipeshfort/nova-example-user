function config() {
    const packageJson = require('./package.json');
    process.env.APPLICATION_NAME = packageJson.name;
    process.env.APPLICATION_TITLE = packageJson.title;
    process.env.APPLICATION_VERSION= packageJson.version;
}

module.exports = {
    config
};