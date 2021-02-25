import React, { useState, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import './toolBar.scss'
import logo from './logo.svg'

export const ComponentToolBar = ({onActivePage}) => {

  return (
    <div className='toolbar'>
      <div className = "logo">
          <img src={logo} />
      </div>
      <button onClick={() => onActivePage("Planets")}>Planets</button>
      <button onClick={() => onActivePage("Person")}>Person</button>
      <button onClick={() => onActivePage("Starships")}>Starships</button>
    </div>
  )

}
