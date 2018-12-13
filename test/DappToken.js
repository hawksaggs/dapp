DappToken = artifacts.require('DappToken');

contract('DappToken', function (accounts) {
    var tokenInstance;

    it('it should initialize the correct contract value', function () {
        return DappToken.deployed().then(function (instance) {
            tokenInstance = instance;
            return tokenInstance.name();
        }).then(function (tokenName) {
            assert.equal(tokenName, 'Dapp Token', 'it set the correct token name');
            return tokenInstance.symbol();
        }).then(function (tokenSymbol) {
            assert.equal(tokenSymbol, 'Dapp', 'it set the correct token symbol');
            return tokenInstance.standard();
        }).then(function (tokenStandard) {
            assert.equal(tokenStandard, 'Dapp Token v1.0', 'it set the correct token standard');
        });
    });

    it('it should assign totalSupply on deployment', function () {
        return DappToken.deployed().then(function (instance) {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function (totalSupply) {
            assert.equal(totalSupply.toNumber(), 1000000, 'it sets the totalSupply to 1000000');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function (adminBalance) {
            assert.equal(adminBalance.toNumber(), 1000000, 'it set the initial total token to admin balance');
        });
    });

    it('transfer token ownership', function () {
        return DappToken.deployed().then(function (instance) {
            tokenInstance = instance;
            // Test `require` statement first by transferring something larger than the sender's balance
            return tokenInstance.transfer.call(accounts[1], 999999999);
        }).then(assert.fail).catch(function (error) {
            assert(error.message.indexOf('revert') >= 0, 'error message contain revert');
            return tokenInstance.transfer.call(accounts[1], 250000, {
                from: accounts[0]
            });
        }).then(function (success) {
            assert.equal(success, true, 'transaction successful');
            return tokenInstance.transfer(accounts[1], 250000, {
                from: accounts[0]
            });
        }).then(function (receipt) {
            assert.equal(receipt.logs.length, 1, 'trigger one event');
            assert.equal(receipt.logs[0].event, 'Transfer', 'should be the transfer event');
            assert.equal(receipt.logs[0].args._from, accounts[0], 'should contain sender account address');
            assert.equal(receipt.logs[0].args._to, accounts[1], 'should contain owner account address');
            assert.equal(receipt.logs[0].args._value.toNumber(), 250000, 'should contain 250000 amount');
            return tokenInstance.balanceOf(accounts[1]);
        }).then(function (toBalance) {
            assert.equal(toBalance.toNumber(), 250000, 'add the amounts to the receiving balance');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function (fromBalance) {
            assert.equal(fromBalance.toNumber(), 750000, 'remaining amount in sender\'s balance');
        })
    });

    it('approve tokens for delegated transfer', function () {
        return DappToken.deployed().then(function (instance) {
            tokenInstance = instance;
            return tokenInstance.approve.call(accounts[1], 100);
        }).then(function (success) {
            assert.equal(success, true, 'approve token successfully');
            return tokenInstance.approve(accounts[1], 100, {
                from: accounts[0]
            });
        }).then(function (receipt) {
            // console.log(receipt);
            assert.equal(receipt.logs.length, 1, 'trigger one event');
            assert.equal(receipt.logs[0].event, 'Approval', 'should be the approve event');
            assert.equal(receipt.logs[0].args._owner, accounts[0], 'should be the owner address');
            assert.equal(receipt.logs[0].args._spender, accounts[1], 'should be the spender address');
            assert.equal(receipt.logs[0].args._value.toNumber(), 100, 'should contain 100 amount');
            return tokenInstance.allowance(accounts[0], accounts[1]);
        }).then(function (allowance) {
            assert.equal(allowance.toNumber(), 100, 'store the allowance for delegated transfer');
        })
    });
});