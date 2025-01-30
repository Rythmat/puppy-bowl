//Stored API url for easy recall
const puppyAPI = 'https://fsa-puppy-bowl.herokuapp.com/api/2501-FTW-ET-WEB-FT/players'

//State object that holds the data that the page should be diplaying
const state = {
  players: []
}

//Function to fetch the puppy players and update our state object
const fetchPlayers = async() => {
  const api = await fetch(puppyAPI);
  const players = await api.json();
  state.players = players.data.players;
  console.log(state.players);
}

//Renders the puppy info onto the page
const renderPlayers = async() => {
  await fetchPlayers();
  const ul = document.querySelector('#pawster');
  state.players.forEach((player) => {
    const li = document.createElement('li');
    li.innerText = player.name + ' the ' + player.breed;
    ul.append(li);
  });
}

renderPlayers();