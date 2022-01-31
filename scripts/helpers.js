import { ThirdwebSDK } from "@3rdweb/sdk";
import ethers from "ethers";

// Read environment variables from .env
import dotenv from "dotenv";
dotenv.config();

const walletPrivateKey = process.env.WALLET_PRIVATE_KEY;

if (!walletPrivateKey) {
    console.error("Wallet private key missing")
    process.exit(1)
}

export const sdk = new ThirdwebSDK(
    new ethers.Wallet(
        process.env.WALLET_PRIVATE_KEY,
        // We use Rinkeby Testnet network
        ethers.getDefaultProvider("https://rinkeby.infura.io/v3/")
    ),
);

const appAddress = '0xa1c061c0E2F8dcb859CF33c4C3b0e2fF1E002129'; 

export async function getApp() {
    const app = await sdk.getAppModule(appAddress);
    return app;
}