import  express  from 'express';
import { createTodos, getTodos, getTodo, updateTodo, deleteTodo }from '../controller/control.js';

const router = express.Router();

router.get('/', (req, res) => { 
    res.send("Hello from Router");
});

router.post('/createTodos', createTodos); 
router.get('/getTodos', getTodos);
router.get('/getTodo/:id', getTodo);
router.put('/updateTodo/:id', updateTodo);
router.delete('/deleteTodo/:id', deleteTodo);
export default router;