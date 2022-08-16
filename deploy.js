require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {abi, byteCode} = require('./compile.js');

const provider = new HDWalletProvider(
    process.env.MNEMONIC,
    process.env.INFURA_HOST
);
const web3 = new Web3(provider);

const deploy = async() => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account',accounts[0]);

    const inboxContract = await new web3.eth.Contract(abi)
    .deploy({data   :byteCode, arguments:   ["Hi There !"]})
    .send({gas:'1000000',from:accounts[0]});

    console.log('Contract deployed to ',inboxContract.options.address);
    provider.engine.stop();

};
deploy();