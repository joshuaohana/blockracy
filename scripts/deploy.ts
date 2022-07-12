import { ethers } from "hardhat";

async function main() {
  const Blockracy = await ethers.getContractFactory("Blockracy");
  const blockracy = await Blockracy.deploy();
  await blockracy.deployed();
  console.log("blockracy deployed to:", blockracy.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
