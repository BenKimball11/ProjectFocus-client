import React, { useContext, useEffect, useState } from "react";
import { ProjectNoteContext } from "./ProjectNoteProvider";
import { ProjectContext } from "../project/ProjectProvider";
import { useHistory, useParams } from 'react-router-dom';
//import "./Maintenance.css";
import { Button } from 'reactstrap';


export const ProjectNoteForm = () => {
    const { addProjectNote, getProjectNoteById, updateProjectNote } = useContext(ProjectNoteContext);
    const { projects, getProjects } = useContext(ProjectContext);
    /* useState declares the default state of the functions.
    First thing in the array (vehicle) is always the current state
    second thing in the array (setvehicle) allows you to update the current state   */
    const [projectNote, setProjectNote] = useState({})
         

      const {projectNoteId, projectId, noteId} = useParams()
      
      const history = useHistory()
      
      const handleControlledInputChange = (event) => {
        //When changing a state object or array,
        //always create a copy make changes, and then set state.
        const newProjectNote = { ...projectNote }
        //vehicle is an object with properties.
        //set the property to the new value
        newProjectNote[event.target.id] = event.target.value
        //update state
        setProjectNote(newProjectNote)
      }
    
    const handleSaveProjectNote = () => {
    //const user = localStorage.getItem("PF_token")

      if (projectNoteId){
        updateProjectNote({
          id: projectNote.id,
          //projectId: parseInt(projectNote.projectId),
          name: projectNote.name,
          date: projectNote.date,
          itemsReceived: projectNote.itemsReceived,
          description: projectNote.description,
          contactNumber: parseInt(projectNote.contactNumber),
        })
        .then(() => history.push(`/lots`))
      }else{ 
        addProjectNote({         
          projectId: parseInt(projectId),
          name: projectNote.name,
          date: projectNote.date,
          itemsReceived: projectNote.itemsReceived,
          description: projectNote.description,
          contactNumber: parseInt(projectNote.contactNumber),
        })
        .then(() => history.push(`/projects/${projectId}`))
    }
  }

  // Populates the forms with existing data if there is any
  useEffect(() => {
    getProjects().then(() => {
      if (projectNoteId){
        getProjectNoteById(projectNoteId)
        .then(projectNote => {
            setProjectNote(projectNote)          
        })
      }
    })
  }, [])

 
    //since state controlls this component, we no longer need
    //useRef(null) or ref

    return (
      <form className="NoteForm">
         <h2 className="NoteForm__title">{projectNoteId ? <>Edit Note</> : <>New Note</>}</h2>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="name">Note:</label>
                  <input value={projectNote.name} type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Name" value={projectNote.name}/>
              </div>
          </fieldset>

          <fieldset>
              <div className="form-group">
                  <label htmlFor="date">Date:</label>
                  <input value={projectNote.date} type="date" id="date" onChange={handleControlledInputChange} required autoFocus className="form-control" value={projectNote.date}/>
              </div>
          </fieldset>
        
          <fieldset>
              <div className="form-group">
                  <label htmlFor="itemsReceived">Items Received:</label>
                  <input value={projectNote.itemsReceived} type="text" id="itemsReceived" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Items Received" value={projectNote.itemsReceived}/>
              </div>
          </fieldset>

          <fieldset>
              <div className="form-group">
                  <label htmlFor="description">Note:</label>
                  <input value={projectNote.description} type="text" id="description" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="description" value={projectNote.description}/>
              </div>
          </fieldset>
        
          <fieldset>
              <div className="form-group">
                  <label htmlFor="contactNumber">Contact Number:</label>
                  <input value={projectNote.contactNumber} type="text" id="contactNumber" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Contact Number" value={projectNote.contactNumber}/>
              </div>
          </fieldset>
          <div className="noteSaveButton">
          <Button className="noteSaveButton"
          onClick={event => {
            event.preventDefault(); // Prevent browser from submitting the form and refreshing the page
            handleSaveProjectNote();
          }}>
     {projectNoteId ? <>Save Note</> : <>Add Note</>}</Button> 
     </div>
      </form>
    )
} 