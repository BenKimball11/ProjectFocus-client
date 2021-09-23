import React, { useState, createContext } from "react"


// The context is imported and used by individual components that need data
export const LotContext = createContext()

// This component establishes what data can be used.
export const LotProvider = (props) => {
    //useState() defining a varible to hold state. Nothing else is happening here
    //establishing state as an empty array, the getVehicles then the data that is recieved from , .then update vehicles state with that array
    const [lots, setLots] = useState([])

    const user = localStorage.getItem("PF_token")

    const getLots = () => {
		return fetch("http://localhost:8000/lots", {
			headers: {
				Authorization: `Token ${localStorage.getItem("PF_token")}`,
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json()) //take the response and converts 
			.then(setLots);
	};

    const addLot = (lot) => {
		return fetch("http://localhost:8000/lots", {
			method: "POST",
			headers: {
				Authorization: `Token ${localStorage.getItem("PF_token")}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(lot),
		}).then(getLots);
	};

    const updateLot = lot => {
        return fetch(`http://localhost:8000/lots/${lot.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("PF_token")}`
            },
            body: JSON.stringify(lot)
        })
        .then(getLots)
        .then()
    }

     const deleteLot = lotId => {
        return fetch(`http://localhost:8000/lots/${lotId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Token ${localStorage.getItem("PF_token")}`
            }
        })
        .then(getLots)
    }

    const getLotById = lotId => {
        return fetch(`http://localhost:8000/lots/${lotId}`, {
            headers: {
				"Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("PF_token")}`
            }
        })
        .then(res => res.json())
    }

    /*
        You return a context provider which has the
        `Vehicles` state, `getVehicles` function,
        and the `addVehicle` function as keys. This
        allows any child elements to access them.
    */
    return (
        <LotContext.Provider value={{
            lots, getLots, addLot, updateLot, getLotById, deleteLot
        }}>
            {props.children}
        </LotContext.Provider>
    )
}