import React from 'react';
import './dashboard_box.styles.scss';

const DashBoardBox = (props) => (
    <div>
        <h4>{props.title}</h4>
        {
            props.data.map((value,key) => {
                return <p key={key}>{JSON.stringify(value)}</p>
            })
        }
    </div>

)

export default DashBoardBox;