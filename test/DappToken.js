DappToken = artifacts.require('DappToken');

contract('DappToken', function (accounts) {
    var tokenInstance;

    it('it should initialize the correct contract value', function () {
        return DappToken.deployed().then(function (instance) {
            tokenInstance = instance;
            return tokenInstance.name();
        })
            .then(function (tokenName) {
                assert.equal(tokenName, 'Dapp Token', 'it set the correct token name');
                return tokenInstance.symbol();
            })
            .then(function (tokenSymbol) {
                assert.equal(tokenSymbol, 'Dapp', 'it set the correct token symbol');
                return tokenInstance.standard();
            })
            .then(function (tokenStandard) {
                assert.equal(tokenStandard, 'Dapp version v1.0', 'it set the correct token standard');
            });
    });

    it('it should assign totalSupply on deployment', function () {
        return DappToken.deployed().then(function (instance) {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        })
            .then(function (totalSupply) {
                assert.equal(totalSupply.toNumber(), 1000000, 'it sets the totalSupply to 1000000');
                return tokenInstance.balanceOf(accounts[0]);
            })
            .then(function (adminBalance) {
                assert.equal(adminBalance.toNumber(), 1000000, 'it set the initial total token to admin balance');
            });
    });
});