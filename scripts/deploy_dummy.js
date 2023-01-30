// const Factory = artifacts.require('Factory.sol');
const Router = artifacts.require('Router.sol');
const Pair = artifacts.require('Pair.sol');
const Token1 = artifacts.require('Token1.sol');
const Token2 = artifacts.require('Token2.sol');
const GetPair = artifacts.require('GetPair.sol');
const RemoveLiquidity = artifacts.require('RemoveLiquidityContract.sol');
const IPancakeRouter01 = artifacts.require('IPancakeRouter01.sol');
const IPancakeRouter02 = artifacts.require('IPancakeRouter02.sol');
const IPancakeFactory = artifacts.require('IPancakeFactory.sol');


module.exports = async done => {
  try {
    const [admin, _] = await web3.eth.getAccounts();
    // const factory = await Factory.at('0x6725F303b657a9451d8BA641348b6761A6CC7a17');
    const router = await Router.at('0xD99D1c33F9fC3444f8101754aBC46c52416550D1');

    const iPancakeRouter01 = await IPancakeRouter01.at('0xD99D1c33F9fC3444f8101754aBC46c52416550D1');
    const iPancakeRouter02 = await IPancakeRouter02.at('0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3');
    const iPancakeFactory = await IPancakeFactory.at('0x6725F303b657a9451d8BA641348b6761A6CC7a17');

    const removeLiquidityObj = await RemoveLiquidity.at('0xD99D1c33F9fC3444f8101754aBC46c52416550D1');

    const token1 = await Token1.new();
    const token2 = await Token2.new();
    console.log(token1.address, "tkn1 address=========")
    console.log(token2.address, "tkn2 address=========")


  } catch (e) {
    console.log(e);
  }
  done();
};