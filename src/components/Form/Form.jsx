import React, { useState } from 'react';
import { isAuthenticated } from '../../helper/helper';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./form.css"
const Form = (Id) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();
    const token = isAuthenticated();
    const url = process.env.REACT_APP_API;
    const { postId } = useParams()
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Do something with the form data
        const post = {
            title: title,
            description: description,
            dueDate: dueDate,
            priority: priority,
            status: status,
            category: `${postId}`
        };

        if (title, description, dueDate, priority, status) {
            try {
                const response = await fetch(`${url}/upload`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': "application/json",
                        authorization: `${token}`
                    },
                    body: JSON.stringify(post)
                });
                const data = await response.json();
                alert(data.message)
                navigate("/tasks");
            } catch (e) {
                alert(e.message)
            }
        } else {
            alert("Please Fill all fields")
        }
    };
    console.log(postId);
    console.log(token);
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" value={title} onChange={(event) => setTitle(event.target.value)} />

            <label htmlFor="description">Description:</label>
            <textarea id="description" value={description} onChange={(event) => setDescription(event.target.value)} />

            <label htmlFor="dueDate">Due Date:</label>
            <input type="date" id="dueDate" value={dueDate} onChange={(event) => setDueDate(event.target.value)} />

            <label htmlFor="priority">Priority:</label>
            <select id="priority" value={priority} onChange={(event) => setPriority(event.target.value)}>
                <option value="">Select a priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>

            <label htmlFor="status">Status:</label>
            <select id="status" value={status} onChange={(event) => setStatus(event.target.value)}>
                <option value="">Select a status</option>
                <option value="completed">Completed</option>
                <option value="inProgress">InProgress</option>
                <option value="pending">Pending</option>
            </select>

            <button type="submit">Submit</button>
        </form>
    );
};

export default Form;
