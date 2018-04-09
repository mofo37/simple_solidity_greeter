// npm install --save mocha ganache-cli web3@1.0.0-beta.26
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const provider = ganache.provider();
const web3 = new Web3(provider);

const { interface, bytecode } = require('../compile');

let accounts;
let greeter;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  greeter = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hey world']})
    .send({ from: accounts[0], gas: '1000000'});
    
  greeter.setProvider(provider);
});

describe('Greeter', () => {
  it('deploys an account', () => {
    assert.ok(greeter.options.address);
  });

  it('has a default message', async () => {
    const message = await greeter.methods.greeting().call();
    assert.equal(message, 'Hey world');
  });

  it('changes default message', async () => {
    await greeter.methods.setGreeting('how goes it?').send({ from: accounts[0] });
    const message = await greeter.methods.greeting().call();
    assert.equal(message, 'how goes it?');
  });
});