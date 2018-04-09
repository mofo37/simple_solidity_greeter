// npm install --save mocha ganache-cli web3@1.0.0-beta.26
// in this test file we will deploy an instance of the contract. Manipulate the instance. Make an assertion.


const assert = require('assert');
// ganache automatically creates a set of unlocked accounts for us to use on the local test network. No need for private or public keys.
const ganache = require('ganache-cli');
// web3 is our portal to any interaction with the ethereum blockchain.
const Web3 = require('web3');

const provider = ganache.provider();
// this instance of web3 allows us access to the unlocked accounts that ganache provides us.
const web3 = new Web3(provider);

const { interface, bytecode } = require('../compile');

let accounts;
let greeter;

beforeEach(async () => {
  // get a list of all accounts. In this case we are using the eth(ethereum) module of the web3 library. On that module we are using getAccounts method. Every action we are taking in web3 is async and will return a promise. So we use async/await to clean up code. This 'accounts' will return a promise that gets resolved with a list of accounts.
  accounts = await web3.eth.getAccounts();
  // use one of those accounts to deploy the contract
  // need to get access to the bytecode from the compiled contract. Contract is capitalized because we are creating an instance of the contract. It is a constructor function. When the compiler spit out the ABI it did so as JSON. We want to pass an actual JS object to the Contract instance. So we parse. This greeter line tells web3 that there is a contract and it can use this interface to communicate with it. greeter is our js representation of the contract. We can call functions on it and interact with it in ways that correspond to the solidity contract we wrote.
  greeter = await new web3.eth.Contract(JSON.parse(interface))
    // data is the actual bytecode. If you look at the Greeter contract's constructor function, you'll see the arguments needed to initialize the greeting property. It's in an array because the constructor function can take more than one argument. The deploy line tells web3 we actually want to deploy a new contract. It creates an object that can then be deployed to network.
    .deploy({ data: bytecode, arguments: ['Hey world']})
    // specifying the account we want to use to deploy the contract. Also specify the gas we'll use. Anytime we modify the blockchain, we have to spend some amount of gas. Actually triggers the communication from web3 to the network. It actually deploys the contract. 
    .send({ from: accounts[0], gas: '1000000'});
  // provider is the communication layer to the actual blockchain.
  greeter.setProvider(provider);
});

describe('Greeter', () => {
  // makes sure that our beforeEach is working properly.
  it('deploys an account', () => {
    console.log(greeter);
    assert.ok(greeter.options.address);
  });
  // makes sure that when we create an instance of a contract, a default message is present.
  it('has a default message', async () => {
    // access the greeter instance variable. Using the call() method. Doesn't take lots of time. Not modifying any data.
    // reference the contract(greeter). Reference the methods on greeter. Reference the greeting() method on methods. Use the call() method to invoke this function.
    const message = await greeter.methods.greeting().call();
    assert.equal(message, 'Hey world');
  });
  // makes sure that when we call setGreeting, the message is updated.
  it('changes message', async () => {
    // using the send() method which will modify the contract. When we use it we must specify where (which account) it is coming from. It also specifies who is paying the gas. The specified account is paying the gas.
    await greeter.methods.setGreeting('how goes it?').send({ from: accounts[0] });
    const message = await greeter.methods.greeting().call();
    assert.equal(message, 'how goes it?');
  });
});