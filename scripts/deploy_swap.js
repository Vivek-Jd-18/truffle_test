// const Factory = artifacts.require('Factory.sol');
// const Router = artifacts.require('Router.sol');
const Pair = artifacts.require('Pair.sol');
const Token1 = artifacts.require('Token1.sol');
const Token2 = artifacts.require('Token2.sol');
const RemoveLiquidity = artifacts.require('RemoveLiquidityContract.sol');
const IPancakeRouter01 = artifacts.require('IPancakeRouter01.sol');
const IPancakeRouter02 = artifacts.require('IPancakeRouter02.sol');
const IPancakeFactory = artifacts.require('IPancakeFactory.sol');
const IPancakePair = artifacts.require('IPancakePair.sol');
const ethers = require("ethers");
const Web3 = require("web3");


module.exports = async done => {
    try {
        // console.log(ethers.utils.parseUnits('10', 6),"data1")
        // console.log(ethers.utils.formatUnits(10,18),"data")

        const [admin, _] = await web3.eth.getAccounts();
        console.log(admin, "admin address")
        const iPancakeRouter01 = await IPancakeRouter01.at('0xD99D1c33F9fC3444f8101754aBC46c52416550D1');
        const iPancakeRouter02 = await IPancakeRouter02.at('0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3');
        const iPancakeFactory = await IPancakeFactory.at('0x6725F303b657a9451d8BA641348b6761A6CC7a17');
        const iIPancakePair = await IPancakePair.at('0x6725F303b657a9451d8BA641348b6761A6CC7a17');


        const token1 = await Token1.new();
        console.log(token1.address, "=-=--=token1-==--=")
        const token2 = await Token2.new();
        console.log(token2.address, "=-=--=token2-==--=")

        const pairAddress = await iPancakeFactory.createPair.call(token1.address, token2.address);
        console.log(pairAddress, "0000000000000000000000-=-==-==-pairAddress-=-==-=-=")


        const tx = await iPancakeFactory.createPair(token1.address, token2.address);

        //fetching pair contract
        const pairCtr = await IPancakePair.at(pairAddress);
        console.log(pairCtr, "0000000-==-=--==--pairCtr-=-=-=-==-");
        // console.log("-=-==-=-=--=-tx-==--", tx)
        await token1.approve(iPancakeRouter01.address, 1000000);
        await token2.approve(iPancakeRouter01.address, 1000000);



        const addLiquidityREsponse = await iPancakeRouter01.addLiquidity(
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
        const pair = await IPancakePair.at(pairAddress);
        console.log(pair, "0000000000000000000000000000-==-=--==--pair-=-=-=-==-")
        const balance = await pair.balanceOf(admin);
        console.log(`balance LP: ${balance.toString()}`);


        // converting eth to wei 
        // web3_bsc.utils.toHex(web3_bsc.utils.toWei(amountToGet)),
        //     web3_bsc.utils.toHex(web3_bsc.utils.toWei(amountOutMax)),





        //swap functionality 
        // const txApprove = await usdtContract.approve(swapper.address, ethers.utils.parseUnits('1100', 6));

        const approveTkn1 = await token1.approve(iPancakeRouter01.address, Web3.utils.toHex(Web3.utils.toWei("10000")));
        console.log("approveTkn1", await approveTkn1);

        const pairApprove = await pairCtr.approve(iPancakeRouter01.address, Web3.utils.toHex(Web3.utils.toWei("10000")));
        console.log("approveTkn1", await pairApprove);


        // const approveFromPool = await pool.approve(iPancakeRouter01.address, Web3.utils.toHex(Web3.utils.toWei("100")));
        // console.log("approveFromPool", await approveFromPool);


        // Web3.utils.toHex(Web3.utils.toWei("10")),
        // Web3.utils.toHex(Web3.utils.toWei("10")),

        const adminBalToken1 = await token1.balanceOf(admin);
        // console.log("adminBalToken1", ethers.utils.formatEther(adminBalToken1));
        const adminBalToken2 = await token2.balanceOf(admin);
        // console.log("adminBalToken2", ethers.utils.formatEther(adminBalToken2));


        const pairAir = [token1.address, token2.address];
        console.log(pairAir,"------------pairAir-----------")
        console.log("-============n1=--------------", ethers.utils.formatUnits(10000000000, "gwei"))
        console.log("-============n2=--------------", ethers.utils.formatUnits(1000000000, "gwei"))

        const swapperResponse =
            await iPancakeRouter01.swapTokensForExactTokens
                (
                    // // amountIn,
                    // // minAmountOut,
                    // // path[] [tokenaddress1,tokenaddress2],
                    Web3.utils.toHex(Web3.utils.toWei("1005")),
                    Web3.utils.toHex(Web3.utils.toWei("1005")),
                    pairAir,
                    admin,
                    Date.now(),    {
                        // gasPrice: provider.getGasPrice(),
                        // gasLimit: 310000,
                        value: 1005
                    })
        console.log("swapper response -=", swapperResponse);

    } catch (e) {
        console.log(e);
    }
    done();
};