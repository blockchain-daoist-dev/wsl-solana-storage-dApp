import React from 'react';

import './App.css';

function App() {
  const [walletAddress, setWalletAddres] = React.useState(null);

  window.onload = async function () {
    try {
      if (window.solana) {

        const solana = window.solana;
        if (solana.isPhantom) {
          alert('Phantom wallet found!');
          const res = await solana.connect({ onlyIfTrusted: true })
          console.log('connected with publicKey:', res.publicKey.toString());
        }
      } else {
        alert('wallet not found!')
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className='App'>
      <header className='App-header'>
        {!walletAddress && (
          <div>
            <button className='btn' onClick={connectWallet}>
              Connect Wallet
            </button>
          </div>
        )}
        {walletAddress && (
          <div>
            <p>
              Connected Account : {''}
              <span className='adddress' {walletAddress}></span>
            </p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
