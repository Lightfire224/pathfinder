import React from "react";

const AlgorithmCard = (props) => {


    return (
        <div>
            <div class="card">
                    <div class="container">
                        <h4><b>{props.title}</b></h4>
                        <p>{props.user}</p>
                        <p>{props.personal_note}</p>
                        <button onClick={() => props.toggleRedirect()}>Show Page</button>
                    </div>
        </div>

            </div>


  );
};

export default AlgorithmCard;
