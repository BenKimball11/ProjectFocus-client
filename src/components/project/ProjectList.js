import React, { useState, useContext, useEffect } from "react";
import { ProjectContext } from "./ProjectProvider";
//import { Vehicle } from "./Vehicle";
//import "./Lot.css";
import { useHistory } from "react-router-dom";
import { Button } from 'reactstrap';

export const ProjectList = () => {
  //Need a little more help understanding this
  //I think what is happening is passing in the LotContext from LotProvider,
  //deconstructing that object from LotContext to just return getLots and Lots
  const { getProjects, projects } = useContext(ProjectContext);

  const history = useHistory();
  //The useEffect() hook allows the component to reach out into the world for anything that cannot be handled during render
  //it is the API call for the getVehicles function.
  //useEffect must always take a function and an array
  //function comes first (getVehicles), then the array []
  useEffect(() => {
    getProjects(); 
  }, []); 

  return (
    <>
      <div className="vehicleHeader">
        <h1>Projects</h1>

      </div>

      <div className="addButton">
      <Button color="secondary" size="md" onClick={() => history.push("/projects/create")}>
        Add Project
      </Button>
      </div>
      <div className="projects">
        {projects.map((project) => (
          <div className="lot" id={`lot--${project.id}`}>
            <div className="lot__lotSize"> {project.name} </div>
            <div className="lot__lotNumber">Estimated Completion Date: {project.estimatedCompletionDate}</div> 
            <div className="lot__lotNumber">Cost: ${project.estimatedCost}</div> 

            
           

            {/* <div className="lotDetailButton">
              <Button color="secondary" size="sm" onClick={() => history.push(`/notes/detail/${note.id}`)}>
                View Details
              </Button>
            </div> */}
          </div>
        ))}
      </div>
    </>
  );
};