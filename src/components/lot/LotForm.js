import React, { useContext, useEffect, useState } from "react"
import { LotContext } from "../lot/LotProvider"
import "./Lot.css"
import { useHistory, useParams } from 'react-router-dom';
import { Button } from 'reactstrap';

export const LotForm = () => {
    const { addLot, getLotById, updateLot } = useContext(LotContext)

    //for edit, hold on to state of Vehicle in this view
    const [lot, setLot] = useState({})
    //wait for data before button is active
   /*  const [isLoading, setIsLoading] = useState(true); */

    const {lotId} = useParams();
	  const history = useHistory();

    
    //when field changes, update state. This causes a re-render and updates the view.
    //Controlled component
    const handleControlledInputChange = (event) => {
      //When changing a state object or array,
      //always create a copy make changes, and then set state.
      const newLot = { ...lot }
      //Lot is an object with properties.
      //set the property to the new value
      newLot[event.target.name] = event.target.value
      //update state
      setLot(newLot)
    }

    const handleSaveLot = () => {
    const user = localStorage.getItem("PF_token")
    
        //disable the button - no extra clicks
        if (lotId){
          //PUT - update
        updateLot({
            id: lot.id,
            super: parseInt(user),
            lotSize: lot.lotSize,
            lotNumber: lot.lotNumber,
          })
          .then(() => history.push(`/lots/${lot.id}`))
        }else {
          //POST - add
        addLot({
            super: parseInt(user),
            lotSize: lot.lotSize,
            lotNumber: lot.lotNumber,
          })
          .then(() => history.push("/lots"))       
      }
    }

    // Get customers and locations. If VehicleId is in the URL, getVehicleById
    useEffect(() => {
        if (lotId) {
          getLotById(lotId)
            .then(lot => {
              setLot(lot)
            })
          }   
      }, [])// this array is empty is because the vehicle doesnt exist yet
            // the empty array on the useEffect runs on page load. If there is nothing to watch, then it just runs the function inside it.

    //since state controlls this component, we no longer need
    //useRef(null) or ref

    return (
      <form className="lotForm">
        <h2 className="lotForm__title">{lotId ? <>Edit Lot</> : <>New Lot</>}</h2>

        <fieldset>
        <div className="form-group">
          <label htmlFor="lotNumber">lot Number:</label>
          <input type="text" id="lotNumber" name="lotNumber" required autoFocus className="form-control" placeholder="lot Number" value={lot.lotNumber} onChange={handleControlledInputChange}
          value={lot.lotNumber} />
        </div>
      </fieldset>
      
        <fieldset>
        <div className="form-group">
          <label htmlFor="lotSize">lot Size:</label>
          <input type="text" id="lotSize" name="lotSize" required autoFocus className="form-control" placeholder="lot Size" value={lot.lotSize} onChange={handleControlledInputChange}
          value={lot.lotSize} />
        </div>
      </fieldset>
       
      <div className="lotSaveButton">
        <Button className="lotSaveButton"
          
          onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleSaveLot()
          }}>
        {lotId ? <>Save lot</> : <>Add lot</>}</Button>
        </div>
      </form>
    )
}