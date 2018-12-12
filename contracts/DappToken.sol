pragma solidity ^0.4.24;

contract DappToken {

    string public name = "Dapp Token";
    string public symbol = "Dapp";
    string public standard = "Dapp Token v1.0";
    uint256 public totalSupply;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    mapping(address => uint256) public balanceOf;

    constructor(uint256 _totalSupply) public {
        balanceOf[msg.sender] = _totalSupply;
        totalSupply = _totalSupply;    
        //allocate the initial supply
    }

    //Transfer
    function transfer(address _to, uint256 _value) public returns(bool success) {
        //Check if balance of sender is greater than the value
        require(balanceOf[msg.sender] >= _value, "revert the transaction");
        //Do the transfer
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        //Emit transfer event
        emit Transfer(msg.sender, _to, _value);
        //Return boolean
        return true;
    }
}