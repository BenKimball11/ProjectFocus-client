import React, { useState, createContext } from "react"

// module retrieves maintenance events from the DB in various ways to be utilized differently
export const ProjectNoteContext = createContext()


export const ProjectNoteProvider = (props) => {
    const [projectNotes, setProjectNotes] = useState([])

    //const user = localStorage.getItem("MaintenanceMinder_user")

    //gets events using user ID and expanded to vehicle to attach specific vehicle to specific event
    const getProjectNotes = () => {
		return fetch("http://localhost:8000/projectnotes", {
			headers: {
				Authorization: `Token ${localStorage.getItem("PF_token")}`,
			},
		})
			.then((response) => response.json())
			.then(setProjectNotes);
	};

    const getProjectNoteById = projectNoteId => {
        return fetch(`http://localhost:8000/projectnotes/${projectNoteId}`, {
            headers: {
                Authorization: `Token ${localStorage.getItem("PF_token")}`
            }
        })
        .then(res => res.json())
    }

    //uses the add maintenance form to add a new event to the DB
    const addProjectNote = projectNoteObj => {
        return fetch("http://localhost:8000/projectnotes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("PF_token")}`,

            },
            body: JSON.stringify(projectNoteObj)
        })
            .then(getProjectNotes)
    }
    //retrieves the event by its ID 
    //uses the maintenance form to edit an event and update the DB
    const updateProjectNote = projectNote => {
        return fetch(`http://localhost:8000/projectnotes/${projectNote.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("PF_token")}`
            },
            body: JSON.stringify(projectNote)
        })
            .then(getProjectNotes)
    }
    //uses the event ID to delete the event from the DB
    const deleteProjectNote = projectNoteId => {
        return fetch(`http://localhost:8000/projectnotes/${projectNoteId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("PF_token")}`
            },
        })
            .then(getProjectNotes)
    }


    // exports the function fetch calls via MaitenanceContext to be used throughout the modules
    return (
        <ProjectNoteContext.Provider value={{
            projectNotes, getProjectNotes, addProjectNote, getProjectNoteById, updateProjectNote, deleteProjectNote
        }}>
            {props.children}
        </ProjectNoteContext.Provider>
    )
}