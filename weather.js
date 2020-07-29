const weather = document.querySelector(".js-weather");

const API_KEY = "265f7de47da699ff570cb2de0d3bdf14";
const COORDS = 'coords';

function getWeather(lat, lon){
  fetch(`api.openweathermap.org/data/2.5/weather?lat=${lat} & lon=${lon} & appid=${API_KEY}&units=metric`).then(function(response){
    return response.json();
  }).then(function(json){
    const temperature = json.main.temp;
    const place = json.name;
    weather.innerText = `${temperature} @ ${place}`;
  });
}



function saveCoords(coordsObj){
  localStorage.setItem(COORDS,JSON.coordsObj);

}

function handleGeoSuccess(position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError(){
  console.log("cant access geo location");
}



function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
  const loadedCords = localStorage.getItem(COORDS);
  if(loadedCords === null){
    askForCoords();
  } else{
    const parsedCoords = JSON.parse(loadedCords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }

}

function init(){
  loadCoords();
}

init();