import React, {Component} from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { CardColumns } from 'react-bootstrap'


class Matches extends Component {

    async componentDidMount(){
        await this.Getmatches();
        this.setState({isLoading:false})
    }

    async Getmatches()  {
        fetch('http://localhost:8080/getfantasymatches')
        .then((response) => response.json())
        .then((data) => this.setState({matches:data}));

    }
  
    

    constructor(props){
        super(props)
        this.state = {
            isLoading:true,
            matches:[]
        }
    }



    render(){

        var matcheslist = []
        this.state.matches.forEach(element => {
            matcheslist.push(
                <Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title>Match Number: {element.matchid}</Card.Title>
    <Card.Text>
     {element.team1}vs{element.team2}
     <br></br>
     {element.dateofmatch}
    </Card.Text>
    <Button variant="primary" href={"/contests/"+element.matchid}>Participate</Button>
  </Card.Body>
</Card>
            )
        });

        if(this.state.isLoading)
            return(
                <div>
                    Loading...
                </div>
            )
        return(
            <div>
                <CardColumns>
                    {matcheslist}
                </CardColumns>
                {JSON.stringify(this.state.matches)}
            </div>
        )
    }
}

export default Matches;