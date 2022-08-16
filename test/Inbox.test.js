const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3('ws://127.0.0.1:7545');
const {abi, byteCode} = require('../compile');

const initial_string = 'Hi there!';

let accounts;
let inboxContract;

beforeEach(async()=>{
     //Get a list of all accounts
     accounts = await web3.eth.getAccounts();

     //User one of those acounts to deploy
     //the contract
     inboxContract = await new web3.eth.Contract(abi)
     .deploy({data  : byteCode, arguments: [initial_string]})
     .send({from    : accounts[0], 
            gas     : '1000000'});
});

describe('Inbox',()=>{
    it('deploys a contract',()=>{
        assert.ok(inboxContract.options.address);
    });
    it('has a default message',async ()=>{
        const message = await inboxContract.methods.getMessage().call();
        assert.equal(message,initial_string);
    });
    it('can change the message',async ()=>{
        let setMessageVal = 'bye';
        await inboxContract.methods.setMessage(setMessageVal).send({ from : accounts[0]});
        const message = await inboxContract.methods.getMessage().call();
        assert.equal(message,setMessageVal);
    });
     
});