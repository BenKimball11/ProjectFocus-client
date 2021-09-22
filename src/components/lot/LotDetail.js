import React, { useContext, useEffect, useState } from "react";
import { LotContext } from "./LotProvider";
import "./Lot.css";
import { useParams, useHistory } from "react-router-dom";
import { LotNoteContext } from "../note/LotNoteProvider.js"
import { Button } from 'reactstrap';


export const LotDetail = () => {
  const { deleteLot, getLotById } = useContext(LotContext);
  const [lot, setLot] = useState({notes: []}); //Notes is in there to be allowed access to the keys 
  const { deleteLotNote } = useContext(LotNoteContext)
  
  //location holds the initial state of the application
  //setLocation allows us to update state
  //useState() holds data. thats it
   //useParams() captures the parameter set in the url when Vehicle detail route is present?
  const { lotId } = useParams(); //dynamnic routing element

  const history = useHistory();

//useEffect runs everytime state changes
//whenever the vehicle detail route changes in the URL, useEffect() triggers to get the vehicle by id and display the information associated with the vehicleId. 
  useEffect(() => {
    getLotById(lotId)// 2
    .then((lotObj) => { // 3 
        setLot(lotObj)
        refreshLot() // 4
    })
    //whenever the vehicle detail route changes, useEffect() triggers
    //this array is watching for something, when something involving the vehicleId
    //vehicleId is being watched in the useEffect
}, [lotId]) // 1 do i need vehicleId in here?

console.log(lot)

const lotNoteDelete = (lotId) => {
  deleteLotNote(lotId)
    .then(() => {
      refreshLot()
    })
}


const refreshLot = () => {
  getLotById(lotId)
    .then((response) => {
      setLot(response)
    })
}

  return (
    <section className="lot">
    <button className="button" onClick={() => {history.push("/lots")    
    deleteLot(lot.id)}}>Delete
    </button>
      <button
        onClick={() => {
          history.push(`/lots/edit/${lot.id}`);
        }}
      >
        Edit
      </button>
      <h3 className="lot__lotNumber"> Lot Number {lot.lotNumber}</h3>
      <div className="lot__size">Size: {lot.lotSize}</div>

     
      <button className='add__note' onClick={() => {
          history.push(`/notes/lot/create/${lot.id}`)
        }}>Add Note</button>

      <button className='add__project' onClick={() => {
          history.push(`/projects/create/${lot.id}`)
        }}>Add Project</button>

<div className="noteCards">
      {
        lot.lot_notes?.map(lotNote => 
          <section className="noteCard">
    <h3 className="note__name">Note: {lotNote.note.name}</h3>  
   

        <div className="note__date">Date: {lotNote.note.date }</div>
        <div className="note__itemsReceived">Items Received: {lotNote.note.itemsReceived }</div>
        <div className="note__description">description: {lotNote.note.description }</div>
        <div className="note__contactNumber">Contact Number: {lotNote.note.contactNumber }</div>

        <button className="deleteBtn"
          onClick={() => lotNoteDelete(lotNote.id)}>
          Remove note
      </button>      
          <button className='edit' onClick={() => {
          history.push(`/notes/edit/${lotNote.id}`)
        }}>Edit</button>

       {/*  <section className="projectCard">
    <div className="projectCards">{lot.projectId.name}</div>
    <div className="projectCards">Estimated Completion Date{lot.projectId.estimatedCompletionDate}</div>
    <div className="projectCards">Estimated Cost: ${lot.projectId.estimatedCost}</div>
    </section> */} 
    </section>
        )}   
{lot.lot_projects?.map(lotProject => 
  <div className="projectCards">
      
      <section className="projectCard">
    <h3 className="projectCards">Project: {lotProject.name}</h3>
    {/* <div className="projectCards">Estimated Completion Date: {lotProject.estimatedCompletionDate}</div>
    <div className="projectCards">Estimated Cost: ${lotProject.estimatedCost}</div> */}
    <div className="projectDetailButton">
              <Button color="secondary" size="sm" onClick={() => history.push(`/projects/${lotProject.id}`)}>
                View Details
              </Button>
            </div>

         
    </section>
 
        </div>
)}
        </div>

    </section>
  );
      }

