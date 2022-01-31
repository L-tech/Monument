import { FormEvent, useState, useEffect } from "react";
import PrimaryButton from "../components/primary-button";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { useWeb3 } from "@3rdweb/hooks"
import { ethers, BigNumber } from "ethers";
import { packAddress } from "../lib/contractAddresses"
export function getStaticProps() {
  return {
    props: {
      title: "Monuments!",
    },
  };
}

export default function Home() {
  const { address, provider } = useWeb3();
  const sdk = new ThirdwebSDK(provider);
  const tokenModule = sdk.getTokenModule("0xf894347b0e09bF64b537De0Bdd236a322Dad9722");
  const module = sdk.getPackModule("0x2f8c6776Bc17750b055Ff8c1D82378e5C58A399A");
  const [tokenAmount, setTokenAmount] = useState(0);
  const submitCreate = async (e: FormEvent) => {
      console.log(tokenAmount);
      e.preventDefault();
      const fgf = (await tokenModule.balanceOf(address));
      const data = [
        {
          address: address,
          amount: tokenAmount, // How many tokens to mint to specified address
        }
      ]
      const message = "Please sign this message to confirm your identity and send you the MVM token.This won't cost any gas!"
      const signedMessage = await provider.getSigner().signMessage(message);
      const sdk = new ThirdwebSDK(
        new ethers.Wallet(
          process.env.WALLET_PRIVATE_KEY as string,
          // Using Rinkeby Testnet network
          ethers.getDefaultProvider("https://rinkeby.infura.io/v3/")
        ),
      );
      
      // Transfer a copy of the pack to the user
      console.log(`Transferring a pack to ${address}...`);
      const packModule = sdk.getPackModule(packAddress);
      const packTokenId = '0';
      // Note that this is async
      packModule.transfer(address, packTokenId, BigNumber.from(1));
      console.log(fgf);
   
  }

  if (!address) {
    return <p>Please connect your wallet to explore the world of monuments!</p>
  }
  return (
    <div className="flex flex-col gap-y-8">
      <form className="flex flex-col gap-y-2">
        <div>
          <label htmlFor="keyboard-description" className="block text-sm font-medium text-gray-700">
            Wanna be a part of the greatest monument revolution? Buy some MNM tokens and get a special reward from our NFT Lootbox.
          </label>
        </div>
        <input
          type="number"
          name="token"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          value={tokenAmount}
          onChange={(e) => { setTokenAmount(e.target.value) }}
          
        />
        <PrimaryButton type="submit" onClick={submitCreate}>
          Mint Token!
        </PrimaryButton>
      </form>
    </div>
  )
}
