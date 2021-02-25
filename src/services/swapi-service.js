
  const _apiBase = 'https://swapi.dev/api';

  export async function getResource (url) {
    const res = await fetch(`${_apiBase}${url}`); 
    if (!res.ok) { 
      throw new Error(`Could not fetch ${url}` +  `received ${res.status}`) // обработка ошибки при проблемах сервера
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
    return res.results.map(_transformPlanet) 
  } 
  export async function getPlanet(id){
    const planet = await getResource (`/planets/${id}/`);
    return _transformPlanet(planet) 
  } 
  export async function getAllStarships () { 
    const res = await getResource (`/starships/`);
    return res.results.map(_transformStarship) 
  } 
  export async function getStarship (id){ 
    const starships = getResource (`/starships/${id}/`);
    return  _transformStarship(starships)
  } 
  export function _extractId (item)  { 
    const idRegExp = /\/([0-9]*)\/$/; // это регулярное выражение оно пишется: (/тут выражение\) $ находит конец строки [0-9]* это значения id которые могут быть круглые скобки оборачивают отдельное значение 
    return item.url.match(idRegExp)[1] // указываем путь к url где будет использоваться решулярное выражение [1] группа это обращение к ([0-9])
  }