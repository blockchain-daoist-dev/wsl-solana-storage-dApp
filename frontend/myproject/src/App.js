import React from 'react';
import * as anchor from '@project-serum/anchor';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import idl from './myproject.json'
import './App.css';

const { SystemProgram, Keypair } = anchor.web3;

let myAccount = Keypair.generate();

const programID = new PublicKey(idl.metadata.address);
console.log(programID, 'program Id set correctly!');

const network = clusterApiUrl('devnet');

const opts = {
  preflightCommitment: 'processed',
}

function App() {
  const [walletAddress, setWalletAddres] = React.useState(null);
  const [retrieveValue, setRetrieveValue] = React.useState(null);

  window.onload = async function () {
    try {
      if (window.solana) {

        const solana = window.solana;
        if (solana.isPhantom) {
          console.log('wallet detected!')
          alert('Phantom wallet found!');
          const res = await solana.connect({ onlyIfTrusted: true })
          console.log('connected with publicKey:', res.publicKey.toString());
        }
      } else {
        alert('wallet not found!')
        console.log('wallet not found!')
      }
    } catch (error) {
      alert('connect your Phantom wallet')
      console.log('wallet not yet authorize');
    }
  }

  const connectWallet = async () => {
    try {
      if (window.solana) {
        const solana = window.solana;
        const res = await solana.connect();
        setWalletAddres(res.publicKey.toString());
      } else {
        alert('transaction failed!')
      }
    } catch (error) {
      alert('the user has rejected the request!')
      console.log(error);
    }
  }

  const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new anchor.AnchorProvider(
      connection,
      window.solana,
      opts.preflightCommitment,
    )
    console.log(provider, 'provider is set correctly');
    return provider;
  }

  const retrieve = async () => {
    try {
      const provider = getProvider();
      const program = new anchor.Program(idl, programID, provider);
      const account = await program.account.init.fetch(myAccount.publicKey);
      setRetrieveValue(account.value.toString());
      console.log('retrieve value is:', retrieveValue);
    } catch (error) {
      console.log('Error in fetching:', error);
      setRetrieveValue(null)
    }
  }

  return (
    <div className='App'>
      <header className='App-header'>
        {!walletAddress ? (
          <div>
            <button className='btn' onClick={connectWallet}>
              Connect Wallet
            </button>
          </div>
        ) : (
          <div>
            <p>
              Connected Account :{' '}
              <span className='address'>{walletAddress}</span>
            </p>
          </div>
        )}
      </header>
    </div>
  );

}

export default App;
