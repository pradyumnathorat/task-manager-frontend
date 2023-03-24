import React, { useEffect, useState } from 'react';
import './taskDetails.css';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../helper/helper';
import { useNavigate } from 'react-router-dom';
function TaskDetails(props) {
  const { _id } = useParams()
  const [redirect, setredirect] = useState(false);
  const [card, setCard] = useState([]);
  const [category, setCategory] = useState([]);
  const [c, setC] = useState([]);
  const token = isAuthenticated();
  const url = process.env.REACT_APP_API;
  const navigate = useNavigate();
  const getTask = () => {
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
          setCard(data.data);
          console.log(data)
        }
      })
  }
  const getC = () => {
    fetch(`${url}/Category`, {
      method: 'GET',
      headers: {
        'Content-Type': "application/json",
        authorization: `${token}`
      },
      body: JSON.stringify({
        _id: myCard.category
      })
    })
      .then(res => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error)
        } else {
          setCard(data.data);
          console.log(data)
        }
      })
  }

  useEffect(() => {
    getTask();
  }, [])

  const myCard = card.find((c) => c._id == _id);
  // const list = myCard.ingredients


  // useEffect(() => {
  //   getC();
  // }, [])
  if (!myCard) {
    return <div>Card not found.</div>;
  }

  const handleDelete = (_id) => {

    const fetchdelete = async (_id) => {

      const data = await fetch(`${url}/delete`, {
        method: "delete",
        headers: {
          'Content-Type': "application/json",
          "user_id": `${_id}`,
          authorization: `${token}`
        }
      })
      const response = await data.json();
      if (response.error) {
        alert(response.error)
      } else {
        alert(response.message)
        setredirect(true);
      }
    }
    fetchdelete(_id)
  }

  const performRedirect = () => {
    if (redirect) {
      return <Navigate to="/tasks" />
    }
  }

  const handleEdit = (id) => {
    navigate(`/edit/${id}`)
  }

  return (
    <>
      {performRedirect()}
      <div className="task-details">
        <div className="main">
          <label htmlFor="task">Task: {myCard.title}</label>
          <label htmlFor="task">Description: {myCard.description}</label>
          <label htmlFor="task">DueDate: {myCard.dueDate}</label>
          <label htmlFor="task">Priority: {myCard.priority}</label>
          <label htmlFor="task">Category: {myCard.category}</label>
          <label htmlFor="task">Color: {myCard.title}</label>
          <label htmlFor="task">Status: {myCard.status}</label>
          <div className='d-btn'>
            <button onClick={() => handleEdit(myCard._id)}>Edit</button>
            <button className='D-btn' onClick={() => handleDelete(myCard._id)}>Delete</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskDetails;
