const PredictionMarket = artifacts.require("PredictionMarket.sol");
const Token = artifacts.require("Token");
const WolfySwap = artifacts.require("WolfySwap");

module.exports = async function (deployer, network, addresses) {
    const [admin, oracle, gambler1, gambler2, gambler3, gambler4, _] = addresses;
    await deployer.deploy(PredictionMarket, oracle);
};


module.exports = async function(deployer) {
  // Deploy Token
  await deployer.deploy(Token);
  const token = await Token.deployed()

  // Deploy WolfySwap
  await deployer.deploy(WolfySwap, token.address);
  const WolfySwap = await WolfySwap.deployed()

  // Transfer all tokens to WolfySwap (20 million)
  await token.transfer(WolfySwap.address, '20000000000000000000000000')
};