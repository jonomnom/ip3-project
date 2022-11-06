IP3 is a digital licensing platform to privides the digital authrization on-chain wth automatic dynamic pricing mechnism.
Features:
- Sigle NFT could be authorized to multiple authrizations terms.
- Support authorized in count term, or authroied in time period..
- Support payment with [APE Coin](https://apecoin.com/). 
- Powered by [Push Protocol]https://push.org/） in the smart contract to notify subscribers the latest contract state changes. 
## Deploy contract on Goerli testnset interact with it
- deploy the contract: run`npx hardhat run ./scripts/deployIp3.js --network goerli` (contract address: 0x5C7F5B3b5DeB3fB5F420E1841Fe4f16fbAE40c88)
- purhcase example: 
    - in the `/scripts/purchaseCertificateExample.js` changed to use new deployed ip3 contract address on line 500.
    - Then run script `npx hardhat run ./scripts/purchaseCertificateExample.js --network goerli`

## Verify contract on Goerli
run `npx hardhat verify --network goerli <IP3 Contract address> "<Stable coin address>"`
