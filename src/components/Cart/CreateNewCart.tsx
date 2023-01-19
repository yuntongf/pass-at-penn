import React, { useState } from "react";
import {useDispatch} from 'react-redux';
import { newCartCreated } from "../../store/reducers/courses";


const CreateNewCart = () => {
    const dispatch = useDispatch();

    // local state variable to hold new cart name
    const [cartName, setCartName] = useState("");

    const handleCreate = () => {
        dispatch(newCartCreated(cartName));
        setCartName("");
    }

    const createCartPrompt = "Create a new Cart:";
    return (
        <> 
            <div>{createCartPrompt}</div>
            <div className="d-flex justify-content-between">
                <input className="col-8" value={cartName} onChange={(e) => setCartName(e.target.value)}/>
                <button className="ms-2 btn btn-sm btn-outline-secondary" onClick={() => handleCreate()} >
                    Create
                </button>
            </div>
        </>
    )
}

export default CreateNewCart;