import React, { useState, createContext } from "react"

// module retrieves maintenance events from the DB in various ways to be utilized differently
export const LotNoteContext = createContext()


export const LotNoteProvider = (props) => {
    const [lotNotes, setLotNotes] = useState([])

    //const user = localStorage.getItem("MaintenanceMinder_user")

    //gets events using user ID and expanded to vehicle to attach specific vehicle to specific event
    const getLotNotes = () => {
		return fetch("http://localhost:8000/lotnotes", {
			headers: {
				Authorization: `Token ${localStorage.getItem("PF_token")}`,
			},
		})
			.then((response) => response.json())
			.then(setLotNotes);
	};

    const getLotNoteById = lotNoteId => {
        return fetch(`http://localhost:8000/lotnotes/${lotNoteId}`, {
            headers: {
                Authorization: `Token ${localStorage.getItem("PF_token")}`
            }
        })
        .then(res => res.json())
    }

    //uses the add maintenance form to add a new event to the DB
    const addLotNote = (lotNoteObj) => {
        return fetch("http://localhost:8000/lotnotes", {
            method: "POST",
            headers: {
                Authorization: `Token ${localStorage.getItem("PF_token")}`,
                "Content-Type": "application/json"

            },
            body: JSON.stringify(lotNoteObj)
        })
            .then(getLotNotes)
    }
    //retrieves the event by its ID 
    //uses the maintenance form to edit an event and update the DB
    const updateLotNote = lotNote => {
        return fetch(`http://localhost:8000/lotnotes/${lotNote.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("PF_token")}`
            },
            body: JSON.stringify(lotNote)
        })
            .then(getLotNotes)
    }
    //uses the event ID to delete the event from the DB
    const deleteLotNote = lotNoteId => {
        return fetch(`http://localhost:8000/lotnotes/${lotNoteId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("PF_token")}`
            },
        })
            .then(getLotNotes)
    }


    // exports the function fetch calls via MaitenanceContext to be used throughout the modules
    return (
        <LotNoteContext.Provider value={{
            lotNotes, getLotNotes, addLotNote, getLotNoteById, updateLotNote, deleteLotNote
        }}>
            {props.children}
        </LotNoteContext.Provider>
    )
}