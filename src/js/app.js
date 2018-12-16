App = {
    web3Provider: null,
    contracts:{},
    init: function () {
        console.log('App initialized...');
        return App.initWeb3();
    },
    initWeb3: function () {
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider
            web3 = new Web3(App.web3Provider);
        } else {
            // Set the provider you want from Web3.providers
            App.web3Provider = new Web3.providers.HttpProvider("http://localhost:7545");
            web3 = new Web3(App.web3Provider);
        }

        return App.initContracts();
    },
    initContracts: function () {
        $.getJSON("DappTokenSale.json", function (dappTokenSale) {
            App.contarcts.DappTokenSale = TruffleContract(dappTokenSale);
            App.contracts.DappTokenSale.setProvider(App.web3Provider);
            App.contarcts.DappTokenSale.deployed().then(function(dappTokenSale){
               console.log('Dapp Token Sale Address:', dappTokenSale.address) ;
            })
            }).done(function(){
                $.getJSON("DappToken.json", function (dappToken) {
                    App.contarcts.DappToken = TruffleContract(dappToken);
                    App.contracts.DappToken.setProvider(App.web3Provider);
                    App.contarcts.DappToken.deployed().then(function(dappToken){
                        console.log('Dapp Token Address:', dappToken.address) ;
                    })
                });
        });
        
        
    }
}

$(function () {
    $(window).load(function () {
        App.init();
    });
});