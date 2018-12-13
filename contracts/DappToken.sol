pragma solidity ^0.4.24;

contract DappToken {

    string public name = "Dapp Token";
    string public symbol = "Dapp";
    string public standard = "Dapp Token v1.0";
    uint256 public totalSupply;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

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

    //Delegated Transfer
    function approve(address _spender, uint256 _value) public returns(bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns(bool success) {
        require(_value <= balanceOf[_from], "Insufficient balance");
        require(_value <= allowance[_from][msg.sender], "Insufficient allowance");

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        allowance[_from][msg.sender] -= _value;

        emit Transfer(_from, _to, _value);

        return true;
    }
}