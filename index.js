//Stored API url for easy recall
const puppyAPI = 'https://fsa-puppy-bowl.herokuapp.com/api/2501-FTW-ET-WEB-FT/players'

//Stored main element from HTML
const main = document.querySelector('main');
//Stored header element from HTML
const header = document.querySelector('header');

//State object that holds the data that the page should be diplaying
const state = {
  players: [],
  details: {}
}


//Function to fetch the puppy players and update our state object
const fetchPlayers = async() => {
  //Setting the main and header's initial HTML
  header.innerHTML = `<h1><img src="images/bowl.png" style="height: 5vh;">WELCOME TO THE PUPPY BOWL!<img src="images/bowl.png" style="height: 5vh;"></h1>`
  main.innerHTML = `<h2>The Paw-ster:</h2>
      <p>Click for more details!</p>
      <ul id="pawster"></ul>`;

  //fetching the data and awaiting its response. Then awaiting the json() package pull
  const api = await fetch(puppyAPI);
  const players = await api.json();

  //loading the data into the state
  state.players = players.data.players;
}

//Renders the puppy info onto the page
const renderPlayers = async() => {
  //calls fetch function to load data into state
  await fetchPlayers();

  //grabs the unordered list element to prepare to fill
  const ul = document.querySelector('#pawster');

  //For each player in our state...
  state.players.forEach((player) => {
    //create a new list item element
    const li = document.createElement('li');

    //fill the element with the players name and breed
    li.innerText = player.name + ' the ' + player.breed;

    //adding an event listener to display details
    li.addEventListener('click', (event) => {
      state.details = player;
      renderDetails();
    });

    //append the element to the unordered list
    ul.append(li);

  });
}


const renderDetails = async() => {
  //Changing the header and main's htmls to display details
  header.innerHTML = `<h1>Puppy Details</h1>`
  const detailsHTML = `
    <h2 style="display: flex; justify-content: center;">${state.details.name}</h2>
    <h3 style="display: flex; justify-content: center; margin-top: 0;"> The ${state.details.breed}</h3>
    <img src="${state.details.imageUrl}" style="height: 50vh; display: block; margin-left: auto; margin-right: auto;">
    <p style="display: flex; justify-content: center;"> Current play status: On the ${state.details.status} </p>
  `
  main.innerHTML = detailsHTML;
  const button = document.createElement('button');
  button.innerText = 'Back';
  button.addEventListener('click', () => {
    renderPlayers();
  });

  main.append(button);
}


renderPlayers();