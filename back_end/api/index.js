const express = require('express');
const mysql = require('mysql');

// create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'rootpass',
    database : 'bugTracker' // remove when making a new database
});

db.connect((err) => {
    if(err) {
        console.log(err);
    }
    console.log("MySQL connected");
})

const app = express();

app.listen('3000', () => {
    console.log("server started on port 3000");
});

app.get('/', (req,res) => {
    res.send('base bug tracker page');
});

/* ------ user Create, Read, Update, Delete /api/users ------ 

user details:
first_name
last_name
ID

*/

// create new user

app.post('/api/users', (req,res) => {
    const first_name = req.query.first_name;
    const last_name = req.query.last_name;

    if(first_name === undefined || last_name === undefined) throw Error;

    const sql = `INSERT INTO bugTracker.users (first_name, last_name) VALUES ('${first_name}', '${last_name}')`;
    const query = db.query(sql, (err,result) => {
        if(err) throw err;
        res.send("updated?");
    });
});

// update current user

app.put('/api/users/:id', (req,res) => {
    let first_name = req.query.first_name;
    let last_name = req.query.last_name;
    const id = req.params.id;

    const getUserQuery = `SELECT * FROM bugTracker.users WHERE id = ${id}`;

    const selectQuery = db.query(getUserQuery, (err,result) => {
        if(err) throw err;
        first_name = first_name == undefined ? result[0].first_name : first_name;
        last_name = last_name == undefined ? result[0].last_name : last_name;
        
        const updateSQL = `UPDATE bugTracker.users SET 
                            first_name='${first_name}', 
                            last_name='${last_name}' 
                            WHERE id=${id}`;
    
        const updateQuery = db.query(updateSQL, (err,result) => {
            if(err) throw err;
            res.send("updated?");
        });
    });
});

// delete user
app.delete('/api/users/:id', (req,res) => {
    console.log('delete called');
    const sql = `DELETE FROM bugTracker.users WHERE id=${req.params.id}`;
    const query = db.query(sql, (err,result) => {
        if(err) throw err;
        console.log(result);
        res.send("Deleted?");
    });
});

// get users data
app.get('/api/users', (req,res) => {
    const sql = 'SELECT * FROM bugTracker.users';
    const query = db.query(sql, (err,result) => {
        if(err) throw err;
        res.send(result);
    });
});

// get a specific users data
app.get('/api/users/:id', (req,res) => {
    const sql = `SELECT * FROM bugTracker.users WHERE id = ${req.params.id}`;
    const query = db.query(sql, (err,result) => {
        if(err) throw err;
        res.send(result);
    });
});

/* ------ tickets Create, Read, Update, Delete /api/tickets ------ 

ticket info:
id
project_id
assigned_id
creator_id
creation_date
est_complete_date
act_complete_date
title
body

*/

// create new ticket

app.post('/api/tickets', (req,res) => {
    const newTicket = {
        project_id: req.query.project_id,
        assigned_id: req.query.assigned_id,
        author_id: req.query.author_id,
        title: req.query.title,
        body: req.query.body,
        est_complete_date: req.query.est_complete_date,
        act_complete_date: req.query.act_complete_date
    }

    if(newTicket.est_complete_date === undefined) newTicket.est_complete_date = `NULL`;
    if(newTicket.act_complete_date === undefined) newTicket.act_complete_date = `NULL`;

    if(
        newTicket.project_id === undefined ||
        newTicket.assigned_id === undefined ||
        newTicket.author_id === undefined ||
        newTicket.title === undefined ||
        newTicket.body === undefined
        ) throw Error;
        
    
    const postString = `INSERT INTO bugTracker.tickets SET ?`
    const query = db.query(postString, newTicket, (err,result) => {
        if(err) throw err;
        res.send("updated?");
    });
});

// update current ticket

