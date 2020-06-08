import React, {Component} from 'react'


class Chat extends Component{

    constructor(props){
        super(props)
        this.state ={ quote: ''}
        this.addQuote = this.addQuote.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    addQuote(evt){
        this.setState({quote: evt.target.value})
    }
    handleSubmit(evt){
        evt.preventDefault()
        this.props.newQuote(this.state)
        this.setState({quote:''})
    }
       render(){
        let v  = [...this.props.quotes];
        return(
            <div>
                <ul>
        {v.map(q => <li>{this.props.name} mowi {q}</li>)

                    }
                </ul>
                <form onSubmit ={this.handleSubmit}>         
                    <input type='text'value = {this.state.quote} onChange = {this.addQuote} />
                    
                    <button>Go</button>
                </form>               
            </div>
        )
    }
}

export default Chat
