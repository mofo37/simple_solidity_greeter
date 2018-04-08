//Work on this file next because both the deploy and test files will expect we have compiled solidity ready to go. This compile file with take the source code (greeter.sol) and create the ABI(js interpretation layer), and the contract bytecode, which will go to the ethereum network.

// Can't just require the file because when we use require, node tries to execute the file as js code. This will throw an error bc this is solidity code. We have to read the contents of the file off the hard drive. 

// we use path and fs which are built in node modules. path is cross-platform compatible (will work with windows and unix)
const path = require('path');
const fs = require('fs');
// solidity compiler
const solc = require('solc');

// __dirname is constant defined by node, which gets set to current working directory. It takes you from home computer directory to Greeter. Then we pass in contracts and greeter.sol 
const greeterPath = path.resolve(__dirname, 'contracts', 'greeter.sol');
// Now that we have path we can read in raw sourcecode. Specify which type of encoding greeter.sol will use. utf-8.
const source = fs.readFileSync(greeterPath, 'UTF-8');

// call compile on the source code, then specify how many contracts we're compiling. In this case just one. 
module.exports = solc.compile(source, 1).contracts[':Greeter'];

// The return of the compile method will always be an object. contracts is the top level object, which holds all the contracts you've just compiled. The solidity compiler is built assuming you may want to compile multiple contracts. We've only compiled one at this point.

// 2 properties on the greeter object that we care about. The bytecode, which we're going to deploy to the ethereum network. It holds the code that will be stored on the blockchain. The interface(contract ABI) is the communication layer between the js and the solidity world. The actual interface is full of all the methods that exist on the contract that can be called and what type of arguments and return values are handled with each of those functions. 