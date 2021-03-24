
  const _apiBase = 'https://swapi.dev/api';

  export async function getResource (url) {
    const res = await fetch(`${_apiBase}${url}`); 
    if (!res.ok) { 
      throw new Error(`Could not fetch ${url}` +  `received ${res.status}`)
    }
      return await res.json();
  }
  export async function getAllPeople(){
    const res =  await getResource (`/people/`); 
    return res.results
  } 
  export async function getPerson(id) { 
    const person =  await getResource (`/people/${id}/`); 
    return _transformPerson(person)
  } 
  export async function getAllPlanets(){  
    const res = await getResource (`/planets/`); 
    return res.results
  } 
  export async function getPlanet(id){
    const planet = await getResource (`/planets/${id}/`);
    return _transformPlanet(planet) 
  } 
  export async function getAllStarships () { 
    const res = await getResource (`/starships/`);
    return res.results
  } 
  export async function getStarship (id){ 
    const starships = getResource (`/starships/${id}/`);
    return  _transformStarship(starships)
  }
  export async function getFilms(){
    const res =  await getResource (`/films/`); 
    return res.results
  }  
  export function _extractId (item)  { 
    const idRegExp = /\/([0-9]*)\/$/; 
    return item.match(idRegExp)[1]
  }