import React, { useState, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import './content.scss'
export const ComponentContent = ({activePage}) => {

  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const [currentContent, setCurrentContent] = useState([])

  useEffect(() => {

    
    let czList = document.getElementsByClassName('contentZone')

    // cz.style.zIndex = 4;
    // console.log(cz)
    // if(cz.length != 0){
    //   for(let element in cz){
    //     console.log(element)
    //   }
    // }
  }, [currentContent])
  
  //   cz.onclick = function() {
  //     console.log(cz)
  //   }

    // document.onclick = function() {
    //   if (leftMenuOpened && !clickWasInLeftMenu) {
    //     toggleLeftMenu(false)
    //   }
    //   clickWasInLeftMenu = false
    // }


  function onCreateContent(){
    let contentArray = [
      1
    ]
    let content = contentArray.map(item => {
      let zIndex = 2
      let setStyle = ''
      if(currentContent > 0){
        if(currentContent == item){
          zIndex = 4 
          setStyle = "activeContent"
        }
        else{
          zIndex = 0
        }
      }
      return (
        <div id = {`zone +${item}`} className={`contentZone ${setStyle}`} key={item} onClick={() => {setCurrentContent(item)}}style = {{zIndex: zIndex}}>{item}
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
      <div>
        <div className='content'>
            {contentZone}
        </div>
        <div className="transBox"></div>
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
