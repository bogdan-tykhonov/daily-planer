import React, {useContext} from 'react';
import {GoPlus} from 'react-icons/go';
import {IoCloseCircleOutline} from 'react-icons/io5';
import Context from './Context';
//import {AuthContext} from '../Context/AuthContext';
export default class Modal extends React.Component{
   static contextType = Context;
   state = {
    render:false,
    inputValue: ''
   }

//JSON.parse(localStorage.getItem('userData'))
   addTasks(e){
     console.log(this.context);
    e.preventDefault();
    this.context.dayPlanOptions.addTask(this.props.dayProps.id,this.state.inputValue,e);
    this.state.render = false;
    localStorage.setItem('dayTasks', JSON.stringify(this.context.dayPlanOptions.daysPlan));
    this.request(
        "/api/tasks/addTask",
        "POST",
        this.context.dayPlanOptions.daysPlan,
        { authorization: `Bearer ${this.context.token}`, "Content-Type": "application/json"}
      );
   };


    request = (url, method, body = null, headers = {}) => {
    if (body) {
      body = JSON.stringify(body);
    }
    fetch(url, { method, body, headers })
      .then((res) => res.json())
      .then(
        (result) => {
         console.log(result);
        
        },
        (error) => {
          console.log({ error: error });
        }
      );
    };




    render(){
        return(
            <React.Fragment>
                <div className="add-button" onClick={()=> this.setState({render:true})}>
           <GoPlus/>
           </div>
            {this.state.render && (
                <div className="modal-wrapper">
                    <div className="modal">
                        <IoCloseCircleOutline onClick={()=> this.setState({render:false})}/>
            <h1>Add to {this.props.dayProps.name}</h1>
                         <form onSubmit={(e)=>{this.addTasks(e)}}>
                             <input value={this.inputValue} onChange={(event)=>this.setState({inputValue:event.target.value})} type="text"/>
                            <button>Add task</button>
                        </form>
                    </div>
                </div>
            )}
            </React.Fragment>
        )
    }
}