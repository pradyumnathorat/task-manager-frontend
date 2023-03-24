import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import Tasks from './components/Tasks/Tasks';
import PrivateRoute from './components/auth/PrivateRoute';
import "./app.css"
import Form from './components/Form/Form';
import Catagory from './components/Catagory/Catagory';
import TaskDetails from './TaskDetails/TaskDetails';
import Task from './components/singleTask/Task';
import Edit from './components/Edit/Edit';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/tasks" element={<PrivateRoute Child={Tasks}/>}/>
          <Route path="/form/:postId" element={<PrivateRoute Child={Form}/>}/>
          <Route path="/catagory" element={<PrivateRoute Child={Catagory}/>}/>
          <Route path="/details/:_id" element={<PrivateRoute Child={TaskDetails}/>}/>
          <Route path="/task" element={<Task/>}/>
          <Route path="/edit/:_id" element={<Edit/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
