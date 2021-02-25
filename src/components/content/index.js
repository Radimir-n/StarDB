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
  const [personId, setPersonId] = useState([])
  const [loading, setLodingIndicator] =useState(true)

    function getPerson (){
      services
      .getAllPeople()
      .then((people)=>{
        setData(people)
      })
      .catch(setLodingIndicator(false));
    }
  useEffect(() => {
    getPerson()
  }, [])
  useEffect(() => {
    console.log(personId)
    // return () => {
    //   getPerson()
    // };
  }, [personId]);
  


  function onCreateContent(){
    let index = 0
    let content = data.map(item => {
      let id = services._extractId(item)
      index = index + 1
      if(loading){
        return (
            <div  className= "contentZone"   key = {index} onClick={() => {setCurrentContent(index -1)}}>
              {/* <ul> */}
                <Spinner/>
              {/* </ul> */}
            </div>
        )
      }
      else{
        return (
            <div className= "contentZone" key = {index} onClick={() => {setCurrentContent(index - 1); setPersonId(id)}}>
              <div className="image">
                <img src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}className = "image_center"/>
                  
              {/* <ul>
                <li>gender: {item.gender}</li>
                <li>hair:  {item.hair_color}</li>
                <li>eye color:   {item.eye_color}</li>
                <li>birthTear: {item.birth_year}</li>
              </ul> */}
              </div>
              <h2 className = "person_name">{item.name}</h2>
           </div>
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
