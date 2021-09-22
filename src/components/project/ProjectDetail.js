import React, { useContext, useEffect, useState } from "react";
import { ProjectContext } from "./ProjectProvider";
//import "./Lot.css";
import { useParams, useHistory } from "react-router-dom";
import { ProjectNoteContext } from "../note/ProjectNoteProvider.js"
import { Button } from 'reactstrap';


export const ProjectDetail = () => {
  const { deleteProject, getProjectById } = useContext(ProjectContext);
  const [project, setProject] = useState({projectNotes: []}); //Notes is in there to be allowed access to the keys 
  const { deleteProjectNote } = useContext(ProjectNoteContext)
  
  //location holds the initial state of the application
  //setLocation allows us to update state
  //useState() holds data. thats it
   //useParams() captures the parameter set in the url when Vehicle detail route is present?
  const { projectId } = useParams(); //dynamnic routing element

  const history = useHistory();

//useEffect runs everytime state changes
//whenever the vehicle detail route changes in the URL, useEffect() triggers to get the vehicle by id and display the information associated with the vehicleId. 
  useEffect(() => {
    getProjectById(projectId)// 2
    .then((projectObj) => { // 3 
        setProject(projectObj)
        refreshProject() // 4
    })
    //whenever the vehicle detail route changes, useEffect() triggers
    //this array is watching for something, when something involving the vehicleId
    //vehicleId is being watched in the useEffect
}, [projectId]) // 1 do i need vehicleId in here?

/* const projectNoteDelete = (lotId) => {
  deleteProjectNote(lotId)
    .then(() => {
      refreshProject()
    })
} */


const refreshProject = () => {
  getProjectById(projectId)
    .then((response) => {
      setProject(response)
    })
}

  return (
    <section className="lot">
    <button className="button" onClick={() => {history.push("/lots")    
    deleteProject(project.id)}}>Delete
    </button>
      <button
        onClick={() => {
          history.push(`/projects/edit/${project.id}`);
        }}
      >
        Edit
      </button>
      <h3 className="lot__lotNumber"> Project: {project.name}</h3>
      <div className="lot__size">Estimated Completion Date: {project.estimatedCompletionDate}</div>
      <div className="lot__size">Estimated Cost: {project.estimatedCost}</div>

     
      <button className='add__note' onClick={() => {
          history.push(`/projectnotes/create/${project.id}`)
        }}>Add Note</button>

<div className="noteCards">
      {
        project.project_notes?.map(projectNote => 
          <section className="noteCard">
    <h3 className="note__name">{projectNote.note.name}</h3>  
   

        <div className="note__date">Date: {projectNote.note.date }</div>
        <div className="note__itemsReceived">Items Received: {projectNote.note.itemsReceived }</div>
        <div className="note__description">description: {projectNote.note.description }</div>
        <div className="note__contactNumber">Contact Number: {projectNote.note.contactNumber }</div>

        {/* <button className="deleteBtn"
          onClick={() => projectNoteDelete(projectNote.id)}>
          Remove note
      </button>  */}     
          <button className='edit' onClick={() => {
          history.push(`/projectnotes/edit/${projectNote.id}`)
        }}>Edit</button>

         {/* <section className="projectCard">
    <div className="projectCards">{lot.projectId.name}</div>
    <div className="projectCards">Estimated Completion Date{lot.projectId.estimatedCompletionDate}</div>
    <div className="projectCards">Estimated Cost: ${lot.projectId.estimatedCost}</div>
    </section>  */}
    </section>
        )}   

        </div>

    </section>
  );
      }

