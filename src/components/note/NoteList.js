/* import React, { useState, useContext, useEffect } from "react";
import { NoteContext } from "./LotNoteProvider";
//import { Vehicle } from "./Vehicle";
//import "./Lot.css";
import { useHistory } from "react-router-dom";
import { Button } from 'reactstrap';

export const NoteList = () => {
  //Need a little more help understanding this
  //I think what is happening is passing in the LotContext from LotProvider,
  //deconstructing that object from LotContext to just return getLots and Lots
  const { getNotes, notes } = useContext(NoteContext);

  const history = useHistory();
  //The useEffect() hook allows the component to reach out into the world for anything that cannot be handled during render
  //it is the API call for the getVehicles function.
  //useEffect must always take a function and an array
  //function comes first (getVehicles), then the array []
  useEffect(() => {
    getNotes(); 
  }, []); 

  return (
    <>
      <div className="noteHeader">
        <h1>notes</h1>

      </div>

      <div className="addButton">
      <Button color="secondary" size="md" onClick={() => history.push("/notes/create")}>
        Add Note
      </Button>
      </div>
      <div className="lots">
        {notes.map((note) => (
          <div className="lot" id={`lot--${note.id}`}>
            <div className="lot__lotSize">Lot Number: {note.lotId} </div>
            <div className="lot__lotNumber">Note: {note.description}</div> 

            
           

            {/* <div className="lotDetailButton">
              <Button color="secondary" size="sm" onClick={() => history.push(`/notes/detail/${note.id}`)}>
                View Details
              </Button>
            </div> *
          </div>
        ))}
      </div>
    </>
  );
}; */