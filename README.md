# ip3-project

[IP3](https://ip3-project.vercel.app/) is a digital licensing platform to provides the digital authorization on-chain with automatic dynamic pricing mechanism.

Features:
- One NFT could be authorized to multiple authorizations terms.
- No need to stake the NFT into the smart contract, NFT holders can sign-in to authorize their NFTs without transferring their NFT out from their wallets.
- Support authorized in count term (e.g. 10 times), or authorized in time-period term (e.g. 6-month).
- Support payment with [APE Coin](https://apecoin.com/).
- Powered by [Push Protocol](https://push.org/) in the smart contract to notify subscribers the latest contract state changes.


## Deploy contract on Goerli testnset interact with it
- deploy the contract: run`npx hardhat run ./scripts/deployIp3.js --network goerli` 
- purhcase example: 
    - in the `/scripts/purchaseCertificateExample.js` changed to use new deployed ip3 contract address on line 500.
    - Then run script `npx hardhat run ./scripts/purchaseCertificateExample.js --network goerli`
- Use [Tenderly](https://tenderly.co/) for contract alert and contract simulation.

## Verify contract on Goerli
run `npx hardhat verify --network goerli <IP3 Contract address> "<ERC20 coin address>"`
