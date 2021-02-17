import React, { useState, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import './content.scss'
export const ComponentContent = ({activePage}) => {

  const state = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {

    // setTimeout(() => { dispatch(addNewMessage('info', 'Hello1')) }, 1000)
    // setTimeout(() => { dispatch(addNewMessage('warning', 'Hello2')) }, 1500)
    // setTimeout(() => { dispatch(addNewMessage('error', 'Hello3')) }, 2000)
    // setTimeout(() => { dispatch(addNewMessage('accept', 'Hello4')) }, 2500)
  }, [])
  if(activePage == "Planets"){
    return (
      <div className='content'>
          <h2>Content Planets</h2>
      </div>
    )
  }
  else if(activePage == "Person"){
    return (
      <div className='content'>
          <h2>Content Person</h2>
      </div>
    )
  }
  else if(activePage == "Starships"){
    return (
      <div className='content'>
          <h2>Content Starships</h2>
      </div>
    )
  }

}
