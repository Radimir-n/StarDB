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
  const [content, setActiveContent] = useState(null)


  useEffect(() => {
    services.getAllPlanets()
    .then(data=>{
      setPlanetsData(data)
      setLodingIndicator(false)
    })
    services.getAllPeople()
    .then(data=>{
      setPeopleData(data)
      setLodingIndicator(false)
    })
    services.getAllStarships()
    .then(data=>{
      setStarshipsData(data)
      setLodingIndicator(false)
    })
    services.getFilms()
    .then(data=>{
      setFilmsData(data)
      setLodingIndicator(false)
    })
  }, [])

  useEffect(()=>{
    onCreateContent(peopleData, activePage)
    .then((data)=>{
      setActiveContent(data)
    })
  },[peopleData])
  // return (
  //   <div className='content'>
  //     <Spinner
  //       loading = {loading}
  //     />
  //       {content}
  //   </div>
  // )
  useEffect(()=>{
    let activeData = undefined
    if(activePage != "Person"){
      if(activePage == "planets"){
        activeData = planetsData
      }
      else if(activePage == "characters"){
        activeData = peopleData
      }
      else if(activePage == "starships"){
        activeData = starshipsData
      }
      else if(activePage == "films"){
        activeData = filmsData
      }
      onCreateContent(activeData, activePage)
      .then((data)=>{
        setActiveContent(data)
      })
    }else{
      console.log(page, personId)
      onCreatePersonData(page, personId)
    }
  },[activePage])

   async function onCreateContent(data, img){
    let index = 0
    let personData = [
      data,
      img
    ]
    let arrResult = []
    for(let item of data){
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
        const newItem = <div  className= "contentZone" key = {index} onClick={() => {setCurrentContent(index -1)}}>
                <Spinner/>
            </div>
        arrResult = [...arrResult, newItem]
      }
      else{
        let response = await fetch('https://starwars-visualguide.com/assets/img/'+ img+'/'+ id + '.jpg')
        let result = `https://starwars-visualguide.com/assets/img/${img}/${id}.jpg`
        if(response.status == 404){
          result = 'https://starwars-visualguide.com/assets/img/big-placeholder.jpg'
        }
        
        const newItem = <div className= "contentZone" key = {index} onClick={() => {setCurrentContent(index - 1); setPersonId(id); onActivePage("Person"); getActivePageData(personData)}}>
              <div className="image">
                <img src={result}className = "image_center"/>
              </div>
              <h2 className = "person_name">{name}</h2>
           </div>
        arrResult = [...arrResult, newItem]
            

      }
    }
    return arrResult
  }

  function onCreatePersonData(data, id){
    let person_data = data[0].find(item => services._extractId(item.url) == id);
    let list = []
    let name = person_data.name
    if(!name){
      name = person_data.title
    }
    let dopInfo = []
    if(data[1] == 'characters'){
      let Films = setDopInfo(person_data.films, 'Related Films', filmsData,'films')
      var Starships = setDopInfo(person_data.starships, 'Related Starships', starshipsData,'starships')
      dopInfo = [
        <div key = 'dopInfo' className = 'dopInformation'>
              {Films}
              {Starships}
        </div> 
      ]
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
            <li>Gender: {person_data.gender}</li>
            <li>BirthTear: {person_data.birth_year}</li>
            <li>Hair: {person_data.hair_color}</li>
            <li>Eye color: {person_data.eye_color}</li>
            <li>Mass: {person_data.mass}</li>
            <li>Height: {person_data.height}</li>
            <li>Homeworld: <a href="#" onClick={() => {onCreatePersonData(planet_link,planet_id),setPersonId(planet_id),getActivePageData(planet_link)}}>{homeworld.name}</a> </li>
        </div>
      ]
    }
    if(data[1] == 'planets'){
      let Films = setDopInfo(person_data.films, 'Related Films', filmsData,'films')
      let Residents = setDopInfo(person_data.residents, 'Residents', peopleData,'characters')
      dopInfo = [
        <div key = 'dopInfo' className = 'dopInformation'>
              {Films}
              {Residents}
        </div> 
      ]
      list = [
        <div key = 'planets'>
              <li>Population: {person_data.population}</li>
              <li>Diameter: {person_data.diameter} km</li>
              <li>Gravity: {person_data.gravity}</li>
              <li>Orbital period: {person_data.orbital_period} days</li>
              <li>Climate: {person_data.climate}</li>
              <li>Surface water: {person_data.surface_water}%</li>
              <li>Rotation period: {person_data.rotation_period} days</li>
        </div>
      ]
    }
    if(data[1] == 'starships'){
      let Films = setDopInfo(person_data.films, 'Related Films', filmsData,'films')
      let Pilots = setDopInfo(person_data.pilots, 'Related Films', peopleData,'characters')
      dopInfo = [
        <div key = 'dopInfo' className = 'dopInformation'>
              {Films}
              {Pilots}
        </div> 
      ]
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
      let Characters = setDopInfo(person_data.characters, 'Related Characters', peopleData,'characters')
      let Planets = setDopInfo(person_data.planets, 'Related Planets', planetsData,'planets')
      let Starships = setDopInfo(person_data.starships, 'Related Starships', starshipsData,'starships')
      dopInfo = [
        <div key = 'dopInfo' className = 'dopInformation'>
              {Characters}
              {Planets}
              {Starships}
        </div> 
      ]
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
            {dopInfo}
        </div>
    )   
  }
  function setDopInfo(data,title, dataType,page){
    let objects = data.map(item => {
      let id = services._extractId(item)
      let currentObject = dataType.find(el => el.url == item)
      let objects_data = [
        dataType,
        page
      ]
      let name = undefined
      if(currentObject){
        var object_id =  services._extractId(currentObject.url)
        if(currentObject.name){
          name = currentObject.name
        }else{
          name = currentObject.title
        }
      }
      if(currentObject){
        return (
          <div key = {id} className = 'object_image'>
            <ul>
              <img src={`https://starwars-visualguide.com/assets/img/${page}/${id}.jpg`} className = "image_object"/>
              <div className = 'link_name'>
              <a href="#" onClick={() => {onCreatePersonData(objects_data,object_id),setPersonId(object_id),getActivePageData(objects_data)}}>{name}</a>
              </div>
            </ul>
          </div>
          
        )
      }else{
        return
      }
      
    })
    let list = [
      <div key = {title} className = 'personObject'>
          <h3>{title}</h3>
          <hr></hr>
          <div key ='list_films' className = 'object_list'>
            {objects}
          </div>
      </div>
    ]
    return list
  }
  // let content = undefined
  return(
    <div className='content'>
        {content}
    </div>
  )


}
