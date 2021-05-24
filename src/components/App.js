import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3'
import Betting from '../abis/Betting.json'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Contests from './Contests.js'
import Setteams from './Setteams.js'
import Matches from './Matches';
import Creatematch from './Creatematch';
import backgroundimg from './styles/redbg.webp'
import Sendmoney from './Sendmoney';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
     
      isLoading: true,
      account:''
      
    }
  }

  async componentDidMount() {

    await this.loadWeb3();
    await this.loadBlockchainData();

  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    this.setState({web3})
    const accounts = await web3.eth.getAccounts()
    this.setState({account:accounts[0]})
    console.log('acc'+this.state.account)
    const networkId = await web3.eth.net.getId();

    const bettingdata = await Betting.networks[networkId];
    if(bettingdata) {
      const betting = new web3.eth.Contract(Betting.abi, bettingdata.address)
      console.log('bad'+bettingdata.address)
      this.setState({betting});
      this.setState({isLoading:false})
      
    } else
    {
      alert("Contract not deployed")
    }
  }

  
  render() {
  
    if(this.state.isLoading)
    {
      return(
        <div>
          Loading...
        </div>
      )
    }
  
    return (
      <div>
        <Router>
        <Route exact path = '/contests/:matchid' render={() => <Contests data={this.state} />}></Route>
        <Route exact path = '/teams/:matchid/:contid' render={() => <Setteams data={this.state} />}></Route>
      <Route exact path = '/' render={() => <Matches data={this.state} />}></Route>
      <Route exact path = '/sendmoney' render={() => <Sendmoney data={this.state} />}></Route>
      <Route exact path ='/sendmatch' component={Creatematch}></Route>
      </Router>


      </div>
    );


  }
}

export default App;
