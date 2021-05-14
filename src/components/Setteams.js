import React from 'react'
import {Component} from 'react'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './App.css';
import { Checkbox} from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup'
import Table from 'react-bootstrap/Table'
import { withRouter } from "react-router";

var getdata = require('./teams.json')

class Setteams extends Component {

    constructor(props)
    {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            playerscount:0,
            playerselected:false,
            playersttoval:0,
            contid:this.props.match.params.contid,
            isLoading:true,
            urlmatch:this.props.match.params.matchid            
        }
    }

    async componentDidMount(){
        await this.LoadBlockchaindata();
    }

    async LoadBlockchaindata(){
      //var contestid = await this.props.data.betting.methods.contestid.call();
      //this.setState({contid:contestid})
    
      console.log('con'+this.state.contid)
      this.setState({isLoading:false})
      console.log(this.props.data)

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
        this.props.data.web3.eth.sendTransaction({to: this.props.data.betting.address, from: this.props.data.account, value: this.props.data.web3.utils.toWei('2')}).on('transactionHash', (hash) => {
          this.props.data.betting.methods.joincontest(/*(this.state.contid.toString()),(this.state.urlmatch.toString()), (this.state.playersttoval.toString())*/0, 0, 40).send({ from: this.props.data.account }).on('transactionHash', (hash) => {
            this.setState({isLoading:false})
          })
         } )
       
      }
    
      getmoney = () => {
        this.setState({isLoading:true});
        this.props.data.betting.methods.sendwinner(this.props.data.account).send({from: this.props.data.account}).on('transactionHash', (hash) => {
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
        Loading..
    </div>
)
        return(
            <div>
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
            </div>
        )
    }
}

export default withRouter(Setteams);