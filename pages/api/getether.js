// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ethers } from "ethers";

const wallet = new ethers.Wallet(
  process.env.WALLET_PRIVATE_KEY,
  ethers.getDefaultProvider(process.env.ALCHEMY_URL)
);

export default async function handler(req, res) {
  try {
    if(req.method != "POST") return res.status(400).json({ message: 'Please use POST request' });
    const walletAddress = req.body.address;
    const txn = await wallet.sendTransaction({
      to: walletAddress,
      value: ethers.parseEther("0.1"),
    });
    console.log(txn);
    res.json({ message: "Transaction initiated successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
