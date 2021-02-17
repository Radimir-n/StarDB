import React, { useState, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import './toolBar.scss'

export const ComponentToolBar = ({onActivePage}) => {

  const state = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {

    // setTimeout(() => { dispatch(addNewMessage('info', 'Hello1')) }, 1000)
    // setTimeout(() => { dispatch(addNewMessage('warning', 'Hello2')) }, 1500)
    // setTimeout(() => { dispatch(addNewMessage('error', 'Hello3')) }, 2000)
    // setTimeout(() => { dispatch(addNewMessage('accept', 'Hello4')) }, 2500)
  }, [])

  return (
    <div className='toolbar'>
        <button onClick={() => onActivePage("Planets")}>Planets</button>
        <button onClick={() => onActivePage("Person")}>Person</button>
        <button onClick={() => onActivePage("Starships")}>Starships</button>
    </div>
  )

}
