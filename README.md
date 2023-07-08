# Hardhat-Lottery
A truly decentralized, autonomous, verified, fair lottery/raffle smart contract
##This project uses the Sepolia testnet. get some ETH at [faucets.chain.link](https://faucets.chain.link/)



# Decentralized Lottery Smart Contract

This project is a fully decentralized and autonomous lottery smart contract implemented using Solidity and the Hardhat framework. It incorporates Chainlink VRF (Verifiable Random Function) and Chainlink Automation for secure and reliable random number generation and automation of contract functions.

## Features

- Implements a decentralized lottery system based on smart contracts.
- Utilizes Chainlink VRF to generate verifiable random numbers.
- Integrates Chainlink Automation for automating contract functions.
- Mocks Chainlink VRFCoordinatorV2 for local testing and development.
- Built with Solidity and deployed using JavaScript.
- Provides a transparent and auditable lottery system that is open to verification.

## Project Structure

The project is organized as follows:

- `contracts/`: Contains the Solidity smart contract files.
- `scripts/`: Contains JavaScript scripts to deploy and interact with the smart contracts.
- `test/`: Contains test scripts to test the functionality of the smart contracts.
- `mocks/`: Contains mock contracts for local testing and development.
- `hardhat.config.js`: Configuration file for Hardhat setup.
- `README.md`: This file.

## Getting Started

1. Clone the repository:

   ```node
   git clone https://github.com/chidubesteve/Hardhat-Lottery.git
   ```

2. Install the dependencies:

   ```node
   cd your-repository
   npm install
   ```

3. Configure your development environment:

   - Install Hardhat globally:

     ```node
     npm install -g hardhat
     ```

   - Set up your Ethereum network provider and accounts in the `hardhat.config.js` file.

4. Compile the smart contracts:

   ```node
   npx hardhat compile
   ```

5. Run the tests:

   ```node
   npx hardhat test
   ```

6. Deploy the smart contracts:

   ```node
   npx hardhat run scripts/deploy.js --network <network-name>
   ```

   Replace `<network-name>` with the desired network (e.g., `rinkeby`, `mainnet`, `sepolia`).

7. Interact with the deployed contract using the provided JavaScript scripts in the `scripts/` directory.

## Contributing

Contributions to this project are welcome. Feel free to submit bug reports, feature requests, or pull requests. Please ensure that your code follows the established coding style and passes the tests.

## License

This project is licensed under the [MIT License](LICENSE).

Feel free to customize and expand this template to include additional information specific to your project.
