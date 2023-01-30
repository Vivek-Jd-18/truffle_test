const ethers = require("ethers");
const web3 = require("web3");

console.log(ethers.utils.parseUnits('10', 2), "data1")
console.log(ethers.utils.parseUnits('10', 1), "data2")


console.log(web3.utils.toHex(web3.utils.toWei("10")), "data1")
console.log(web3.utils.toWei("10"), "data2")

console.log(web3.utils.toWei("1000"));


