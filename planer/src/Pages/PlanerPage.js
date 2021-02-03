import React, {useState, useContext} from 'react'
import Days from '../Components/Days';
import Context from '../Components/Context';
import SideBar from '../Components/SideBar';
import {useTasks} from '../Hooks/tasksHook'
export function PlanerPage() {
  const context = useContext(Context);
  const {token, userId, login, logout, isAuthenticated } = context;
  const {getTasks} = useTasks();
  getTasks();
  let [daysPlan, setDaysPlan] = React.useState([
    {
      id:1, 
      name: 'Monday',
      tasks:[]
    },
    {
      id:2, 
      name: 'Thusday',
      tasks:[]
    },
    {
      id:3, 
      name: 'Wensday',
      tasks:[]
    },
    {
      id:4, 
      name: 'Thursday',
      tasks:[]
    },
    {
      id:5, 
      name: 'Friday',
      tasks:[]
    },
    {
      id:6, 
      name: 'Saturday',
      tasks:[]
    },
    {
      id:7, 
      name: 'Sunsday',
      tasks:[]
    }
  ]);
  let dayPlanOptions = {
    addTask:(id,val,e)=>{
      e.preventDefault();
      let task = {
        id:Date.now(),
        title:val
      };
      setDaysPlan(
        daysPlan.map( day =>{
          if(day.id == id){
            day.tasks.push(task);
          };
           return day;
           })
       );

    },
    daysPlan:daysPlan

  }
  return (
    <Context.Provider value={{token, userId, login, logout, isAuthenticated, dayPlanOptions}}>
      <div className="page planer-page">
<SideBar/>
       <div className="container">
     <h1 className="main-heaeder">Daily planer</h1>
     <div className="days_Wrapper">
     {daysPlan.map((day)=>{
return <Days dayProps={day} key={day.id}/>
     })}
     </div>
   </div>
   </div>
    </Context.Provider>
  );
}
