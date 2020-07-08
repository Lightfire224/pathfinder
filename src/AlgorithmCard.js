import React from "react";

const AlgorithmCard = (props) => {

    return (
        <div>
            <div className="card">
                    <div className="container">
                        <h4 style={{color: "white"}}><b>Title: {props.title}</b></h4>
                        <p style={{color: "white"}}>User: {props.user}</p>
                        <p style={{color: "white"}}>Personal Note: {props.personal_note}</p>
                        <button onClick={() => props.toggleRedirect(props.id)}>Show Page</button>
                    </div>
        </div>

            </div>


  );
};

export default AlgorithmCard;
