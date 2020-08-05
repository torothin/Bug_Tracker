import React from 'react';
import './dashboard.styles.scss';

const DashBoard = (users) => (
    <div className='dashboard-container'>
        <p>{users}</p>
    </div>
)

export default DashBoard;