app.put('/api/tickets/:id', (req,res) => {
    const id = req.params.id;
    let project_id = req.query.project_id;
    let assigned_id = req.query.assigned_id;
    let author_id = req.query.author_id;
    let title = req.query.title;
    let body = req.query.body;
    let est_complete_date = req.query.est_complete_date;
    let act_complete_date = req.query.act_complete_date;

    const getAllQuery = `SELECT * FROM bugTracker.tickets WHERE id = ${id}`;
    const query = db.query(getAllQuery, (err,result) => {
        if(err) throw err;
        
        project_id = project_id == undefined ? result[0].project_id : project_id;
        assigned_id = assigned_id == undefined ? result[0].assigned_id : assigned_id;
        author_id = author_id == undefined ? result[0].author_id : author_id;
        title = title == undefined ? result[0].title : title;
        body = body == undefined ? result[0].body : body;
        est_complete_date = est_complete_date == undefined ? result[0].est_complete_date : est_complete_date;
        act_complete_date = act_complete_date == undefined ? result[0].act_complete_date : act_complete_date;

        const updateTicket = `UPDATE bugTracker.tickets SET 
            project_id=${project_id},
            assigned_id='${assigned_id}',
            author_id='${author_id}',
            title='${title}',
            body='${body}',
            est_complete_date=${est_complete_date},
            act_complete_date=${act_complete_date}
            WHERE id=${id}`;

            console.log(updateTicket);
    
        const query = db.query(updateTicket, (err,result) => {
            if(err) throw err;
            res.send("updated?");
            
        });
    }); 
});

// delete ticket

app.delete('/api/tickets/:id', (req,res) => {

    const delete_ticket = `DELETE FROM bugTracker.tickets WHERE id = ${req.params.id}`
    
    const query = db.query(delete_ticket, (err,result) => {
        if(err) throw err;
    });

    res.send("comments");

});

// get tickets

app.get('/api/tickets', (req,res) => {
    const sql = 'SELECT * FROM bugTracker.tickets';
    const query = db.query(sql, (err,result) => {
        if(err) throw err;
        res.send(result);
    });
});

// get a ticket

app.get('/api/tickets/:id', (req,res) => {
    const sql = `SELECT * FROM bugTracker.tickets WHERE id = ${req.params.id}`;
    const query = db.query(sql, (err,result) => {
        if(err) throw err;
        res.send(result);
    });
});

/* ------ comments Create, Read, Update, Delete /api/comments ------ 

comment info:
id INT AUTO_INCREMENT, 
project_id INT,
ticket_id INT,
author_id INT,
creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
title VARCHAR(255), 
body VARCHAR(255), 

*/

// create new comment

app.post('/api/comments', (req,res) => {
    const newComment = {
        project_id: req.params.project_id,
        ticket_id: req.params.ticket_id,
        author_id: req.params.author_id,
        title: req.params.title,
        body: req.params.body
    }   

    if(
        newComment.project_id  === undefined ||
        newComment.ticket_id  === undefined ||
        newComment.author_id  === undefined ||
        newComment.title  === undefined ||
        newComment.body === undefined
    ) throw Error;

    const postString = `INSERT INTO bugTracker.projects SET ?`;

    const commentsQuery = db.query(postString, newComment, (result,err) => {
        if(err) throw err;
        res.send("New Comment Created");
    });
    
});

// update current comment

app.put('/api/comments/:id', (req,res) => {
    const id = req.params.id;
    let project_id = req.params.project_id;
    let author_id = req.query.author_id;
    let title = req.query.title;
    let body = req.query.body;
    let creation_date = req.query.creation_date;

    const getAllQuery = `SELECT * FROM bugTracker.comments WHERE id = ${id}`;
    const queryComments = db.query(getAllQuery, (err,result) => {
        if(err) throw err;
        
        project_id = project_id == undefined ? result[0].project_id : project_id;
        author_id = author_id == undefined ? result[0].author_id : author_id;
        title = title == undefined ? result[0].title : title;
        body = body == undefined ? result[0].body : body;
        creation_date = creation_date == undefined ? result[0].creation_date : creation_date;
        
        const updateComment = `UPDATE bugTracker.comments SET 
            project_id=${project_id},
            author_id='${author_id}',
            title='${title}',
            body='${body}',
            creation_date=${creation_date}
            WHERE id=${id}`;
    
        const updateQuery = db.query(updateComment, (err,result) => {
            if(err) throw err;
            res.send("updated Comment");
            
        });
    });
});

