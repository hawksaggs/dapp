pragma solidity ^0.4.24;

contract DappToken {

    string public name = "Dapp Token";
    string public symbol = "Dapp";
    string public standard = "Dapp version v1.0";
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;

    constructor(uint256 _totalSupply) public {
        balanceOf[msg.sender] = _totalSupply;
        totalSupply = _totalSupply;    
        //allocate the initial supply
    }
}