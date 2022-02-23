/*
    ticket details
    project_id: req.query.project_id,
    assigned_id: req.query.assigned_id,
    author_id: req.query.author_id,
    title: req.query.title,
    body: req.query.body,
    est_complete_date: req.query.est_complete_date,
    act_complete_date: req.query.act_complete_date,
    priority: req.query.priority,
    category: req.query.category,
    type: req.query.type,
*/

/*
    user details
    first_name
    last_name
*/

/*
    project details
        author_id: req.query.author_id,
        owner_id: req.query.owner_id,
        title: `${req.query.title}`,
        body: `${req.query.body}`
    
*/

const new_Project_1 = {
    author_id: 1,
    owner_id: 1,
    title: "New Test Project",
    body: "This is a pregened project for testing"
}

/*
    comment details
    project_id: req.params.project_id,
    ticket_id: req.params.ticket_id,
    author_id: req.params.author_id,
    title: req.params.title,
    body: req.params.body

*/

const new_Comment_1 = {
    project_id: 1,
    ticket_id: 1,
    author_id: 1,
    title: "some new comment",
    body: "this is a new comment pregened for testing"
}

commentQuery => {
        
    const sql = `http://localhost:4000/api/tickets/?
                title=${this.state["title"]}&
                body=${this.state["body"]}&
                priority=${this.state["priority"]}&
                category=${this.state["category"]}&
                type=${this.state["type"]}&
                project_id=${this.state["project_id"]}&
                assigned_id=${this.state["assigned_id"]}&
                author_id=${this.state["author_id"]}&
                est_complete_date=${this.state["est_complete_date"]}
                `;
    console.log("sql:", sql);
}
