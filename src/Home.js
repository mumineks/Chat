import React, {Component} from 'react'
import {Route, Switch, Link} from 'react-router-dom'


class Home extends Component{
    constructor(props){
        super(props);
        this.state = {userName: ''}
        this.handleSetName = this.handleSetName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }
   handleSetName(evt){
        this.setState({userName: evt.target.value})
        }
    handleSubmit(evt){
        evt.preventDefault()
        this.props.setName(this.state)
        this.props.history.push('/chat')
    }
    render(){
        return(
            <div>
                <form onSubmit = {this.handleSubmit}>
                    <label htmlFor ='userName'>Name:</label>
                    <input name = 'userName' type='text' value = {this.state.userName} onChange = {this.handleSetName} />
                    <button>Send</button>
                </form>
            </div>
        )
    }
}

export default Home
