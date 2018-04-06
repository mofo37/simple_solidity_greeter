// declared a version so the compiler will know how to behave.
pragma solidity ^0.4.17;

// contract is a reserved word. It acts like classes in ruby, java, python.
contract Greeter {
  
  // storage variable (also its type). This variable will be automatically stored on the blockchain.
  string public greeting;

  // constructor function b/c it's the same word/case as the contract. Invoked automatically upon deployment.
  function Greeter(string initialGreeting) public {
    greeting = initialGreeting;
  }

  // funtion name: setGreeting, function type: public, parameter type: string, parameter name: newGreeting.
  function setGreeting(string newGreeting) public {
    greeting = newGreeting;
  }

}