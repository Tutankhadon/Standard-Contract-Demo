// SPDX-License-Identifier: SimPL-2.0

pragma solidity >=0.7.0 <=0.8.2;

contract Counter {

    address public owner;

    mapping(address => int) countList;

    constructor() {
        owner = msg.sender;
    }

    function query() public view returns (int)  {
        return countList[msg.sender];
    }
    
    function plus(int number) public {
        countList[msg.sender] += number;
    }

    function minus(int number) public {
        if((countList[msg.sender]-number)<0){
            countList[msg.sender]=0;
        }
        else{
            countList[msg.sender] -= number;
        }
    }

    function reset() public {
        countList[msg.sender] = 0;
    }
}
