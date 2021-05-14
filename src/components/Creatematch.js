import React, {Component} from 'react'
import Form from 'react-bootstrap/Form'

class Creatematch extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            isLoading:true
        }
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
                <Form>
                    
                </Form>
            </div>
        )
    }
}

export default Creatematch;