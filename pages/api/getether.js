// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ethers } from "ethers";

const wallet = new ethers.Wallet(
  // process.env.WALLET_PRIVATE_KEY,
  "8412ad060720e1f98e2b52090c5edadd28ed32569e20a95e2a1a489d130b5c0e",
  // ethers.getDefaultProvider(process.env.ALCHEMY_URL)
  "https://eth-sepolia.g.alchemy.com/v2/31RUT_dm6rYsrcR_yJoa1WWJg5VqBVgd"
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
