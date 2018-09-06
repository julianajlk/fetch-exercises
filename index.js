const body = document.querySelector('body')
const peopleContainer = document.createElement('div')
peopleContainer.classList.add('people-container')
body.appendChild(peopleContainer)

document.addEventListener('DOMContentLoaded', function() {
  fetchOneStarWars()
  // createPlanetForm()
  submitEventListener()
  fetchC()
  fetchR()
})

function fetchOneStarWars() {
  fetch(`https://swapi.co/api/films/1/`)
  .then(response => response.json())
  .then(oneData => {
    renderOneFilm(oneData)
  })
}

//1.Star Wars Episode 4 (Film #1)
function renderOneFilm(oneData) {
  // debugger
  let container = document.createElement('div')
  container.classList.add('one-container')
  let h2 = document.createElement('h2')
  h2.innerText = 'Star Wars Episode 4 (Film #1)'
  let h4 = document.createElement('h4')
  h4.innerText = `Title: ${oneData.title}`
  let pElement = document.createElement('p')
  let oneButton = document.createElement('button')
  oneButton.innerText = 'Opening Crawl'
  oneButton.addEventListener('click', function() {
    pElement.innerText = oneData.opening_crawl
    }
  )

  body.appendChild(container)
  container.appendChild(h2)
  container.appendChild(h4)
  container.appendChild(oneButton)
  container.appendChild(pElement)
}


//2. Star Wars Planets
//Add a number input that takes in a number (only the numbers 1 through 60 are valid planet ids, so think about some way of validating the number)
function submitEventListener() {
  createPlanetForm()
  document.querySelector('#planet-form').addEventListener('submit', handlePlanetForm)
}
function createPlanetForm() {
  let planetContainer = document.createElement('div')
  planetContainer.classList.add('planet-container')
  let form = document.createElement('form')
  form.id = 'planet-form'
  let h2Element = document.createElement('h2')
  h2Element.innerText = 'Star War Planets'
  let h4Element = document.createElement('h4')
  h4Element.innerText = 'Select a Number:'
  let inputNumber = document.createElement('input')
  inputNumber.setAttribute('type', 'number')
  inputNumber.min = 1
  inputNumber.max = 60
  let inputSubmit = document.createElement('input')
  inputSubmit.setAttribute('type', 'submit')

  body.appendChild(planetContainer)
  planetContainer.appendChild(h2Element)
  planetContainer.appendChild(h4Element)
  planetContainer.appendChild(form)
  form.appendChild(inputNumber)
  form.appendChild(inputSubmit)
}

//**********LOOK OVER THIS AGAIN
function handlePlanetForm() {
  event.preventDefault()
  //get the input typed in the form
  let inputNumber = event.target.firstElementChild.value
  let inputNumberId = parseInt(inputNumber)
  fetchPlanets(inputNumberId)
  event.currentTarget.reset()
}
//Fetch that planet's data from the correct url
function fetchPlanets(inputNumberId) {
  fetch(`https://swapi.co/api/planets/${inputNumberId}/`)
  .then(response => response.json())
  .then(planet => {
    renderPlanets(planet)
  })
}

//Show the name and climate of the planet on the screen
function renderPlanets(planet) {
  let name = document.createElement('h4')
  name.innerText = `Name: ${planet.name}`
  let climate = document.createElement('h4')
  climate.innerText = `Climate: ${planet.climate}`

  document.querySelector('.planet-container').appendChild(name)
  document.querySelector('.planet-container').appendChild(climate)
}


//3. Droids
//When the page loads, fetch the data for C-3P0 (id: 2) and R2-D2 (id: 3)
function fetchC() {
  fetch(`https://swapi.co/api/people/2/`)
  .then(response => response.json())
  .then(cData => {
    renderC(cData)
  })
}

function fetchR() {
  fetch(`https://swapi.co/api/people/3/`)
  .then(response => response.json())
  .then(rData => {
    renderR(rData)
  })
}

//Show each droid's name, height, and mass on the screen
function renderC(cData) {
  let h2 = document.createElement('h2')
  h2.innerText = 'People'
  let name = document.createElement('h4')
  name.innerText = `Name: ${cData.name}`
  let height = document.createElement('h4')
  height.innerText = `Height: ${cData.height}`
  let mass = document.createElement('h4')
  mass.innerText = `Mass: ${cData.mass}`
  let peopleButton = document.createElement('button')
  peopleButton.innerText = 'Show Homeworld Details'
  peopleButton.dataset.id = cData.homeworld.split('/')[5]
  peopleButton.addEventListener('click', function() {
    fetchPlanetFromPeople()
  })

  peopleContainer.appendChild(h2)
  peopleContainer.appendChild(name)
  peopleContainer.appendChild(height)
  peopleContainer.appendChild(mass)
  peopleContainer.appendChild(peopleButton)
}

function renderR(rData) {
  let h2 = document.createElement('h2')
  let name = document.createElement('h4')
  name.innerText = `Name: ${rData.name}`
  let height = document.createElement('h4')
  height.innerText = `Height: ${rData.height}`
  let mass = document.createElement('h4')
  mass.innerText = `Mass: ${rData.mass}`
  let peopleButton = document.createElement('button')
  peopleButton.innerText = 'Show Homeworld Details'
  peopleButton.dataset.id = rData.homeworld.split('/')[5]
  peopleButton.addEventListener('click', function() {
    fetchPlanetFromPeople()
  })
  peopleContainer.appendChild(h2)
  peopleContainer.appendChild(name)
  peopleContainer.appendChild(height)
  peopleContainer.appendChild(mass)
  peopleContainer.appendChild(peopleButton)
}

function fetchPlanetFromPeople() {
  // debugger
  let planetId = parseInt(event.currentTarget.dataset.id)
  fetch(`https://swapi.co/api/planets/${planetId}/`)
  .then(response => response.json())
  .then(planet => {
    renderPlanets(planet)
  })
}
