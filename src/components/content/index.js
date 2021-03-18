import React, { useState, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import * as services from '../../services/swapi-service'
import Spinner from '../spinner/spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faQuestion, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import './contentCard.scss'
import './personContent.scss'
export const ComponentContent = ({activePage, onActivePage}) => {

  const [currentContent, setCurrentContent] = useState([])
  const [peopleData, setPeopleData] = useState([])
  const [planetsData, setPlanetsData] = useState([])
  const [starshipsData, setStarshipsData] = useState([])
  const [personId, setPersonId] = useState([])
  const [loading, setLodingIndicator] = useState(true)
  const [page, getActivePageData] = useState([])


  useEffect(() => {
    getData()
  }, [])
  useEffect(() => {
    // console.log(starshipsData)
    // return () => {
    //   getPerson()
    // };
  }, [personId]);

    async function getData(){

      let allPlanets = await services.getAllPlanets()
      setPlanetsData(allPlanets)
      // setLodingIndicator(false)

      let allPeople = await services.getAllPeople()
      setPeopleData(allPeople)
      setLodingIndicator(false)

      let allStarships = await services.getAllStarships()
      setStarshipsData(allStarships)
      // setLodingIndicator(false)
    }

  function onCreateContent(data, img){
    let index = 0
    let personData = [
      data,
      img
    ]
    let content = data.map(item => {
      let id = services._extractId(item.url)
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
            <div className= "contentZone" key = {index} onClick={() => {setCurrentContent(index - 1); setPersonId(id); onActivePage("Person"); getActivePageData(personData)}}>
              <div className="image">
                <img src={`https://starwars-visualguide.com/assets/img/${img}/${id}.jpg`}className = "image_center"/>
              </div>
              <h2 className = "person_name">{item.name}</h2>
           </div>
        )
      }
    })
    return content
  }
  function onCreatePersonData(data, id){
    if (data[1] == 'characters'){
      return character_data(data,id) 
    }
    if(data[1] == 'planets'){
      return planets_data(data, id)
    }
    if(data[1] == 'starships'){
      return starships_data(data,id)
    }
           
  }
  function character_data(data, id){
    console.log(data)
    let person_data = data[0].find(item => services._extractId(item.url) == id);
    let planets_data = [
      planetsData,
      services._extractId(person_data.homeworld)
    ]
    let planet_link = [
      planets_data[0],
      'planets'
    ]
    console.log(person_data)
    console.log(planets_data)
    let homeworld =  planets_data[0].find(item => person_data.homeworld == item.url)
    if (homeworld){
      homeworld = homeworld.name
    }
    else{
      homeworld = planets_data[0][0]
    }
    let people_list = [
      <div key = 'people'>
            <li>gender: {person_data.gender}</li>
            <li>birthTear: {person_data.birth_year}</li>
            <li>hair: {person_data.hair_color}</li>
            <li>eye color: {person_data.eye_color}</li>
            <li>mass: {person_data.mass}</li>
            <li>height: {person_data.height}</li>
            <li>homeworld: <a href="#" onClick={() => {onCreatePersonData(planet_link,id),getActivePageData(planet_link)}}>{homeworld}</a> </li>
      </div>
    ]
      return(
        <div>
          <div className = "personContentZone">
            <div className="personImage">
              <img src={`https://starwars-visualguide.com/assets/img/${data[1]}/${id}.jpg`} className = "personImageCenter"/>
            </div>
            <div className="personData">
              <ul>
              <h1>{person_data.name}</h1>
              <hr></hr>
                {people_list}
              </ul>
            </div>
          </div>
          <div className = 'dopInformation'>
            <div className = 'personFilms'></div>
          </div>
        </div> 
    )     
  }
  function planets_data(data, id){
    let person_data = data[0].find(item => services._extractId(item.url) == id);

    let person_list = [
      <div key = 'planet'>
            <li>population: {person_data.population}</li>
            <li>diameter: {person_data.diameter} km</li>
            <li>gravity: {person_data.gravity}</li>
            <li>orbital period: {person_data.orbital_period} days</li>
            <li>climate: {person_data.climate}</li>
            <li>surface water: {person_data.surface_water}%</li>
            <li>rotation period: {person_data.rotation_period} days</li>
      </div>
    ]
      return(
        <div className = "personContentZone">
          <div className="personImage">
            <img src={`https://starwars-visualguide.com/assets/img/${data[1]}/${id}.jpg`} className = "personImageCenter"/>
          </div>
          <div className="personData">
            <ul>
            <h1>{person_data.name}</h1>
            <hr></hr>
              {person_list}
            </ul>
          </div>
        </div>
    ) 
  }
  function starships_data(data,id){
    let person_data = data[0].find(item => services._extractId(item.url) == id);
    let person_list = [
      <div key = 'starship'>
            <li>Model: {person_data.model}</li>
            <li>Manufacturer: {person_data.manufacturer}</li>
            <li>Cost: {person_data.cost_in_credits} credits</li>
            <li>Class: {person_data.starship_class}</li>
            <li>Speed: {person_data.max_atmosphering_speed}km/h</li>
            <li>Hyperdrive Rating: {person_data.hyperdrive_rating}</li>
            <li>MGLT: {person_data.MGLT}</li>
            <li>Length: {person_data.length}m</li>
            <li>Cargo Capacity: {person_data.cargo_capacity} metric tons</li>
            <li>Passengers: {person_data.passengers}</li>
      </div>
    ]
      return(
        <div className = "personContentZone">
          <div className="personImage">
            <img src={`https://starwars-visualguide.com/assets/img/${data[1]}/${id}.jpg`} className = "personImageCenter"/>
          </div>
          <div className="personData">
            <ul>
            <h1>{person_data.name}</h1>
            <hr></hr>
              {person_list}
            </ul>
          </div>
        </div>
    ) 
  }
  let content = undefined
  if(activePage == "planets"){
    content = onCreateContent(planetsData, activePage)
    return (
      <div className='content'>
          {content}
      </div>
    )
  }
  else if(activePage == "characters"){
    content = onCreateContent(peopleData, activePage)
    return (
      <div className='content'>
        <Spinner
          loading = {loading}
        />
          {content}
      </div>
    )
  }
  else if(activePage == "starships"){
    content = onCreateContent(starshipsData, activePage)
    return (
      <div className='content'>
          {content}
      </div>
    )
  }
  else if(activePage == "Person"){

    content = onCreatePersonData(page, personId)
    return (
      <div className='personContent'>
          {content}
      </div>
    )
  }

}
