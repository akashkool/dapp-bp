const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3('ws://127.0.0.1:7545');
const {abi, byteCode} = require('../compile');

let accounts;
let inboxContract;

beforeEach(async()=>{
     //Get a list of all accounts
     accounts = await web3.eth.getAccounts();
     console.log(accounts);

     //User one of those acounts to deploy
     //the contract
     inboxContract = await new web3.eth.Contract(abi)
     .deploy({data  : byteCode, arguments: ['Hi there!']})
     .send({from    : accounts[0], 
            gas     : '1000000'});
});

describe('Inbox',()=>{
    it('deploys a contract',()=>{
        console.log(inboxContract);
    });
});