import React from 'react';
import { render } from '@testing-library/react';

const Grid = (props) => {
    return(
        <div className='grid'>

        </div>
    )

}
export default Grid

// {props.grid.map((row,idx) => <div key={idx} className='row'>{idx}{
//     row.map((cell,idx) => <div className="cell">{idx}</div>)
// }</div>)}