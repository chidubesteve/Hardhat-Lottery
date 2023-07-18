const { network, ethers } = require("hardhat");
const {
  developmentChains,
  networkConfig,
  VERIFICATION_BLOCK_CONFIRMATIONS
} = require("../helper-hardhat-config.js");
const { verify } = require("../utils/verify");
// const {VRFCoordinatorV2Mock} = require("test/VRFCoordinatorMockV2.sol")
console.log("i've reached here")

const VRF_SUB_FUND_AMOUNT = ethers.utils.parseEther("1");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  let vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
  let chainId = network.config.chainId;
  let vrfCoordinatorV2Address, subscriptionId;

console.log("i've reached here")

  console.log(`chainId 01 : ${chainId}`)
  console.log("inside the 01-deploy-raffle.js");
  if (developmentChains.includes(network.name)) {
    vrfCoordinatorV2Mock;
    console.log("after mock");

    vrfCoordinatorV2Address =  vrfCoordinatorV2Mock.address;

    console.log(`Address ${vrfCoordinatorV2Address}`)
    const txResponse = await vrfCoordinatorV2Mock.createSubscription();
    const txReceipt = await txResponse.wait(1);
    subscriptionId = txReceipt.events[0].args.subId;
    // usually you will need Link token to fund the sub on a real network
    await vrfCoordinatorV2Mock.fundSubscription(
      subscriptionId,
      VRF_SUB_FUND_AMOUNT
    );
  } else {
    vrfCoordinatorV2Address = networkConfig[chainId]["vrfCoordinatorV2"];
    subscriptionId = networkConfig[chainId]["subscriptionId"];
  }
  const waitBlockConfirmations = developmentChains.includes(network.name)
  ? 1
  : VERIFICATION_BLOCK_CONFIRMATIONS

log("----------------------------------------------------")
  const entranceFee = networkConfig[chainId]["entranceFee"];
  const gasLane = networkConfig[chainId]["gasLane"];
  const callBackGasLimit = networkConfig[chainId]["callBackGasLimit"];
  const interval = networkConfig[chainId]["interval"];

  const args = [vrfCoordinatorV2Address, subscriptionId, gasLane, interval, entranceFee, callBackGasLimit];


  const Raffle = await deploy("Raffle", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  if (developmentChains.includes(network.name)) {
    vrfCoordinatorV2Mock;
    try {
      await vrfCoordinatorV2Mock.addConsumer(subscriptionId.toNumber(), Raffle.address)
      log("adding consumer...")
      log("Consumer added!")
    } catch (error) {
      log(error)
    }
  
}
    // Ensure the Raffle contract is a valid consumer of the VRFCoordinatorV2Mock contract.
    if (developmentChains.includes(network.name)) {
      const vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
      await vrfCoordinatorV2Mock.addConsumer(subscriptionId, Raffle.address)
  }
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    log("Verifying....");
    await verify(Raffle.address, args);
  }
  log("##################################################");
  log("Enter lottery with command:")
  const networkName = network.name == "hardhat" ? "localhost" : network.name
  log(`npx hardhat run Scripts/enterRaffle.js --network ${networkName}`)
  log("----------------------------------------------------")
  console.log("Done")
}
module.exports.tags = ["all", "raffle"];