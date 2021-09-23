import React, { useState, createContext } from "react"

// module retrieves maintenance events from the DB in various ways to be utilized differently
export const ProjectContext = createContext()


export const ProjectProvider = (props) => {
    const [projects, setProjects] = useState([])

    //const user = localStorage.getItem("MaintenanceMinder_user")

    //gets events using user ID and expanded to vehicle to attach specific vehicle to specific event
    const getProjects = () => {
		return fetch("http://localhost:8000/projects", {
			headers: {
				Authorization: `Token ${localStorage.getItem("PF_token")}`,
			},
		})
			.then((response) => response.json()) //converts that data into json
			.then(setProjects);
	};

    const getProjectById = projectId => {
        return fetch(`http://localhost:8000/projects/${projectId}`, {
            headers: {
                Authorization: `Token ${localStorage.getItem("PF_token")}`
            }
        })
        .then(res => res.json())
    }

    //uses the add maintenance form to add a new event to the DB
    const addProject = (projectObj) => {
        return fetch("http://localhost:8000/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("PF_token")}`,

            },
            body: JSON.stringify(projectObj)
        })
            .then(getProjects)
    }
    //retrieves the event by its ID 
    //uses the maintenance form to edit an event and update the DB
    const updateProject = project => {
        return fetch(`http://localhost:8000/projects/${project.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("PF_token")}`
            },
            body: JSON.stringify(project)
        })
            .then(getProjects)
            .then()
    }
    //uses the event ID to delete the event from the DB
    const deleteProject = projectId => {
        return fetch(`http://localhost:8000/projects/${projectId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("PF_token")}`
            },
        })
            .then(getProjects)
    }


    // exports the function fetch calls via MaitenanceContext to be used throughout the modules
    return (
        <ProjectContext.Provider value={{
            projects, getProjects, addProject, getProjectById, updateProject, deleteProject
        }}>
            {props.children}
        </ProjectContext.Provider>
    )
}