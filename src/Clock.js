import React, { Component } from 'react';
import './Clock.css';


class Clock extends Component {
  state = {
    seconds: 0
  }

  componentDidMount(){
    this.counterID = setInterval(() => this.counter(this.state.seconds), 1000);
  }

  componentWillUnmount(){
    clearInterval(this.counterID);
  }

  counter(seconds){ 
    if (this.props.guesses === 0){
      this.setState({
        seconds: 0
      });
    } else if (this.props.guesses > 36 || this.props.won) {
      this.setState({
        seconds: seconds,
      });
    } else {
      this.setState({
        seconds: seconds + 1,
      });
    }    
  
  }

  render(){
    return (
      <div className="clock">
        <p>Temps écoulé : <strong>{ this.state.seconds }</strong> secondes</p>
      </div>

    )
  }

}

export default Clock
