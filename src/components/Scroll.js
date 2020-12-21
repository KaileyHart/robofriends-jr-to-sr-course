import React from 'react';

//Creates a scrollable component
const Scroll = (props) => {
    return (
        <div style={{overflow: 'scroll', border: '1px solid black', height: '500px'}}>
            {props.children}
        </div>
    )
}

export default Scroll