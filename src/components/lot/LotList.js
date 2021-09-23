import React, { useState, useContext, useEffect } from "react";
import { LotContext } from "./LotProvider";
//import { Vehicle } from "./Vehicle";
import "./Lot.css";
import { useHistory } from "react-router-dom";
import { Button } from 'reactstrap';

export const LotList = () => {
  //Need a little more help understanding this
  //I think what is happening is passing in the LotContext from LotProvider,
  //deconstructing that object from LotContext to just return getLots and Lots
  const { getLots, lots } = useContext(LotContext);

  const history = useHistory();
  //The useEffect() hook allows the component to reach out into the world for anything that cannot be handled during render
  //it is the API call for the getVehicles function.
  //useEffect must always take a function and an array
  //function comes first (getVehicles), then the array []
  useEffect(() => {
    getLots(); 
  }, []); 

  return (
    <>
      <div className="lotHeader">
        <h1>Lots</h1>

      </div>

      <div className="addButton">
      <Button color="secondary" size="md" onClick={() => history.push("/lots/create")}>
        Add Lot
      </Button>
      </div>
      <div className="lots">
        {lots.map((lot) => (
          <div className="lot" id={`lot--${lot.id}`}>
            <div className="lot__lotNumber">Lot Number: {lot.lotNumber}</div> 

            <div className="lot__lotSize">Size: {lot.lotSize} </div>
            
           

            <div className="lotDetailButton">
              <Button color="secondary" size="sm" onClick={() => history.push(`/lots/${lot.id}`)}>
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
