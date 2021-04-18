const TokenFarm = artifacts.require("./TokenFarm.sol");

module.exports = async function(callback) {
    let tokenFarm = await TokenFarm.deployed()
    await tokenFarm.issueTokens()

    console.log('token issue')

    callback()
};
