import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {  Card, Container, } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import toast from 'react-hot-toast'


const TimerComponent = () => {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState('Pending');
  const [pauseTime, setPauseTime] = useState(0);
  
  useEffect(() => {
    let intervalId;

    if (isRunning === 'Running') {
      intervalId = setInterval(() => {
        setTotalSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning],);
  const handleStart = () => {
    setIsRunning("Running");
    
  };
  
  const day = Math.floor(totalSeconds / 86400);
  const hour = Math.floor((totalSeconds % 86400) / 3600);
  const minute = Math.floor((totalSeconds % 3600) / 60);
  const second = totalSeconds % 60;


  const handlePause = () => {
    setIsRunning("Completed");
    localStorage.setItem(pauseTime.toString(), totalSeconds.toString());
    const res = localStorage.getItem(pauseTime.toString());
    setPauseTime(res);
    console.log(res);
    
  };





  return (
    <div style={{textAlign: 'center', display:"flex",flexDirection:"column", padding:"5px"}}>
      <div style={{ color:'#F3F8FF', fontSize: '26px', marginTop:'-180px', textAlign:'center'}}>
        <span>{day}</span>:<span>{hour}</span>:<span>{minute}</span>:<span>{second}</span>
      </div>
      <p style={{ color:'#F3F8FF',display:"flex", justifyContent:'center',fontSize: '26px', marginTop:'-10px', textAlign:"center"}}>{isRunning === 'Running'
            ? 'Task is running'
            : isRunning === 'Completed'
            ? 'Completed'
            : 'Pending'}</p>

      <Button onClick={handleStart} disabled={isRunning !== 'Pending'}  style={{ backgroundColor:"#7FC7D9", padding:"5px", 
                    borderRadius:"5px", width:"8rem", fontSize:"1.5rem", marginLeft:"148px", marginTop:'8px'}}><i className="fa-solid fa-circle-play"></i></Button>
      <Button onClick={handlePause} disabled={isRunning !== 'Running'}  style={{ backgroundColor:"#FFDBC3", padding:"5px", 
                    borderRadius:"5px", width:"8rem", fontSize:"1.5rem", marginLeft:"148px", marginTop:'8px'}}><i className="fa-solid fa-circle-stop"></i></Button>
    </div>
  );
}

const  GetTodo =() => {

  const [todos, setTodos] = useState([])
  useEffect(() =>{
    const fetchTask = async() =>{
      const response = await axios.get("http://localhost:8000/api/getTodos")
      setTodos(response.data);
    }
    fetchTask();
  },[]) 
  
  

  const deleteTask = async(taskId) =>{
    await axios.delete(`http://localhost:8000/api/deleteTodo/${taskId}`)
    .then((response) =>{
      setTodos((prevTodo) => prevTodo.filter((todo)=> todo._id !== taskId) )
      toast.success(response.data.msg, {position:"top-right"})
    })
    .catch(error =>{
      console.log(error);
    })
  }

  return (
    <div style={{ display:"flex", justifyContent:"center", alignItems:"center", textAlign:'center'}}>
        <Container style={{ display:"flex", flexWrap:"wrap",
        flexDirection:"row", padding:"10px", backgroundColor:'aliceblue', margin:"20px", 
        borderRadius:"6px"}}>
            <Link to={"/add"} style={{ color:'#F3F8FF',textAlign:'center', backgroundColor:"#3652AD", padding:"8px", 
            fontSize:"1.9rem", borderRadius:"5px",
             marginTop:"0px", width:"9rem", height:"4rem", marginLeft:"10px"}}>Add Todo</Link>
             {
               todos.map((todo)=>{
                return(
                  <div style={{ color:'#F3F8FF', display:"flex", textAlign:'center', justifyContent:'center', flexWrap:'wrap', alignItems:"center", padding:"10px", marginLeft:'10px' }}>
                  <Card    key={todo._id} style={{ textAlign:'center',  flexDirection:"column",  
                   padding:"10px", borderRadius:"5px",  width: '19rem', height: '20rem',
                  backgroundColor:"#525CEB"}}>
                    <h1 style={{ alignItems:"center", fontSize:"28px", textAlign:"center",  }}>{todo.title}</h1>
                    <h3 style={{fontSize:"18px"}}>{todo.description}</h3>
                    <div style={{ display:"flex", flexWrap:"wrap", flexDirection:"column", padding:"5px"}} >
                    <Button onClick={()=>deleteTask(todo._id)} style={{ backgroundColor:"#FFDBC3", padding:"5px", 
                    borderRadius:"5px", width:"8rem", fontSize:"1.5rem",marginTop:"100px", 
                    marginLeft:"-6px" }}><i className='fa-solid fa-trash-can'></i></Button>
                    <Link  to={`/edit/`+ todo._id} className='editTodo' style={{ backgroundColor:"#7FC7D9", padding:"5px", 
                    borderRadius:"5px", width:"8rem", fontSize:"1.5rem", marginLeft:"-6px", marginTop:'8px'}}><i className="fa-solid fa-pen"></i></Link>
                    <TimerComponent  />
                    </div>
                    </Card>
                    </div>
                )
            }) 
             }
          
            
        </Container>
        </div>
  )
}
export default GetTodo