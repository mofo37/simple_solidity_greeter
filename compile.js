const path = require('path');
const fs = require('fs');
const solc = require('solc');

const greeterPath = path.resolve(__dirname, 'contracts', 'greeter.sol');
const source = fs.readFileSync(greeterPath, 'UTF-8');

module.exports = solc.compile(source, 1).contracts[':Greeter'];