

export default class SwapiService {

  _apiBase = `https://swapi.dev/api`;

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`error fetch ${url}`, res.status)
    }

    return await res.json();
  };

  getAllPeople = async () => {
    const res = await this.getResource(`/people/`);
    return res.results.map(this._transformPerson);
  };

  getPerson = async (id) => {
    const person = await this.getResource(`/people/${id}/`);
    return this._transformPerson(person);
  };

  getAllPlanets = async () => {
    const res = await this.getResource(`/planets/`);
    return res.results.map(this._transformPlanet);
  };

  getPlanet = async (id) => {
    const planet = await this.getResource(`/planets/${id}/`);
    return  this._transformPlanet(planet);
  };

  getAllSpecies = async () => {
    const res = await this.getResource(`/species/`);
    return res.results.map(this._transformSpecies);
  };

  getSpecies = async (id) => {
    const species = await this.getResource(`/species/${id}`);
    return this._transformSpecies(species);
  };

  getAllStarships = async () => {
    const res = await this.getResource(`/starships/`);
    return res.results.map(this._transformStarship);
  };

  getStarship = async (id) => {
    const starship = await this.getResource(`/starships/${id}/`);
    return this._transformStarship(starship);
  };

  getAllVehicles = async () => {
    const res = await this.getResource(`/vehicles/`);
    return res.results.map(this._transformVehicles);
  };

  getVehicles = async (id) => {
    const vehicles = await this.getResource(`/vehicles/${id}/`);
    return this._transformVehicles(vehicles);
  };

  _extractId = (item) => {
    const idRegExp = /\/(\d+)\/$/;
    return item.url.match(idRegExp)[1];   
  };

  _transformPlanet = (planet) => {
    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter,
      climate: planet.climate,
      gravity: planet.gravity
    }
  };

  _transformStarship = (starship) => {
    return {
      id: this._extractId(starship),
      name: starship.name,
      model: starship.model,
      costInCredits: starship.cost_in_credits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      maxAtmospheringSpeed: starship.max_atmosphering_speed,
      MGLT: starship.MGLT
    }
  };

  _transformPerson = (person) => {
    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      height: person.height,
      birthYear: person.birth_year,
      eyeColor: person.eye_color
    }
  };

  _transformVehicles = (vehicles) => {
    return {
      id: this._extractId(vehicles),
      name: vehicles.name,
      model: vehicles.model,
      length: vehicles.length,
      maxAtmospheringSpeed: vehicles.max_atmosphering_speed,
      crew: vehicles.crew,
      passengers: vehicles.passengers
    }
  };

  _transformSpecies = (species) => {
    return {
      id: this._extractId(species),
      name: species.name,
      classification: species.classification,
      height: species.average_height,
      lifespan: species.average_lifespan,
    }
  };
}