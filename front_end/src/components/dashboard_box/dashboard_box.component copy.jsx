import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import './dashboard_box.styles.scss';

const DashBoardBox = (props) => (
    <div className="box">
        <Jumbotron>
            <h4>{props.title}</h4>
            {
                props.data.map((value,key) => {
                    return <p key={key}>{JSON.stringify(value)}</p>
                })
            }
        </Jumbotron>
    </div>

)

export default DashBoardBox;