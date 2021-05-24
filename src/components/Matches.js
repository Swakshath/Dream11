import React, {Component} from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { CardColumns, CardDeck, CardGroup } from 'react-bootstrap'
import './styles/Matches.css'
import Typewriter from 'typewriter-effect'
const logos = require.context("./styles/logos")

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
            var str1 = "./team"+element.team1+".png";
            console.log(element.team1);
            matcheslist.push(
                <Card style={{ width: '18rem' }} className="glowing-border">
                    <center>
  <Card.Body>
    <Card.Title className="cardtitle">Match Number: {element.matchid}</Card.Title>
    <Card.Text className="cardtext">
        
        <img src={logos(str1)} height="100rem" alt="imgno"></img>vs<img src={logos(`./team2.png`)} height="100rem" alt="imgno"></img>

     <br></br>
     {element.team1}vs{element.team2}
     <br></br><br></br>
     {element.dateofmatch.toString().slice(0, 19).replace('T', ' ')} GMT
    </Card.Text>
    <Button variant="danger" href={"/contests/"+element.matchid}>Participate</Button>
  </Card.Body>
  </center>
</Card>
            )
        });
        function disptext() {
        new Typewriter('#typewriter', {
            strings: ['Hello', 'World'],
            autoStart: true,
          });
        }
        if(this.state.isLoading)
            return(
                <div>
                    Loading...
                </div>
            )
        return(
            <div className="matches">
                <div className="split descbox" id="descbox">
                    <Typewriter
  
                    onInit={(typewriter)=> {
                
                    typewriter
                    .changeDelay(100)
                    .changeDeleteSpeed(1)
                    .typeString("INTRODUCING THE<br>ONE AND ONLY<br>BLOCKCHAIN BASED<br>FANTASY LEAGUE")
                    .deleteAll()
                    .typeString("SMOOTH<br>TRANSACTIONS,<br>TRANSPARENT, AND<br>USER-FRIENDLY")
                    .deleteAll()
                    .typeString("WHAT ARE YOU<br>WAITING FOR?<br>SELECT A MATCH<br>AND GET STARTED")
                    .start();
                    }}
                    />
                </div>
                <div className="split matchesbox">
                <CardColumns>
                    {matcheslist}
                </CardColumns>
                </div>
                <span class="clear"></span>
            </div>
            
        )
    }
}

export default Matches;