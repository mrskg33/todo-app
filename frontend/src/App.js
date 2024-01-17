
import {RouterProvider, createBrowserRouter}  from 'react-router-dom';
import './App.css';
import GetTodo from './component/getTask/getTodo';
import AddTodo from './component/addTask/addTodo';
import UpdateTodo from './component/updateTask/updateTodo';


function App() {
  const route = createBrowserRouter([
    {
      path: '/',
      element: <GetTodo />
    },
    {
      path: '/add',
      element: <AddTodo />
    },
    {
      path: '/edit/:id',
      element: <UpdateTodo />
    }
  ])
  return (
      <div>
        <RouterProvider router={route}></RouterProvider>
      </div>
      
    
  );
}

export default App;
