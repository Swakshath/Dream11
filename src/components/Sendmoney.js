import React, {Component} from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

class Sendmoney extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading:true,
            winners: []
        }
    }

    async componentDidMount() {
        await this.getwinners();
        this.setState({isLoading:false})
    }

    winnersdet = {}
    async getwinners() {
        fetch('http://localhost:8080/getwinner')
        .then((response) => response.json())
        .then((data) => this.setState({winners:data}));

    }


    sendwinnermoney = (addresswinner, matchid, contestid) => {
        var formobj= {winner:addresswinner, matchid:matchid, contestid:contestid}
        this.setState({isLoading:true})
        this.props.data.betting.methods.sendwinner(addresswinner, matchid, contestid).send({from: this.props.data.account}).on('transactionHash', (hash) => {
            fetch('http://localhost:8080/sentwinner', {
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(formobj)
            })
            this.setState({isLoading:false})
          }) 
    }


    render() {
        if(this.state.isLoading)
            return(
                <div>
                    Loading...
                </div>
            )
        if(this.state.winners.a=="none")
            return(
                <div>
                    No winners to give 
                </div>
            )
        else{

            var winnertable = []
            this.state.winners.forEach((element)=>{
                winnertable.push(
                    <tr>
                        <td>{element.matchid}</td>
                        <td>{element.contestid}</td>
                        <td>{element.winneraddrs}</td>
                        <td><Button variant="danger" onClick={() => this.sendwinnermoney(element.winneraddrs, element.matchid, element.contestid)}>Pay</Button></td>
                    </tr>
                )
            })

        return(
            <div style={{'color':'white'}}>
                <Table striped bordered className="playertable">
          <thead>
    <tr>
      <th>Match ID</th>
      <th>Contest ID</th>
      <th>Winner address</th>
      <th>Pay</th>
    </tr>
  </thead>
  <tbody>
        {winnertable}
      </tbody>
      </Table>
            {JSON.stringify(this.state.winners)}
            
            </div>
            )
        }
    }
}

export default Sendmoney;