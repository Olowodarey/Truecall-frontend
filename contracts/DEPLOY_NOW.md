# Deploy Your Contract to Testnet - Step by Step

## 🎯 You're Ready! Follow These Steps:

### Step 1: Open the Deployment Page

**Go to**: https://explorer.hiro.so/sandbox/deploy?chain=testnet

### Step 2: Connect Your Wallet

1. Click the **"Connect Stacks Wallet"** button
2. Select **Hiro Wallet** from the options
3. **Approve** the connection in your wallet popup
4. Make sure your wallet is set to **Testnet** mode

### Step 3: Enter Contract Details

Once connected, you'll see two fields:

**Contract Name:**

```
football-prediction
```

**Contract Code:**
Copy and paste the ENTIRE content from this file:

```
/home/olowo/Desktop/truecall1/contracts/contracts/football-prediction.clar
```

To copy the file:

```bash
cat /home/olowo/Desktop/truecall1/contracts/contracts/football-prediction.clar
```

Then select all (Ctrl+A) and copy (Ctrl+C)

### Step 4: Deploy!

1. Click **"Deploy Contract"** button
2. Review the transaction in your wallet popup
3. **Confirm** the transaction
4. Wait 1-2 minutes for confirmation

### Step 5: Save Your Contract Info

After deployment succeeds, you'll see:

- ✅ Transaction ID (txid)
- ✅ Your contract address

**Write these down!**

Your contract will be at:

```
<YOUR_WALLET_ADDRESS>.football-prediction
```

### Step 6: Update Backend .env

Open `/home/olowo/Desktop/truecall1/backend/.env` and update:

```bash
CONTRACT_ADDRESS=<YOUR_WALLET_ADDRESS>
CONTRACT_NAME=football-prediction
ORACLE_PRIVATE_KEY=<YOUR_PRIVATE_KEY>
ORACLE_ADDRESS=<YOUR_WALLET_ADDRESS>
```

**To get your private key:**

1. Open Hiro Wallet
2. Settings → View Secret Key
3. Copy the **hex private key** (64 characters)

### Step 7: Restart Backend

```bash
cd /home/olowo/Desktop/truecall1/backend
# Kill current server (Ctrl+C) then:
pnpm run start:dev
```

---

## ✅ Success!

Your contract is now deployed and your backend can interact with it!

**Test it:**

```bash
curl http://localhost:3001/api/oracle/events
```

---

## 🆘 Troubleshooting

**"Insufficient funds"**

- Make sure you have testnet STX in your wallet
- Get more from: https://explorer.hiro.so/sandbox/faucet?chain=testnet

**"Contract already exists"**

- Someone already deployed a contract with this name from your address
- Change the contract name to `football-prediction-v2` or similar

**Can't connect wallet**

- Refresh the page
- Make sure Hiro Wallet extension is installed
- Check wallet is set to Testnet mode
