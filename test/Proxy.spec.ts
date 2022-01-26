import { expect } from "chai";
import { ethers } from "hardhat";

describe("Proxy", function () {
  let owner: any;
  let proxy: any, logicV1: any;

  beforeEach(async () => {
    [owner] = await ethers.getSigners();

    const LogicV1 = await ethers.getContractFactory("LogicV1");
    logicV1 = await LogicV1.deploy();
    await logicV1.deployed();

    const Proxy = await ethers.getContractFactory("Proxy");
    proxy = await Proxy.deploy();
    await proxy.deployed();

    await proxy.setImplementation(logicV1.address);
  });

  it("points to an implementation contract", async () => {
    expect(await proxy.callStatic.getImplementation()).to.eq(logicV1.address);
  });

  // it("proxies calls to implementation contract", async () => {
  //   const abi = [
  //     "function uint256 crossFee() external view return (uint256)",
  //     "function crossSend(address recipient, uint tokenAmount, uint nonce) external payable",
  //     "function crossRecv(address sender, address recipient, uint tokenAmount, uint nonce) external",
  //   ];

  //   const proxied = new ethers.Contract(proxy.address, abi, owner);

  //   await proxied.crossRecv(owner, owner, 1, 1);
  //   expect(await proxied.crossFee()).to.eq(3);
  // });

  // it("allows to change implementations", async () => {
  //   const LogicV2 = await ethers.getContractFactory("LogicV2");
  //   const logicv2 = await LogicV2.deploy();
  //   await logicv2.deployed();

  //   await proxy.setImplementation(logicv2.address);

  //   const abi = [
  //     "function uint256 crossFee() external view return (uint256)",
  //     "function crossSend(address recipient, uint tokenAmount, uint nonce) external payable",
  //     "function crossRecv(address sender, address recipient, uint tokenAmount, uint nonce) external",
  //   ];

  //   const proxied = new ethers.Contract(proxy.address, abi, owner);

  //   await proxied.crossRecv(owner, owner, 1, 1);
  //   expect(await proxied.crossFee()).to.eq(5);
  // });
});
