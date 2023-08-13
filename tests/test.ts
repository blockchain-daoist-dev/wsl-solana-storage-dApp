import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from "@solana/web3.js";

async function getBalanceUsingWeb3(address: PublicKey): Promise<number> {
  const connection = new Connection(clusterApiUrl('devnet'));
  return connection.getBalance(address);
}

const publicKey = new PublicKey('EZTAtkhc89YAxQ3zFYC2WapoQyK2QgH9MAj2FfGJbEuA')
getBalanceUsingWeb3(publicKey).then( balance => {
  const solBalance = (balance / LAMPORTS_PER_SOL);
  console.log('balance is:', solBalance,'SOL')
})