// infura.io to get an access token
// npm install --save truffle-hdwallet-provider
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider('enough spring valid street share identify bone multiply kiwi hub supply hybrid', 'https://rinkeby.infura.io/mQHuiohpC2HQrFudMcKq');

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hello world!'] })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('contract deployed to', result.options.address);
};

deploy();