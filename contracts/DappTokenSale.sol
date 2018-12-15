pragma solidity ^0.4.24;

import "./DappToken.sol";

contract DappTokenSale {
    address admin;
    DappToken public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokenSold;

    event Sell(address indexed _buyer, uint256 _amount);

    constructor(DappToken _tokenContract, uint256 _tokenPrice) public {
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
    }

    function multiply(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x, "some issue in multiplication");
    }

    function buyToken(uint256 _numberOfTokens) public payable {
        //require that value is equal to tokens
        require(msg.value == multiply(_numberOfTokens, tokenPrice), "value should be equal");
        //require that contract has enough tokens
        require(tokenContract.balanceOf(this) >= _numberOfTokens, "cannot purchase more than available");
        //require that transfer is successful
        require(tokenContract.transfer(msg.sender, _numberOfTokens), "some error occured");

        tokenSold += _numberOfTokens;

        emit Sell(msg.sender, _numberOfTokens);
    }

    //Ending DappToken Sale
    function endSale() public {
        //require admin
        require(msg.sender == admin, "only admin can call this");
        //transfer left dapp tokens to admin
        require(tokenContract.transfer(admin, tokenContract.balanceOf(this)), "Not enough balance");
        //destroy contract
        selfdestruct(admin);
    }
}