import { useCallback, useEffect, useState } from 'react';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

import { loadContract } from './utils/loadContract';


function App() {

  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null
  });
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [accountBalance, setAccountBalance] = useState(null);


  function reload() {
    setRefresh(!refresh);
  }

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        reload();
      })
      window.ethereum.on('accountsChanged', () => {
        reload();
      })
    }
  });

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();

      if (provider) {
        const contract = await loadContract("Faucet", provider);
        setWeb3Api({
          web3: new Web3(provider),
          provider,
          contract
        })
      } else {
        alert("Please install metamask!");
      }
    }

    loadProvider();
  }, [refresh]);

  const addFund = useCallback(async () => {
    const { contract, web3 } = web3Api;
    await contract.addFunds({ from: account, value: web3.utils.toWei("1", "ether") });
    reload();
  }, [web3Api, account]);

  useEffect(() => {
    const getAccount = async () => {
      const { web3 } = web3Api;
      const accounts = await web3Api.web3.eth.getAccounts();
      setAccount(accounts[0]);
      const balance = await web3.eth.getBalance(accounts[0]);
      setAccountBalance(web3Api.web3.utils.fromWei(balance, 'ether'));
    }

    web3Api.web3 && getAccount();
  }, [web3Api.web3, web3Api.provider]);

  useEffect(() => {
    const getBalance = async () => {
      const { contract, web3 } = web3Api;
      const balance = await web3.eth.getBalance(contract.address);
      setBalance(web3Api.web3.utils.fromWei(balance, 'ether'));
    };

    web3Api.contract && getBalance();
  }, [web3Api, refresh]);

  function connectWallet(e) {
    e.preventDefault();
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();

      if (provider) {
        provider.request({ method: 'eth_requestAccounts' });
        setWeb3Api({
          web3: new Web3(provider),
          provider
        })
      } else {
        alert("Please install metamask!");
      }
    }

    loadProvider();
  }

  const withdrawDonate = async () => {
    const { contract, web3 } = web3Api;
    const withdrawAmount = web3.utils.toWei("0.1", "ether");
    await contract.withdraw(withdrawAmount, {
      from: account
    });
    reload();
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div>
        {
          account &&
          <>
            <div className='text-2xl mb-2'>Current Donate : <strong>{balance} ETH</strong></div>
            <div className="text-xl text-center mb-10"><span>Account(<span className='italic'>{account}</span>):  {accountBalance} ETH</span></div>
          </>
        }
        <button onClick={addFund} type="button" className="py-2 px-4 mr-4 bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-40 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
          Donate
        </button>
        <button onClick={withdrawDonate} type="button" className="py-2 px-4 mr-4 bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-40 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
          Withdraw
        </button>
        <button type="button" onClick={connectWallet} className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-40 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
          Connect Wallet
        </button>
      </div>
    </div>
  );
}

export default App;
