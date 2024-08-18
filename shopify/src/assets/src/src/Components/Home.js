import React, { Component } from 'react'
import './Home.css'
import Hoc from './SubComponents'

//Class component
export  class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            username:'',
            age:0
        };
    }
    changeName(event){
        this.setState({
            username:event.target.value
        })
    }
    // incrementAge(){
    //     this.setState({
    //         age:this.state.age+1
    //     })
    // }
    // decrementAge(){
    //     this.setState({
    //         age:this.state.age-1
    //     })
    // }
  render() {
    return (
      <div className='outer-cont'>
        <h1 style={{color:this.props.color}}>Hello , {this.state.username} and your age is {this.props.age}</h1>
        <div className='inner-cont'>
        <p>Enter your name : 
        <input type='text' name='username' value={this.state.username} onChange={(event)=>this.changeName(event)}></input></p>
        <p>Age : 
            {/* <button onClick={()=>this.incrementAge()}>Age + </button>
            <button onMouseOver={()=>this.decrementAge()}>Age - </button> */}
            <button onClick={this.props.incrementAge}>Age +</button>
            <button onMouseOver={this.props.decrementAge}>Age -</button>
        </p>
        </div>
      </div>
    )
  }
}
export default Hoc(Home);
