const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
} = require("@solana/web3.js");

// Create wallet

const newPair = new Keypair(); // Holds public key and secret key.

const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
const secretKey = newPair._keypair.secretKey;

const getWalletBalance = async () => {
  try {
    // To get balance
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed"); // ClusterApiUrl provides url for devnet(devnet is kind of testnet)
    const myWallet = await Keypair.fromSecretKey(secretKey);
    const walletBalance = await connection.getBalance(
      new PublicKey(myWallet.publicKey)
    );
    console.log(`=> For wallet address ${publicKey}`);
    console.log(`=> Wallet balance`, parseInt(walletBalance));
    console.log(`=> Cost per SOL`, LAMPORTS_PER_SOL);
    console.log(
      `   Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL}SOL` // LAMPORTS_PER_SOL - cost per SOL
    );
  } catch (err) {
    console.log(err);
  }
};

const airDropSol = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const walletKeyPair = await Keypair.fromSecretKey(secretKey);
    const fromAirDropSignature = await connection.requestAirdrop(
      new PublicKey(walletKeyPair.publicKey),
      2 * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(fromAirDropSignature);
  } catch (err) {
    console.log(err);
  }
};

// Main function ( Entry point )

const driverFunction = async () => {
  await getWalletBalance();
  await airDropSol();
  await getWalletBalance();
};

driverFunction();
