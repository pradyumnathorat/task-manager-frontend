import React, { useEffect, useState } from 'react'
import Task from '../singleTask/Task';
import "./tasks.css"
import { isAuthenticated } from '../../helper/helper';
import { Link, Navigate } from 'react-router-dom';
const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [redirect, setredirect] = useState(false);
    const [redirectHome, setredirectHome] = useState(false);
    const [query, setQuery] = useState("");
    const url = process.env.REACT_APP_API;
    const token = isAuthenticated();
    // console.log(user)
    const gettask = () => {
        fetch(`${url}/upload`, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                authorization: `${token}`
            }
        })
            .then(res => res.json())
            .then((data) => {
                if (data.error) {
                    alert(data.error)
                } else {
                    setTasks(data.data);
                    console.log(data)
                }
            })
    }
    useEffect(() => {
        gettask()
    }, [])
    const handleClick = () => {
        setredirect(true)
    }
    const performRedirect = () => {
        if (redirect) {
            return <Navigate to="/catagory" />
        }
    }
    console.log(tasks);
    return (
        <>
            {performRedirect()}
            <div className="container">
                <div>
                    <h1>Task-Manager</h1>
                </div>
                <button onClick={handleClick} >New</button>
                <div className="list">
                    {
                        tasks.map((taskItem) => (
                            <Link to={`/details/${taskItem._id}`}><Task props={taskItem} /></Link>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Tasks