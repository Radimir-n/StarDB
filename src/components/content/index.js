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
  const [filmsData, setFilmsData] = useState([])
  const [personId, setPersonId] = useState([])
  const [loading, setLodingIndicator] = useState(true)
  const [page, getActivePageData] = useState([])


  useEffect(() => {
    getData()
  }, [])
  useEffect(() => {
    // return () => {
    //   getPerson()
    // };
  }, []);

    async function getData(){

      let allPlanets = await services.getAllPlanets()
      setPlanetsData(allPlanets)
      setLodingIndicator(false)

      let allPeople = await services.getAllPeople()
      setPeopleData(allPeople)
      setLodingIndicator(false)

      let allStarships = await services.getAllStarships()
      setStarshipsData(allStarships)
      setLodingIndicator(false)

      let allFilms = await services.getFilms()
      setFilmsData(allFilms)
      setLodingIndicator(false)
    }

  function onCreateContent(data, img){
    let index = 0
    let personData = [
      data,
      img
    ]
    
    let content = data.map(item => {
      let id = services._extractId(item.url)
      let name = undefined
      if(!item.name){
        name = item.title
      }
      else{
        name = item.name
      }
      index = index + 1
      if(loading){
        return (
            <div  className= "contentZone" key = {index} onClick={() => {setCurrentContent(index -1)}}>
                <Spinner/>
            </div>
        )
      }
      else{
        return (
            <div className= "contentZone" key = {index} onClick={() => {setCurrentContent(index - 1); setPersonId(id); onActivePage("Person"); getActivePageData(personData)}}>
              <div className="image">
                <img src={`https://starwars-visualguide.com/assets/img/${img}/${id}.jpg`}className = "image_center"/>
              </div>
              <h2 className = "person_name">{name}</h2>
           </div>
        )
      }
    })
    return content
  }

  function onCreatePersonData(data, id){
    let person_data = data[0].find(item => services._extractId(item.url) == id);
    let list = []
    let name = undefined
    if(person_data.name){
      name = person_data.name
    }
    else{
      name = person_data.title
    }
    if(data[1] == 'characters'){
      let planets_data = [
        planetsData,
        services._extractId(person_data.homeworld)
      ]
      let planet_link = [
        planets_data[0],
        'planets'
      ]
      
      let homeworld =  planets_data[0].find(item => person_data.homeworld == item.url)
      if (!homeworld){
        homeworld = planets_data[0][0]
      }
      let planet_id =  services._extractId(homeworld.url)
      list = [
        <div key = 'people'>
            <li>gender: {person_data.gender}</li>
            <li>birthTear: {person_data.birth_year}</li>
            <li>hair: {person_data.hair_color}</li>
            <li>eye color: {person_data.eye_color}</li>
            <li>mass: {person_data.mass}</li>
            <li>height: {person_data.height}</li>
            <li>homeworld: <a href="#" onClick={() => {onCreatePersonData(planet_link,planet_id),setPersonId(planet_id),getActivePageData(planet_link)}}>{homeworld.name}</a> </li>
        </div>
      ]
    }
    if(data[1] == 'planets'){
      list = [
        <div key = 'planets'>
              <li>population: {person_data.population}</li>
              <li>diameter: {person_data.diameter} km</li>
              <li>gravity: {person_data.gravity}</li>
              <li>orbital period: {person_data.orbital_period} days</li>
              <li>climate: {person_data.climate}</li>
              <li>surface water: {person_data.surface_water}%</li>
              <li>rotation period: {person_data.rotation_period} days</li>
        </div>
      ]
    }
    if(data[1] == 'starships'){
      list = [
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
    }
    if(data[1] == 'films'){
      list = [
        <div key = 'planet'>
            <li>Release date: {person_data.release_date}</li>
            <li>Director: {person_data.director}</li>
            <li>Producer(s): {person_data.producer}</li>
            <li>Opening Crawl:</li>
            <li>{person_data.opening_crawl}</li>
        </div>
      ]
    }
      return(
        <div className='parentClass'>
          <div className = "personContentZone">
            <div className="personImage">
              <img src={`https://starwars-visualguide.com/assets/img/${data[1]}/${id}.jpg`} className = "personImageCenter"/>
            </div>
            <div className="personData">
              <ul>
              <h1>{name}</h1>
              <hr></hr>
                {list}
              </ul>
            </div>
          </div>
        </div>
    )   
  }
  function setDopInfo(data){
    let film = data.map(item => {
      let id = services._extractId(item)
      let currentFilm = filmsData.find(el => el.url == item)
      return (
        <div key = {id} className = 'film_image'>
          <ul>
            <img src={`https://starwars-visualguide.com/assets/img/films/${id}.jpg`} className = "image_film"/>
            <a href="#" >{currentFilm.title}</a>
          </ul>
        </div>
        
      )
    })
    let film_list = [
      <div key = 'films' className = 'personFilms'>
          <h3>Related films</h3>
          <hr></hr>
          <div key ='list_films' className = 'film_list'>
            {film}
          </div>
      </div>
    ]
    return film_list
  }
  function character_data(data, id){
    let person_data = data[0].find(item => services._extractId(item.url) == id);
    let planets_data = [
      planetsData,
      services._extractId(person_data.homeworld)
    ]
    let planet_link = [
      planets_data[0],
      'planets'
    ]
    let homeworld =  planets_data[0].find(item => person_data.homeworld == item.url)
    if (!homeworld){
      homeworld = planets_data[0][0]
    }
    let planet_id =  services._extractId(homeworld.url)
    let people_list = [
      <div key = 'people'>
            <li>gender: {person_data.gender}</li>
            <li>birthTear: {person_data.birth_year}</li>
            <li>hair: {person_data.hair_color}</li>
            <li>eye color: {person_data.eye_color}</li>
            <li>mass: {person_data.mass}</li>
            <li>height: {person_data.height}</li>
            <li>homeworld: <a href="#" onClick={() => {onCreatePersonData(planet_link,planet_id),setPersonId(planet_id),getActivePageData(planet_link)}}>{homeworld.name}</a> </li>
      </div>
    ]
    let dopInfo = setDopInfo(person_data.films)
      return(
        <div className='parentClass'>
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
            <div key = 'dopInfo' className = 'dopInformation'>
              {dopInfo}
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
  else if(activePage == "films"){
    content = onCreateContent(filmsData, activePage)
    return (
      <div className='personContent'>
          {content}
      </div>
    )
  }

}
