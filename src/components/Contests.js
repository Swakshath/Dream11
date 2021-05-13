import { Component } from "react";
import React from 'react'

class Contests extends Component {

    constructor(props)
    {
        super(props)
        this.state = {

        }
    }

    render()
    {
        return(
            <div>
                {this.props.data.isLoading.toString()}
            </div>
        )

        }
    
}

export default Contests;