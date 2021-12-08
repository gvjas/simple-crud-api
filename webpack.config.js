import path from 'path'
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    target : `node16`,
    entry : path.resolve(__dirname, 'server.js'),
    output : {
        module: true,
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    },
    experiments : {
        outputModule: true,
    }
}