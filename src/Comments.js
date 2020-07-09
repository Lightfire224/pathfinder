import React from "react";

const Comments = (props) => {

    return (
        <div>
            <div className="card">
                    <div className="container">
                        <h4 style={{color: "white"}}><b>Comment: {props.content}</b></h4>
                    </div>
        </div>

            </div>


  );
};

export default Comments;
