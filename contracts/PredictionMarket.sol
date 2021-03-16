pragma solidity ^0.7.3;

import "./WolfySwap.sol";

contract PredictionMarket {
  
  enum Side { SandP500, DEFI }
  struct Result {
    Side winner;
    Side loser;
  }
  Result result;
  bool marketFinished;

  mapping(Side => uint) public bets;
  mapping(address => mapping(Side => uint)) public betsPerGambler;
  address public oracle;

  constructor(address _oracle) {
    oracle = _oracle; 
  }

  function placeBet(Side _side,uint tokenaAount) external payable {
    require(marketFinished == false, 'market is finished');
    require(token.balanceOf(address(this)) >= tokenAmount);
    bets[_side] += tokenAmount;
    betsPerGambler[msg.sender][_side] += tokenAmount;
  }

  function withdrawGain() external {
    uint gamblerBet = betsPerGambler[msg.sender][result.winner];
    require(gamblerBet > 0, 'you do not have any winning bet');  
    require(marketFinished == true, 'market not finished yet');
    uint gain = gamblerBet + bets[result.loser] * gamblerBet / bets[result.winner];
    betsPerGambler[msg.sender][Side.SandP500] = 0;
    betsPerGambler[msg.sender][Side.DEFI] = 0;
    msg.sender.transfer(gain);
  }

  function reportResult(Side _winner, Side _loser) external {
    require(oracle == msg.sender, 'only oracle');
    result.winner = _winner;
    result.loser = _loser;
    marketFinished = true;
  }
}