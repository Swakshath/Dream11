import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './App.css';
import { Checkbox} from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup'
import Table from 'react-bootstrap/Table'
import Web3 from 'web3'
import Betting from '../abis/Betting.json'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Contests from './Contests.js'

var getdata = require('./teams.json')



class App extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      playerscount:0,
      playerselected:false,
      playersttoval:0,
      isLoading: true,
      account:'',
      contid:0
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

      var contestid = await betting.methods.contestid.call();
      this.setState({contid:contestid})
      this.setState({isLoading:false})
    
      console.log('con'+contestid)

      var teamsc = await betting.methods.contests(1).call();
      console.log('connn'+teamsc)
    } else
    {
      alert("Contract not deployed")
    }
  }

  playercountin(state, props) {
    const newState = {...state, playerscount: state.playerscount + 1};
    return newState;
  }


  handleChange({target}){
    if (target.checked){
      console.log('beforeup'+this.state.playerscount)
      this.setState({playerscount:this.state.playerscount+1}, function() {
        console.log('afterup'+this.state.playerscount)
        if(this.state.playerscount==3)
        {
          console.log("here")
          this.setState({playerselected:true}, function() {
            console.log("in")
          })
        }
      
      });
      this.setState({playersttoval:this.state.playersttoval+parseInt(target.value)})
      console.log('playerval'+this.state.playersttoval)
      console.log('stateplayercount'+this.state.playerscount)
    } else {
      this.setState({playerscount:this.state.playerscount-1});
      this.setState({playerselected:false})
      this.setState({playersttoval:this.state.playersttoval-parseInt(target.value)})
      console.log('inelse')
    }
}


  /*joncontest = () => {
    this.setState({isLoading:true});
    this.state.betting.methods.joincontest(this.state.contid, this.state.playersttoval).send({from:this.state.account}).on('transactionHash'), (hash) => {
      this.setState({isLoading:false})
    }
  }*/

  joincontest = () => {
    this.setState({ isLoading: true });
    this.state.web3.eth.sendTransaction({to: this.state.betting.address, from: this.state.account, value: this.state.web3.utils.toWei('2')}).on('transactionHash', (hash) => {
      this.state.betting.methods.joincontest((this.state.contid.toString()), (this.state.playersttoval.toString())).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({isLoading:false})
      })
     } )
   
  }

  getmoney = () => {
    this.setState({isLoading:true});
    this.state.betting.methods.sendwinner(this.state.account).send({from: this.state.account}).on('transactionHash', (hash) => {
      this.setState({isLoading:false})
    }) 
  }

  render() {
    
    

    
    var a="queen";
    var team1 = [];
    var team2 = [];
 
    let playerscount = 10;
  

  getdata['Team1'].forEach((element, index) => {
          team1.push(       /* <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Checkbox id={"a"+index} value={index+1} onClick={this.handleChange}/>
            <InputGroup.Text>{element}</InputGroup.Text>
          </InputGroup.Prepend>
        </InputGroup>)    */
    <tr>
      <td 
        width="5%"><InputGroup.Prepend><div className={!this.state.playerselected?'uncheckclass':'checkclass'}><InputGroup.Checkbox /*{!this.state.playerselected?'op':'checkclass'}*/ id={"a"+index} value={2**(index)} 
        onClick={this.handleChange} /*disabled={( this.state.playerselected && (!this.checked))?true:false}*//></div>
        </InputGroup.Prepend></td>
      <td style={{width:"45%"}}>{element}</td>
      <td width="5%"><InputGroup.Prepend><div className={!this.state.playerselected?'uncheckclass':'checkclass'}><InputGroup.Checkbox id={"b"+index} value={2**(index+11)} onClick={this.handleChange} /*disabled={( this.state.playerselected && (!this.checked))?true:false}*//>
      </div>
      </InputGroup.Prepend></td>
      <td style={{width:"45%"}}>{getdata['Team2'][index]}</td>
    </tr>
  
 ) 
    });
    console.log('g'+JSON.stringify(getdata))
    
console.log('jscount'+(++playerscount))
console.log('checkc'+playerscount)

if(this.state.isLoading)
return(
  <div>
    Loading...
  </div>
)
    return (
      <div>
        <Router>
        <Form id="selplayers">
          <Table style={{width:"50%"}} striped bordered >
          <thead>
    <tr>
      <th>Team1</th>
      <th>players</th>
      <th>Team2</th>
      <th>players</th>
    </tr>
  </thead>
  <tbody>
        {team1}
      </tbody>
        </Table>
        <Button variant="primary" onClick={this.joincontest} disabled={!this.state.playerselected}>Join Contest</Button>
        </Form>
        {this.state.playerselected.toString()}
        {this.state.playersttoval}

        <Button variant="primary" onClick={this.getmoney}>Get My Money</Button>
      <Contests data={this.state} />
      
        <Link to="/contests">Go</Link>
        <Route exact path = '/contests' render={() => <Contests data={this.state} />}></Route>
      </Router>
      </div>
    );


  }
}

export default App;
