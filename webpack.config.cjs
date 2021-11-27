const path = require('path')

module.exports = {

    target: 'node16.13', // Nodejs 16.13.0 LTS
    entry: path.resolve(__dirname, './server.js'),
    module: {
        
    },
    output: {
        module: true,
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    },
    experiments: {
        outputModule: true,
    }
}

