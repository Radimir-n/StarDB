import React, { useState, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import * as services from '../../services/swapi-service'
import Spinner from '../spinner/spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faQuestion, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import './content.scss'
export const ComponentContent = ({activePage}) => {

  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const [currentContent, setCurrentContent] = useState([])
  const [data, setData] = useState([])
  const [loading, setLodingIndicator] =useState(true)
    function getPerson (){
      services
      .getAllPeople()
      .then(setData)
      .catch(setLodingIndicator(false));
    }
  useEffect(() => {

    let czList = document.getElementsByClassName('contentZone')

    // cz.style.zIndex = 4;
    // console.log(cz)
    // if(cz.length != 0){
    //   for(let element in cz){
    //     console.log(element)
    //   }
    // }
    getPerson()
    console.log(loading)
    // asyncProcess()
  }, [loading])
  useEffect(() => {
    return () => {
      getPerson()
    };
  }, []);
    
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

    console.log(data)
    let index = 0
    let content = data.map(item => {
      index = index + 1
      console.log(item.id)
      let zIndex = 2
      let setStyle = ''
      if(currentContent > 0){
        if(currentContent == index - 1){
          zIndex = 4 
          setStyle = "activeContent goCenter"
        }
        else{
          zIndex = 0
        }
      }
      if(loading){
        return (
          // <div className = {`contentBox`} key={item}>
            <div  className={`contentZone ${setStyle}`}  key = {index} onClick={() => {setCurrentContent(index -1)}}style = {{zIndex: zIndex}}>
              {/* <ul> */}
                <Spinner/>
              {/* </ul> */}
            </div>
        )
      }
      else{
        return (
          // <div className = {`contentBox`} key={item}>
            <div className={`contentZone ${setStyle}`} key = {index} onClick={() => {setCurrentContent(index - 1)}}style = {{zIndex: zIndex}}>{item.name}
              <ul>
                <li>gender: {item.gender}</li>
                <li>hair:  {item.hair_color}</li>
                <li>eye color:   {item.eye_color}</li>
                <li>birthTear: {item.birthYear}</li>
              </ul>
            </div>
          // </div>
        )
      }
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
        <div className="transBox" onClick={() => {setCurrentContent(0)}}></div>
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
