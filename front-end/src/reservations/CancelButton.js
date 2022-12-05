import React from "react";
import { useHistory } from "react-router";

function CancelButton(){
    const history = useHistory();

    return (
        <button type="button" className="btn btn-danger mr-2" onClick={() => history.push("/")}>
            Cancel
        </button>
    );
}

export default CancelButton;