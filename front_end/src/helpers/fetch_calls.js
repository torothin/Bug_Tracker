import { default_location } from "./default_location";

export function getProjects () {
    fetch(`${default_location}/api/projects`)
            .then(res => {res.json()})
        //     .then( (projects) => {
        //         console.log("in fetch: ",Object.values(projects)[0]);
        //         return projects;
        //         //return Object.values(projects)[0];
        // });
       
}