import { ethers } from "hardhat";
import { HTEST } from "../typechain-types";

const ONE_BILLION = 1_000_000_000n;
const ONE_UNIT = 10n ** 18n;

async function main() {
  const totalSupply = ONE_BILLION * ONE_UNIT;

  const HTEST = await ethers.getContractFactory("HTEST");
  const token = await HTEST.deploy(totalSupply);

  await token.waitForDeployment();

  display(token);
}

async function display(token: HTEST) {
  const address = await token.getAddress();
  const decimals = await token.decimals();
  const totalSupply = await token.totalSupply();

  const displayTotalSupply = ethers.formatUnits(totalSupply, decimals);

  console.log(
    `HTEST with total supply of ${displayTotalSupply} deployed to ${address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
