// infura.io to get an access token
// npm install --save truffle-hdwallet-provider
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

// specifies which node we will be using as our provider. We are using a node provided to us by infura, on the rinkeby test network.
const provider = new HDWalletProvider(
  // account pneumonic allows us to derive both the public and private keys.
  // infura link to the network where we'd like to deploy our contract. Also the network where we have ether(rinkeby).
  'enough spring valid street share identify bone multiply kiwi hub supply hybrid', 'https://rinkeby.infura.io/mQHuiohpC2HQrFudMcKq'
);

const web3 = new Web3(provider);
// we have now unlocked an account and specified which network we'd like to use to connect our web3 instance to.

// To use the async/await syntax, rather than promises, create a function here and put the asynchronous actions inside.
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  
  // so that we can see which account we'll be using.
  console.log('attempting to deploy from account', accounts[0]);
 
  // creation and deployment of contract. Just like the Greeter.test.js file.
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hello world!'] })
    .send({ from: accounts[0], gas: '1000000' });

  // Find out where our contract deployed
  console.log('contract deployed to', result.options.address);
};

deploy();

// run `node deploy.js` in command line