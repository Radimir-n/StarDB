
 //класс сервис был создан для упрощения работы с данными с сервера - один блок
// export const SwapiService = () => {

  let _apiBase = 'https://swapi.dev/api'; // переменная с ссылкой на данные с сервера

  export async function getResource (url) {
    console.log('ok')
    const res = await fetch(`${_apiBase}${url}`); // ждем res это промисы, передаем ссылку на данные с сервера
    if (!res.ok) { // содержит true если res.status содержит один из ОК-статусов(200-299) т.е. что-то не найденно (например id не правильный то ошибка 404)
      throw new Error(`Could not fetch ${url}` +  `received ${res.status}`) // обработка ошибки при проблемах сервера
    }
      return await res.json();
  }
  export async function getAllPeople(){
    const res =  await getResource (`/people/`); // запрашивает всех по ссылке функции getResource (people)
    return res.results.map(_transformPerson) // выводим массив результата данных с сервера
  } 
  export async function getPerson(id) { // принимает id
    const person =  await getResource (`/people/${id}/`); // запрашивает каждого персонажа по id
    return _transformPerson(person)
  } 
  export async function getAllPlanets(){  // для вывода всех значений блока данных берем переменную res
    const res = await getResource (`/planets/`); 
    return res.results.map(_transformPlanet) // Метод map() создаёт новый массив с результатом вызова указанной функции для каждого элемента массива.
  } 
  export async function getPlanet(id){
    const planet = await getResource (`/planets/${id}/`);
    return _transformPlanet(planet) // вызываем функцию с новыми данными с входными данными (planet)
  } 
  export async function getAllStarships () { 
    const res = await getResource (`/starships/`);
    return res.results.map(_transformStarship) // заменяем results(результат) на новый массив при помощи map()
  } 
  export async function getStarship (id){ 
    const starships = getResource (`/starships/${id}/`);
    return  _transformStarship(starships)
  } 
  export async function _extractId (item)  { // функция для того что бы вытянуть id картинки из url-ссылки
    const idRegExp = /\/([0-9]*)\/$/; // это регулярное выражение оно пишется: (/тут выражение\) $ находит конец строки [0-9]* это значения id которые могут быть круглые скобки оборачивают отдельное значение 
    return item.url.match(idRegExp)[1] // указываем путь к url где будет использоваться решулярное выражение [1] группа это обращение к ([0-9])
  }
  function _transformPlanet (planet) { // принимает на вход planet т.е. читает данные с planet
   
    return{ // возвращает те поля с состояием которые нам необходимы
      id: _extractId(planet), // вызов функции для изменения id planet
      planetName: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter,
    }
  }
  function _transformStarship (starships) {
    return {
      id: _extractId(starships),
      name: starships.name,
      model: starships.model,
      manufacturer: starships.manufacturer,
      costInCredits: starships.costInCredits, 
      length: starships.length,
      crew: starships.crew,
      passengers: starships.passengers,
      cargoCapacity: starships.cargoCapacity
    }
  }
  function _transformPerson (person) {
    return {
      id: _extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birthYear,
      eyeColor: person.eyeColor
    }
  }
// }