const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    paths: function (paths, env) {
        paths.appBuild = path.resolve(__dirname, 'target/classes/public');
        return paths;
    },
    webpack: function(config, env) {
        if (!config.plugins) {
            config.plugins = [];
        }
        config.plugins.push(
            new CopyPlugin([
                { from: 'src/assets/product-img', to: 'static/product-img' },
                { from: 'src/assets/pdf', to: 'static/pdf' }
            ])
        );
        return config;
    },

};
