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
    console.log(token1.address,"=-=--=token1-==--=")
    const token2 = await Token2.new();
    console.log(token2.address,"=-=--=token2-==--=")

    const pairAddress = await iPancakeFactory.createPair.call(token1.address, token2.address);
    console.log(pairAddress, "0000000000000000000000-=-==-==-pairAddress-=-==-=-=")

    const tx = await iPancakeFactory.createPair(token1.address, token2.address);
    console.log("-=-==-=-=--=-tx-==--", tx)
    await token1.approve(router.address, 10000);
    await token2.approve(router.address, 10000);



    const addLiquidityREsponse = await router.addLiquidity(
      token1.address,
      token2.address,
      10000,
      10000,
      10000,
      10000,
      admin,
      Math.floor(Date.now() / 1000) + 60 * 10
    );
    console.log(addLiquidityREsponse, "00000000000000000000000000000-=--=--=-==-addLiquidityREsponse-=-=---===-==")
    const pair = await Pair.at(pairAddress);
    console.log(pair, "0000000000000000000000000000-==-=--==--pair-=-=-=-==-")
    const balance = await pair.balanceOf(admin);
    console.log(`balance LP: ${balance.toString()}`);


    //new pair combinations

    // const addLiquidityREsponse2 = await router.addLiquidityETH(
    //   address token,
    //   uint256 amountTokenDesired,
    //   uint256 amountTokenMin,
    //   uint256 amountETHMin,
    //   address to,
    //   uint256 deadline
    // );



    //remove liquidity
    await token1.approve(router.address, 1000);
    await token2.approve(router.address, 1000);

    const removeLiquidityRes = await removeLiquidityObj.removeLiquidity(
      token1.address,
      token2.address,
      20,
      1,
      1,
      admin,
      Math.floor(Date.now() / 1000) + 60 * 10
    );
    console.log("-=-=--=-=removeLiquidityRes-=-=-=--=-", removeLiquidityRes);

  } catch (e) {
    console.log(e);
  }
  done();
};