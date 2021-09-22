import React, { useContext, useEffect, useState } from "react";
import { ProjectContext } from "./ProjectProvider";
import { LotContext } from "../lot/LotProvider";
import { useHistory, useParams } from 'react-router-dom';
//import "./Maintenance.css";
import { Button } from 'reactstrap';


export const ProjectForm = () => {
    const { addProject, getProjectById, updateProject } = useContext(ProjectContext);
    const { projects, getProjects } = useContext(ProjectContext);
    /* useState declares the default state of the functions.
    First thing in the array (vehicle) is always the current state
    second thing in the array (setvehicle) allows you to update the current state   */
    const [project, setProject] = useState({})
         

      const {projectId, lotId} = useParams()
      
      const history = useHistory()
      
      const handleControlledInputChange = (event) => {
        //When changing a state object or array,
        //always create a copy make changes, and then set state.
        const newProject = { ...project }
        //vehicle is an object with properties.
        //set the property to the new value
        newProject[event.target.id] = event.target.value
        //update state
        setProject(newProject)
      }
    
    const handleSaveProject = () => {
    const user = localStorage.getItem("PF_token")

      if (projectId){
        updateProject({
          id: parseInt(project.id),
          lotId: parseInt(project.lotId),
          name: project.name,
          estimatedCost: parseInt(project.estimatedCost),
          estimatedCompletionDate: project.estimatedCompletionDate
        })
        .then(() => history.push(`/projects/${projectId}`))
      }else{
        addProject({
          lotId: parseInt(lotId),
          name: project.name,
          estimatedCost: parseInt(project.estimatedCost),
          estimatedCompletionDate: project.estimatedCompletionDate
        })
        .then(() => history.push(`/lots/${lotId}`))
    }
  }

  // Populates the forms with existing data if there is any
  /* useEffect(() => {
    getLots().then(() => {
      if (lotId){
        getProjectById(lotId)
        .then(project => {
            setProject(project)          
        })
      }
    })
  }, []) */

  useEffect(() => {
    if (projectId) {
      getProjectById(projectId)
        .then(project => {
          setProject(project)
        })
      }   
  }, [])

 
    //since state controlls this component, we no longer need
    //useRef(null) or ref

    return (
      <form className="NoteForm">
         <h2 className="NoteForm__title">{projectId ? <>Edit project</> : <>New project</>}</h2>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="name">Note:</label>
                  <input value={project.name} type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Name" value={project.name}/>
              </div>
          </fieldset>

          <fieldset>
              <div className="form-group">
                  <label htmlFor="estimatedCompletionDate">Estimated Completion Date:</label>
                  <input value={project.estimatedCompletionDate} type="date" id="estimatedCompletionDate" onChange={handleControlledInputChange} required autoFocus className="form-control" value={project.estimatedCompletionDate}/>
              </div>
          </fieldset>
        
          <fieldset>
              <div className="form-group">
                  <label htmlFor="estimatedCost">Estimated Cost:</label>
                  <input value={project.estimatedCost} type="text" id="estimatedCost" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Estimated Cost" value={project.estimatedCost}/>
              </div>
          </fieldset>

          <div className="projectSaveButton">
          <Button className="projectSaveButton"
          onClick={event => {
            event.preventDefault(); // Prevent browser from submitting the form and refreshing the page
            handleSaveProject();
          }}>
     {projectId ? <>Save Project</> : <>Add Project</>}</Button> 
     </div>
      </form>
    )
} 