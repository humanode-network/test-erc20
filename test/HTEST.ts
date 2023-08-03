import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("HTEST", function () {
  async function deployWithOneBillionSupply() {
    const ONE_BILLION = 1_000_000_000n;
    const ONE_UNIT = 10n ** 18n;

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const totalSupply = ONE_BILLION * ONE_UNIT;
    const HTEST = await ethers.getContractFactory("HTEST");
    const token = await HTEST.deploy(totalSupply);

    return { token, totalSupply, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right total supply", async function () {
      const { token, totalSupply } = await loadFixture(
        deployWithOneBillionSupply
      );

      expect(await token.totalSupply()).to.equal(totalSupply);
    });
  });
});
