const path = require('path');
module.exports = {
    outputDir: path.resolve(__dirname, '../src-server/public'),
    devServer: {
        proxy: 'http://localhost:3000'
    }
}