import { default_location } from "./default_location";

//returns a promise containing a projects array
export function getProjects () {
    let dataLoad = fetch(`${default_location}/api/projects`)
        .then(res => res.json())
        .then( (projects) => {
            return Object.values(projects)[0];
    });

    return dataLoad;
  }

//returns a promise containing a tickets array
export function getTicketsByUser (user) {
    let dataLoad = fetch(`${default_location}/api/dashboard/tickets/${user}`)
        .then(res => res.json())
        .then( (tickets) => {
          return Object.values(tickets)[0];

    });
    
    return dataLoad;
  }

  export function getTicketsByType () {
    let dataLoad = fetch(`${default_location}/api/dashboard/type`)
        .then(res => res.json())
        .then( (tickets) => {
            return Object.values(tickets)[0];

    });
    
    return dataLoad;
  }

  export function getTicketsByCategory () {
    let dataLoad = fetch(`${default_location}/api/dashboard/category`)
        .then(res => res.json())
        .then( (tickets) => {
            return Object.values(tickets)[0];

    });
    
    return dataLoad;
  }

  export function getTicketsByPriority () {
    let dataLoad = fetch(`${default_location}/api/dashboard/priority`)
        .then(res => res.json())
        .then( (tickets) => {
            return Object.values(tickets)[0];

    });
    
    return dataLoad;
  }

  export function getUsers() {
    let dataLoad =  fetch(`${default_location}/api/users`)
        .then(res => res.json())
        .then( (users) => {
          return Object.values(users)[0]
    });

    return dataLoad;
  }
  
