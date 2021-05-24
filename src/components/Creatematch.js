import React, {Component} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Web3 from 'web3'
import Betting from '../abis/Betting.json'
import Navbar from 'react-bootstrap/Navbar'

class Creatematch extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            isLoading:false
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
          if(this.state.account=="0x6e331deb95aEe655661E98543807dDd787863801")
          {
            this.setState({isLoading:false})
          }
        } else
        {
          alert("Contract not deployed")
        }
      }
    
    sendmatchtocontract = (matchid) => {
        this.state.betting.methods.addmatch(matchid.toString()).send({from:this.state.account}).on('transactionHash', (hash) => {
            this.setState({isLoading:false})
          }) 
    }

    uploaddata = (e) => {
        e.preventDefault()
        this.setState({isLoading:true})
        const formData = new FormData(e.target),
        formDataObj = Object.fromEntries(formData.entries())
        console.log(formDataObj)
        fetch('http://localhost:8080/uploadmatch', {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(formDataObj)
        })
        .then(this.sendmatchtocontract(formDataObj.matchid))

    }

    render() {
        if(this.state.isLoading)
        return(
            <div>
                Loading..
            </div>
        )
        return(
            <div>
              <Navbar className="navpage">
    <Navbar.Brand href="/" style={{'color':'#dc143c', 'font-size':'50px'}}>
    
     OPFantasy
    </Navbar.Brand>
  </Navbar>
             <div className="container">
                <Form method="POST" onSubmit={this.uploaddata}>
  <Form.Row>
    <Col>
      <Form.Control name="matchid" id="matchid" placeholder="Matchid" />
    </Col>
    <Col>
      <Form.Control type="datetime-local" name="datematch" id="datematch" placeholder="Date" />
    </Col>
  </Form.Row><br></br>
  <Form.Row>
    <Col>
      <Form.Control name="team1" id="team1" placeholder="Team1" />
    </Col>
    <Col>
      <Form.Control  name="team2" id="team2" placeholder="Team2" />
    </Col>
  </Form.Row><br></br>
  <Form.Row>
    <Col>
      <Form.Control name="p0" id="p0" placeholder="P0" />
    </Col>
    <Col>
      <Form.Control name="p1" id="p1" placeholder="P1" />
    </Col>
  </Form.Row><br></br>
  <Form.Row>
    <Col>
      <Form.Control name="p2" id="p2" placeholder="P2" />
    </Col>
    <Col>
      <Form.Control name="p3" id="p3" placeholder="P3" />
    </Col>
  </Form.Row><br></br>
  <Form.Row>
    <Col>
      <Form.Control name="p11" id="p11" placeholder="P11" />
    </Col>
    <Col>
      <Form.Control name="p12" id="p12" placeholder="P12" />
    </Col>
  </Form.Row><br></br>
  <Button variant="danger" type="submit">
    Submit
  </Button>
                </Form>
            </div>
                <div class="footer">
  <p style={{'float':'right'}}>Created by Swaky</p>
</div>
            </div>
        )
    }
}

export default Creatematch;