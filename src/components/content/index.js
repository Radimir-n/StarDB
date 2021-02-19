import React, { useState, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import './content.scss'
export const ComponentContent = ({activePage}) => {

  const state = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {

  }, [])

  function onCreateContent(){
    let contentArray = [
      1,2
    ]
    let content = contentArray.map(item => {
      return (
        <div className='contentZone' key={item}>{item}
          <ul>
            <li>name</li>
            <li>gender</li>
            <li>hair</li>
            <li>eye</li>
            <li>birth</li>
          </ul>
        </div>
      )
    })
    return content
  }
  let contentZone = onCreateContent()
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
          {contentZone}
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
