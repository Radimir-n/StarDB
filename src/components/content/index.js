import React, { useState, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import * as services from '../../services/swapi-service'
import Spinner from '../spinner/spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faQuestion, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import './contentCard.scss'
import './personContent.scss'
export const ComponentContent = ({activePage, onActivePage}) => {

  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const [currentContent, setCurrentContent] = useState([])
  const [peopleData, setPeopleData] = useState([])
  const [planetsData, setPlanetsData] = useState([])
  const [starshipsData, setStarshipsData] = useState([])
  const [personId, setPersonId] = useState([])
  const [loading, setLodingIndicator] =useState(false)

    function getData(){
      if(activePage == "Planets"){
        services
        .getAllPlanets()
        .then((planets)=>{
          setPlanetsData(planets)
        }) 
      }
      else if(activePage == "People"){
        services
        .getAllPeople()
        .then((people)=>{
          setPeopleData(people)
        })
      }
      else if(activePage == "Starships"){
        services
        .getAllStarships()
        .then((starships)=>{
          setStarshipsData(starships)
        })
      }
    }
  useEffect(() => {
    getData()
  }, [activePage])
  useEffect(() => {
    // return () => {
    //   getPerson()
    // };
  }, []);
  


  function onCreateContent(data, img){
    let index = 0
    let content = data.map(item => {
      let id = services._extractId(item)
      index = index + 1
      if(loading){
        return (
            <div  className= "contentZone" key = {index} onClick={() => {setCurrentContent(index -1)}}>
              {/* <ul> */}
                <Spinner/>
              {/* </ul> */}
            </div>
        )
      }
      else{
        return (
            <div className= "contentZone" key = {index} onClick={() => {setCurrentContent(index - 1); setPersonId(id); onActivePage("Person")}}>
              <div className="image">
                <img src={`https://starwars-visualguide.com/assets/img/${img}/${id}.jpg`}className = "image_center"/>
                  
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
  function onCreatePersonData(page, id){
    return(
      <div className = "personContentZone">
        {page}
        {id}
      </div>
    )
  }
  
  let contentPeople = onCreateContent(peopleData, 'characters')
  let contentPlanet = onCreateContent(planetsData, 'planets')
  let contentStarships = onCreateContent(starshipsData, 'starships')
  let personContent = onCreatePersonData('Hello', 'woeld')
  if(activePage == "Planets"){
    return (
      <div className='content'>
          {contentPlanet}
      </div>
    )
  }
  else if(activePage == "People"){
    return (
      <div className='content'>
          {contentPeople}
      </div>
    )
  }
  else if(activePage == "Starships"){
    return (
      <div className='content'>
          {contentStarships}
      </div>
    )
  }
  else if(activePage == "Person"){
    return (
      <div className='content'>
          {personContent}
      </div>
    )
  }

}
