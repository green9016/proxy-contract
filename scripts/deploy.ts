// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import hre from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const LogicV1 = await hre.ethers.getContractFactory("LogicV1");
  const logicV1 = await LogicV1.deploy();
  await logicV1.deployed();

  const Proxy = await hre.ethers.getContractFactory("Proxy");
  const proxy = await Proxy.deploy();
  await proxy.deployed();
  proxy.setImplementation(logicV1.address);  

  console.log("Proxy deployed to:", proxy.address, logicV1.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