// delete comment

app.delete('/api/comments/:id', (req,res) => {

    const delete_comment = `DELETE FROM bugTracker.comments WHERE id = ${req.params.id}`
    
    const query = db.query(delete_comment, (err,result) => {
        if(err) throw err;
    });

    res.send("comments");

});

// get comments

app.get('/api/comments', (req,res) => {
    const sql = 'SELECT * FROM bugTracker.comments';
    const query = db.query(sql, (err,result) => {
        if(err) throw err;
        res.send(result);
    });
});

// get a comemnt

app.get('/api/comments/:id', (req,res) => {
    const sql = `SELECT * FROM bugTracker.comments WHERE id = ${req.params.id}`;
    const query = db.query(sql, (err,result) => {
        if(err) throw err;
        res.send(result);
    });
});


/* ------ projects Create, Read, Update, Delete /api/projects ------ 

project info:
id INT AUTO_INCREMENT, 
author_id INT,
owner_id INT,
creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
title VARCHAR(255), 
body TEXT, 

*/

// create new project
app.post('/api/projects', (req,res) => {
    const new_project = {
        author_id: req.query.author_id,
        owner_id: req.query.owner_id,
        title: `${req.query.title}`,
        body: `${req.query.body}`
    };

    if(
        new_project.author_id === null ||
        new_project.owner_id === null ||
        new_project.title === null ||
        new_project.body === null
    ) throw Error;

    const add_project = `INSERT INTO bugTracker.projects SET ?`
    
    const query = db.query(add_project, new_project, (err,result) => {
        if(err) throw err;
    });

    res.send("projects");

});

// update current project

app.put('/api/projects/:id', (req,res) => {
    const id = req.params.id;
    let owner_id = req.query.owner_id;
    let author_id = req.query.author_id;
    let title = req.query.title;
    let body = req.query.body;
    let creation_date = req.query.creation_date;

    const getAllQuery = `SELECT * FROM bugTracker.projects WHERE id = ${id}`;
    const queryProjects = db.query(getAllQuery, (err,result) => {
        if(err) throw err;
        
        owner_id = owner_id == undefined ? result[0].owner_id : owner_id;
        author_id = author_id == undefined ? result[0].author_id : author_id;
        title = title == undefined ? result[0].title : title;
        body = body == undefined ? result[0].body : body;
        creation_date = creation_date == undefined ? result[0].creation_date : creation_date;
        
        const updateProject = `UPDATE bugTracker.projects SET 
            owner_id=${owner_id},
            author_id='${author_id}',
            title='${title}',
            body='${body}',
            creation_date=${creation_date}
            WHERE id=${id}`;
    
        const updateQuery = db.query(updateProject, (err,result) => {
            if(err) throw err;
            res.send("updated?");
            
        });
    });
});

// delete project
app.delete('/api/projects/:id', (req,res) => {

    const delete_project = `DELETE FROM bugTracker.projects WHERE id = ${req.params.id}`
    
    const query = db.query(delete_project, (err,result) => {
        if(err) throw err;
    });

    res.send("projects");

});

// get projects

app.get('/api/projects', (req,res) => {
    const sql = 'SELECT * FROM bugTracker.projects';
    const query = db.query(sql, (err,result) => {
        if(err) throw err;
        res.send(result);
    });
});

// get a project

app.get('/api/projects/:id', (req,res) => {
    const sql = `SELECT * FROM bugTracker.projects WHERE id = ${req.params.id}`;
    const query = db.query(sql, (err,result) => {
        if(err) throw err;
        res.send(result);
    });
});

