
export default class SwapiService { //класс сервис был создан для упрощения работы с данными с сервера - один блок

  _apiBase = 'https://swapi.dev/api'; // переменная с ссылкой на данные с сервера

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`); // ждем res это промисы, передаем ссылку на данные с сервера
  
    if (!res.ok) { // содержит true если res.status содержит один из ОК-статусов(200-299) т.е. что-то не найденно (например id не правильный то ошибка 404)
      throw new Error(`Could not fetch ${url}` +  `received ${res.status}`) // обработка ошибки при проблемах сервера
    }
      return await res.json();
  }
  getAllPeople = async () =>{
    const res =  await this.getResource (`/people/`); // запрашивает всех по ссылке функции getResource (people)
    return res.results.map(this._transformPerson) // выводим массив результата данных с сервера
  } 
  getPerson= async (id) =>{ // принимает id
    const person =  await this.getResource (`/people/${id}/`); // запрашивает каждого персонажа по id
    return this._transformPerson(person)
  } 
  getAllPlanets= async () =>{  // для вывода всех значений блока данных берем переменную res
    const res = await this.getResource (`/planets/`); 
    return res.results.map(this._transformPlanet) // Метод map() создаёт новый массив с результатом вызова указанной функции для каждого элемента массива.
  } 
   getPlanet = async (id) =>{
    const planet = await this.getResource (`/planets/${id}/`);
    return this._transformPlanet(planet) // вызываем функцию с новыми данными с входными данными (planet)
  } 
  getAllStarships = async () =>{ 
    const res = await this.getResource (`/starships/`);
    return res.results.map(this._transformStarship) // заменяем results(результат) на новый массив при помощи map()
  } 
  getStarship = async (id) =>{ 
    const starships = this.getResource (`/starships/${id}/`);
    return this. _transformStarship(starships)
  } 
  _extractId = async (item) => { // функция для того что бы вытянуть id картинки из url-ссылки
    const idRegExp = /\/([0-9]*)\/$/; // это регулярное выражение оно пишется: (/тут выражение\) $ находит конец строки [0-9]* это значения id которые могут быть круглые скобки оборачивают отдельное значение 
    return item.url.match(idRegExp)[1] // указываем путь к url где будет использоваться решулярное выражение [1] группа это обращение к ([0-9])
  }
  _transformPlanet = (planet) => { // принимает на вход planet т.е. читает данные с planet
   
    return{ // возвращает те поля с состояием которые нам необходимы
      id: this._extractId(planet), // вызов функции для изменения id planet
      planetName: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter,
    }
  }
  _transformStarship = (starships) => {
    return {
      id: this._extractId(starships),
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
  _transformPerson = (person) => {
    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birthYear,
      eyeColor: person.eyeColor
    }
  }
}