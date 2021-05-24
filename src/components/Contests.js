import { Component } from "react";
import React from 'react'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { CardColumns, CardDeck, Navbar, Nav, Form, FormControl } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import {withRouter} from 'react-router' 
import './styles/Contests.css'

class Contests extends Component {

    

    constructor(props)
    {
        super(props)
        this.state = {
            contests:5,
            isLoading:true,
            show:false,
            urlmatch:this.props.match.params.matchid
        }
    }

    async componentDidMount() {
      console.log("eroinrioekln")
      console.log(this.props.data.account)
        await this.getcontests();
    }

    async getcontests() {
      this.setState({urlmatch:this.props.match.params.matchid})
      console.log('ma'+this.state.urlmatch)
        var contestid = await this.props.data.betting.methods.getcontests(this.state.urlmatch).call();
        this.setState({contests:contestid});
      console.log('conid'+contestid)
        this.setState({isLoading:false})

    }

    createacont = () => {
        this.setState({isLoading:true});
        this.props.data.betting.methods.createcontest(this.state.urlmatch).send({from:this.props.data.account}).on('transactionHash', (hash) => {
            this.setState({isLoading:false})
            this.setState({show:true})
            //window.location.reload()
          })
        }

    

    render() {


    var cards = []
    cards.push(
      <Card style={{ width: '18rem' }} className="glowing-border">
            <Card.Body>
            <Card.Title>Contests full?</Card.Title>
            <Card.Text>
              Create a new contest!
            </Card.Text>
            <Button variant="danger" className="createbutton" onClick={this.createacont}>+</Button>

          </Card.Body>
        </Card>
    )
    for (var i = 1; i <= this.state.contests; i++) {
        cards.push(

            <Card style={{ width: '18rem' }} className="glowing-border">
            <Card.Body>
            <Card.Title>Contest ID: {i}</Card.Title>
            <Card.Text>
              Great Contest to Join!
            </Card.Text>
            <Button variant="danger" href={'/teams/'+this.state.urlmatch+"/"+i}>Join Contest</Button>
          </Card.Body>
        </Card>
        );
    }

    const handleClose = () => window.location.reload();

        return(
            <div className="contests">
  <Navbar className="navpage">
    <Navbar.Brand href="/" style={{'color':'#dc143c', 'font-size':'50px'}}>
    
     OPFantasy
    </Navbar.Brand>
  </Navbar>
            <CardColumns>
            {cards}
            </CardColumns>
            
            <Modal show={this.state.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Contest Created!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your Contest ID is {parseInt(this.state.contests)+1}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>



      <div class="footer">
  <p style={{'float':'right'}}>Created by Swaky</p>
</div>
            </div>
        )

        }
    
}

export default withRouter(Contests);