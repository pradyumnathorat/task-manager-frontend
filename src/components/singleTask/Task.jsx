import React from 'react'
import "./task.css"
function Task({props})  {
    return (
        <>
            <div className="task">
                <div className='title'>{props.title}</div>
                <div className='description'>
                    <div>{props.dueDate}</div>
                    <div>{props.status}</div>
                    <div>{props.priority}</div>
                </div>
            </div>
        </>
    )
}

export default Task