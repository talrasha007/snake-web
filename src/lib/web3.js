import promisify from 'es6-promisify';
import Web3 from 'web3';
import { load } from './contract';

let web3, contract = {};

if (window.web3) {
  web3 = new Web3(window.web3.currentProvider);
  web3.eth.defaultAccount = web3.eth.accounts[0];

  web3.eth.getBalance = promisify(web3.eth.getBalance);
  web3.eth.getBlockNumber = promisify(web3.eth.getBlockNumber);
  web3.eth.getBlock = promisify(web3.eth.getBlock);
  web3.eth.getTransactionReceipt = promisify(web3.eth.getTransactionReceipt);

  contract.waitForInit = (async function () {
    Object.assign(contract, await load(web3));
  })();
} else {
  document.location.hash = '#/error';
}

export { contract };
export default web3;
