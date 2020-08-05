import React from 'react';
import './dashboard.styles.scss';

const DashBoard = (props) => (
    <div className='dashboard-container'>
        {
            props.users.map((value,key) => {
                return <p key={key}>{JSON.stringify(value)}</p>
            })
        }
        {
            props.comments.map((value,key) => {
                return <p key={key}>{JSON.stringify(value)}</p>
            })
        }
        {
            props.tickets.map((value,key) => {
                return <p key={key}>{JSON.stringify(value)}</p>
            })
        }
        {
            props.projects.map((value,key) => {
                return <p key={key}>{JSON.stringify(value)}</p>
            })
        }
        
    </div>
)

export default DashBoard;