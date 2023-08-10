const anchor = require('@project-serum/anchor');
const { SystemProgram } = anchor.web3;

const testFunc = async () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Myproject;
  const account = anchor.web3.Keypair.generate();

  let tx = await program.rpc.initialize({
    accounts: {
      initialAccount: account.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },

    signers: [account],
  });
  console.log("Your tx1 signature", tx);
  // Fetch data from the account.
  let fetchedValue = await program.account.init.fetch(account.publicKey);
  console.log("tx1 output value", fetchedValue.value.toString());
  
  // Update data from the account.
  const value = new anchor.BN(69);
  
  let tx2 = await program.rpc.updateValue(value, {
    accounts: {
      storageAccount: account.publicKey,
    },
    // signers: [account],
  })
  console.log('Your tx2 signature', tx2);
  
  let fetchedValue2 = await program.account.init.fetch(account.publicKey);
  console.log("tx2 output value", fetchedValue2.value.toString());
};

const runTest = async () => {
  try {
    await testFunc();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runTest();
