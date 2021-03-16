import React, { useState, useEffect } from 'react';
import loadBlockchain from './ethereum';
import { Pie } from 'react-chartjs-2';
import { ethers } from 'ethers';
import './App.css';

const side = {
  SandP500: 0,
  DEFI: 1
}

function App() {
  const [predictionMarket, setPredictionMarket] = useState(undefined);
  const [myBets, setMyBets] = useState(undefined);
  const [betPredictions, setBetPredictions] = useState(undefined)

  useEffect(()=> {
    const init = async ()=> {
      const { signerAddress, predictionMarket } = await loadBlockchain();
      
      const myBets = await Promise.all([
        predictionMarket.betsPerGambler(signerAddress, side.SandP500),
        predictionMarket.betsPerGambler(signerAddress, side.DEFI)
      ]);

      const bets = await Promise.all([
        predictionMarket.bets(side.SandP500),
        predictionMarket.bets(side.DEFI),
      ]);

      const betPredictions = {
      	labels: [
      		'DEFI',
      		'SandP500',
      	],
      	datasets: [{
      		data: [bets[1].toString(), bets[0].toString()],
      		backgroundColor: [
            '#FF6384',
            '#36A2EB',
      		],
      		hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
      		]
      	}]
      };

      setMyBets(myBets);
      setPredictionMarket(predictionMarket);
      setBetPredictions(betPredictions);
    }

    init();
  }, []);

  if(
    typeof predictionMarket === 'undefined'
    || typeof myBets === 'undefined'
    || typeof betPredictions === 'undefined'
  ) {
    return 'Loading...';
  }

  const placeBet = async (side, e)=> {
    e.preventDefault();
    await predictionMarket.placeBet(
      side, 
      {value: e.target.elements[0].value});
  }

  const withdrawGain = async ()=> {
    await predictionMarket.withdrawGain();
  }

  return (
    <div className="container">

      <div className="row">
        <div className="col-sm-12">
          <h1 className="text-center">Prediction Market</h1>
          <div className="jumbotron">
            <h1 className="display-4 text-center">Who will win the US Election?</h1>
            <p className="leads text-center">Current Odds:</p>
            <div>
              <Pie data={betPredictions} />
            </div>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-sm-6'>
          <div className="card">
            <img src='./img/DEFI.png' className="DEFI-img" alt="DEFI img"/>
            <div className="card-body">
              <h5 className="card-title text-center">DEFI</h5>
              <form className="form-inline" onSubmit={e => placeBet(side.DEFI, e)}>
                <input 
                  type="text" 
                  className="form-control mb-2 mr-sm-2 input-custom" 
                  placeholder="Bet amount in Wei"
                />
                <button 
                  type="submit" 
                  className="btn btn-primary mb-2"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>

          <div className='col-sm-6'>
          <div className="card">
            <img src='./img/SandP500.png' className="SandP500-img" alt="SandP500 img"/>
            <div className="card-body">
              <h5 className="card-title text-center">SandP500</h5>
              <form className="form-inline" onSubmit={e => placeBet(side.SandP500, e)}>
                <input 
                  type="text" 
                  className="form-control mb-2 mr-sm-2 input-custom" 
                  placeholder="Bet amount in Wei"
                />
                <button 
                  type="submit" 
                  className="btn btn-primary mb-2"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <h2>Your Bets:</h2>
        <ul>
          <li>SandP500: {myBets[0].toString()} Wei </li>
          <li>DEFI: {myBets[1].toString()} Wei </li>
        </ul>
      </div>

      <div className="row">
        <h2>Claim your gains(If any) after the Election</h2>
        <button
          type='submit'
          className='btn btn-primary btn-custom'
          onClick={e => withdrawGain()}
        >
          Submit
        </button>
      </div>

    </div>
  
  

  );
}

export default App;
