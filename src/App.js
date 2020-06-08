import React, {Component} from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom'
import Home from './Home'
import Chat from './Chat'


class App extends Component{
  constructor(props){
      super(props);
      this.state = {name: 'Andrzej',
                  quotes: []
    }
      this.setName = this.setName.bind(this);
      this.newQuote = this.newQuote.bind(this);
  }
 setName(val){
          console.log('Submit')
          this.setState({
            name: val.userName
          });

      }
  newQuote(x){
    let oldQuotes = this.state.quotes
    this.setState({
      quotes: [...oldQuotes, x.quote]
    })
  }
  render(){
      return(
          <div className = 'App'>
             <Route exact path ='/' render = { (routeProps) => <Home name = {this.state.name} setName = {this.setName} {...routeProps}/> }  />
              <Route exact path ='/chat' render = {() => <Chat name = {this.state.name} quotes = {this.state.quotes} newQuote = {this.newQuote}/>}/>
          </div>
      )
  }
}


/*function App() {
  return (
    <div className="App">
          <Route exact path ='/' component ={Home} />
          <Route exact path ='/chat' component ={Chat} />
    </div>
  );
}*/

export default App;
