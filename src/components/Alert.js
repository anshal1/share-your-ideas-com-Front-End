import React from 'react'
import "../componentsStyle/Alert.css"
const Alert = (props) => {
  return (
    <div className='container'>
      <div className="alert" style={props.style}>{props.alertmsg}</div>
    </div>
  )
}

export default Alert
