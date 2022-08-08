const path = require('path');
const fs = require('fs');
const solc  = require('solc');

const inboxPath = path.resolve(__dirname,'contracts','Inbox.sol');
const source = fs.readFileSync(inboxPath,'utf8');

var input = {
    language: 'Solidity',
    sources: {
      'Inbox.sol': {
        content: source
      }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*']
        }
      }
    }
  };

  function findImports(path) {
    if (path === 'Inbox.sol')
      return {
        contents:
          'library L { function f() internal returns (uint) { return 7; } }'
      };
    else return { error: 'File not found' };
  }

// New syntax (supported from 0.5.12, mandatory from 0.6.0)
var output = JSON.parse(
solc.compile(JSON.stringify(input), { import: findImports })
);

let byteCode = output.contracts['Inbox.sol']['Inbox'].evm.bytecode.object;
let abi = output.contracts['Inbox.sol']['Inbox'].abi;
module.exports = {abi, byteCode};