import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';



const AddTodo = () => {
  const todos = {
    title:"",
    description:""
  }
  const [task, setTask] = useState(todos)
  const navigate = useNavigate();
  const inputHandler = (e) => {
    const { name, value } = e.target; 
    setTask({ ...task, [name]:value });
    console.log(task); 
  }
  const submitForm = async(e) => {
    e.preventDefault();
    await axios.post('http://localhost:8000/api/createTodos', task)
    .then(response => {
      console.log(response)
      toast.success(response.data.msg, {position:"top-right"})
      navigate("/")
    }).catch(error => {
      console.log(error)
    })
    if(task.title === "" || task.description === "") {
      toast.error("Please fill all the fields", {position:"top-center"})
    }
  }
  const confirmBack = () => {
    if(window.confirm("Are you sure you want to go back without adding task?")) {
      navigate("/")
    }
  }
  return (
    <div style={{ display:"flex", justifyContent:"center", alignItems:"center", textAlign:'center'}}>
    <Container style={{ display:"flex",  justifyContent:"center", alignItems:"center",
    flexDirection:"column", padding:"10px", backgroundColor:'aliceblue', maxWidth:'200rem', margin:"20px", 
    borderRadius:"6px"}}>
        <Row>
         <Col>
         <Link  onClick={confirmBack} style={{ textDecoration: 'none', fontSize:"1.4rem", 
         backgroundColor:"blue", padding:"3px", width:"2rem", borderRadius:"5px",
         color:"white", marginLeft:"-430px" }}>Back</Link>
            <h1 style={{ marginTop:"10px",fontSize:"32px"}}>Add Task</h1>
            </Col>
        </Row>
        <Row>
            <Col>
            <div style={{  padding: '5px', marginBottom: '1.5rem', }}>
            <Form style={{  marginTop:"10px"}} onSubmit={submitForm}>
                <Form.Group controlId="formBasicEmail" style={{  padding: '14px'}}>
                <Form.Label style={{fontSize: '1.3rem', padding:"12px"}}>Task</Form.Label>
                <Form.Control type="text" name='title' onChange={inputHandler} placeholder="Enter task" required style={{padding: '9px',borderRadius:'9px', width:"25rem" }} />
                </Form.Group>
                
                <Form.Group controlId="formBasicPassword">
                <Form.Label style={{fontSize: '1.3rem', marginLeft:"2px", padding:"12px", }}>Description</Form.Label>
                <Form.Control  type="text" name='description' onChange={inputHandler} placeholder="Description" style={{padding: '9px',borderRadius:'9px', width:'21rem' }} />
                </Form.Group>
                <Button type="submit" style={{padding: '9px',borderRadius:'9px', backgroundColor:"#1D2B53", 
                width:"28.5rem",marginTop:"20px", color:"white", fontSize:"1.4rem", marginLeft:"12px"}}>
                Add Task
                </Button>
            </Form>
            </div>
            </Col>
        </Row>
    </Container>
    </div>
  )
}

export default AddTodo