import React, { Component } from 'react'

const Hoc=(OriginalComponet)=>{
    return class SubComponents extends Component {
        constructor(props){
            super(props);
            this.state = {
                age:0
            };
        }
        incrementAge(){
            this.setState({
                age:this.state.age+1
            })
        }
        decrementAge(){
            this.setState({
                age:this.state.age-1
            })
        }
        render() {
          return (
            <div>
              <OriginalComponet age={this.state.age} incrementAge={()=>this.incrementAge()} decrementAge={()=>this.decrementAge()}/>
            </div>
          )
        }
      }
}
export default Hoc;

 