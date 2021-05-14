import { Component } from "react";
import React from 'react'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { CardColumns, CardDeck } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import {withRouter} from 'react-router' 


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
        await this.getcontests();
    }

    async getcontests() {
      this.setState({urlmatch:this.props.match.params.matchid})
      console.log('ma'+this.state.urlmatch)
        var contestid = await this.props.data.betting.methods.getcontests(this.state.urlmatch).call();
        this.setState({contests:contestid});
      console.log(contestid)
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
    for (var i = 0; i <= this.state.contests; i++) {
        cards.push(

            <Card style={{ width: '18rem' }}>
            <Card.Body>
            <Card.Title>Contest ID: {i}</Card.Title>
            <Card.Text>
              Great Contest to Join!
            </Card.Text>
            <Button variant="primary" href={'/teams/'+this.state.urlmatch+"/"+i}>Join Contest</Button>
          </Card.Body>
        </Card>
        );
    }

    const handleClose = () => window.location.reload();

        return(
            <div>   
            <CardColumns>
            {cards}
            </CardColumns>
            <Button variant="primary" onClick={this.createacont}>Create Contest</Button>

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


            </div>
        )

        }
    
}

export default withRouter(Contests);