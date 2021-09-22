import React, { useContext, useEffect, useState } from "react";
import { LotNoteContext } from "./LotNoteProvider";
import { LotContext } from "../lot/LotProvider";
import { useHistory, useParams } from 'react-router-dom';
//import "./Maintenance.css";
import { Button } from 'reactstrap';


export const LotNoteForm = () => {
    const { addNote, getLotNoteById, updateLotNote } = useContext(LotNoteContext);
    const { lots, getLots } = useContext(LotContext);
    /* useState declares the default state of the functions.
    First thing in the array (vehicle) is always the current state
    second thing in the array (setvehicle) allows you to update the current state   */
    const [lotNote, setLotNote] = useState({})
         

      const {lotNoteId, lotId} = useParams()
      console.log(lotId)
      const history = useHistory()
      
      const handleControlledInputChange = (event) => {
        //When changing a state object or array,
        //always create a copy make changes, and then set state.
        const newLotNote = { ...lotNote }
        //vehicle is an object with properties.
        //set the property to the new value
        newLotNote[event.target.id] = event.target.value
        //update state
        setLotNote(newLotNote)
      }
    
    const handleSaveLotNote = () => {
    //const user = localStorage.getItem("PF_token")

      if (lotNoteId){
        updateLotNote({
          id: parseInt(lotNote.id),
          //user: parseInt(user),
          lotId:parseInt(lotNote.lotId),
          name: lotNote.name,
          date: lotNote.date,
          itemsReceived: lotNote.itemsReceived,
          description: lotNote.description,
          contactNumber: parseInt(lotNote.contactNumber),
        })
        .then(() => history.push(`/lots/edit/${lotNote.lot.id}`))
      }else{ 
        addNote({
          //user: parseInt(user),
          lotId: parseInt(lotId),
          name: lotNote.name,
          date: lotNote.date,
          itemsReceived: lotNote.itemsReceived,
          description: lotNote.description,
          contactNumber: parseInt(lotNote.contactNumber),
        })
        .then(() => history.push(`/lots/${lotId}`))
    }
  }

  // Populates the forms with existing data if there is any
  useEffect(() => {
    getLots().then(() => {
      if (lotNoteId){
        getLotNoteById(lotNoteId)
        .then(lotNote => {
            setLotNote(lotNote)          
        })
      }
    })
  }, [])

 
    //since state controlls this component, we no longer need
    //useRef(null) or ref

    return (
      <form className="NoteForm">
         <h2 className="NoteForm__title">{lotNoteId ? <>Edit Note</> : <>New Note</>}</h2>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="name">Note:</label>
                  <input value={lotNote.name} type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Name" value={lotNote.name}/>
              </div>
          </fieldset>

          <fieldset>
              <div className="form-group">
                  <label htmlFor="date">Date:</label>
                  <input value={lotNote.date} type="date" id="date" onChange={handleControlledInputChange} required autoFocus className="form-control" value={lotNote.date}/>
              </div>
          </fieldset>
        
          <fieldset>
              <div className="form-group">
                  <label htmlFor="itemsReceived">Items Received:</label>
                  <input value={lotNote.itemsReceived} type="text" id="itemsReceived" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Items Received" value={lotNote.itemsReceived}/>
              </div>
          </fieldset>

          <fieldset>
              <div className="form-group">
                  <label htmlFor="description">Note:</label>
                  <input value={lotNote.description} type="text" id="description" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="description" value={lotNote.description}/>
              </div>
          </fieldset>
        
          <fieldset>
              <div className="form-group">
                  <label htmlFor="contactNumber">Contact Number:</label>
                  <input value={lotNote.contactNumber} type="text" id="contactNumber" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Contact Number" value={lotNote.contactNumber}/>
              </div>
          </fieldset>
          <div className="noteSaveButton">
          <Button className="noteSaveButton"
          onClick={event => {
            event.preventDefault(); // Prevent browser from submitting the form and refreshing the page
            handleSaveLotNote();
          }}>
     {lotNoteId ? <>Save Note</> : <>Add Note</>}</Button> 
     </div>
      </form>
    )
} 