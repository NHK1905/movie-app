import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import './model.scss'

const Model = props => {
    
    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(props.active)
    }, [props.active]);
  
    return (
        <div id={props.id} className={`model ${active ? 'active' : ''}`}>
            {props.children}
        </div>
  )
}

Model.propTypes = {
    active: propTypes.bool,
    id: PropTypes.string
}

export default Model