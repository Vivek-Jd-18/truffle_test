const Token1 = artifacts.require('Token1.sol');
const Token2 = artifacts.require('Token2.sol');

module.exports = async done => {
    try {
        const token1 = await Token1.new();
        console.log(token1.address, "=-=--=token1-==--=")
        const token2 = await Token2.new();
        console.log(token2.address, "=-=--=token2-==--=")

    } catch (e) {
        console.log(e);
    }
    done();
};