import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom'

const UpdateTodo = () => {

  const todos ={
    title:"",
    description:""
  }
  const {id} = useParams();

  const [todo, setTodo] = useState(todos);
  const navigate = useNavigate();
  const inputChangeHandler = (e) => {
    const { name, value} = e.target;
    setTodo({...todo, [name]:value}) 
    console.log(todo);
  }

  useEffect(() =>{
    axios.get(`http://localhost:8000/api/getTodo/${id}`)
    .then((response) =>{
      setTodo(response.data)
    }).catch((error)=>{
      console.log(error);
    })
  },[id]) 

  const submitForm = async(e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8000/api/updateTodo/${id}`, todo)
    .then(response => {
      console.log(response)
      toast.success(response.data.msg, {position:"top-right"})
      navigate("/")
    }).catch(error => {
      console.log(error)
    })
  }
  const confirmBack = () => {
    if(window.confirm("Are you sure you want to go back without adding task?")) {
      navigate("/")
    }
  }
  return (
    <div style={{ display:"flex", justifyContent:"center", alignItems:"center", textAlign:'center'}}>
    <Container style={{ display:"flex",  justifyContent:"center", alignItems:"center",
    flexDirection:"column", padding:"10px", backgroundColor:'aliceblue', maxWidth:'90rem', margin:"20px", 
    borderRadius:"6px"}}>
        <Row>
         <Col>
         <Link onClick={confirmBack} style={{ textDecoration: 'none', fontSize:"1.4rem", 
         backgroundColor:"blue", padding:"3px", width:"2rem", borderRadius:"5px",
         color:"white", marginLeft:"-430px" }}>Back</Link>
            <h1 style={{ marginTop:"10px",fontSize:"32px"}}>Update Task</h1>
            </Col>
        </Row>
        <Row>
            <Col>
            <div style={{  padding: '5px', marginBottom: '1.5rem', }}>
            <Form style={{  marginTop:"10px"}} onSubmit={submitForm}>
                <Form.Group controlId="formBasicEmail" style={{  padding: '14px'}}>
                <Form.Label style={{fontSize: '1.3rem', padding:"12px"}} >Task</Form.Label>
                <Form.Control type="text" onChange={inputChangeHandler} value={todo.title} name='title' placeholder="Enter task" required style={{padding: '9px',borderRadius:'9px', width:"25rem" }} />
                </Form.Group>
                
                <Form.Group controlId="formBasicPassword">
                <Form.Label style={{fontSize: '1.3rem', marginLeft:"2px", padding:"12px", }}>Description</Form.Label>
                <Form.Control  type="text" onChange={inputChangeHandler} value={todo.description} name='description' placeholder="Description" style={{padding: '9px',borderRadius:'9px', width:'21rem' }} />
                </Form.Group>
                <Button type="submit" style={{padding: '9px',borderRadius:'9px', backgroundColor:"#1D2B53", 
                width:"29rem",marginTop:"15px", color:"white", fontSize:"1.4rem"}}>
                Update Task
                </Button>
            </Form>
            </div>
            </Col>
        </Row>
    </Container>
    </div>
  )
}

export default UpdateTodo