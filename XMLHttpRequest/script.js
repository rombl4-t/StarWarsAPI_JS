let starshipData = document.querySelector(".starship_data");
let planetData = document.querySelector(".planet_data");
let personData = document.querySelector(".person_data");
let personSearchInput = document.querySelector("#person_search_input");
let searchResults = document.querySelector(".search_result");
let searchRequestBtn = document.querySelector("#search_request_btn");
let selector = document.querySelector("#selector");
let searchForm = document.querySelector(".search_form");
let savedResults = [];

starshipData.style.display = "none";
planetData.style.display = "none";

searchForm.addEventListener("submit", search);

function search(event) {
  event.preventDefault();
  if (searchResults.querySelectorAll("li").length !== 0) {
    searchResults.querySelectorAll("li").forEach((item) => {
      item.remove();
    });
  }
  let api = "https://swapi.dev/api/";
  let searchRequest = document.querySelector("#person_search_input").value;

  let url =
    api +
    selector.options[selector.selectedIndex].value +
    "/?search=" +
    searchRequest;

  let request = new XMLHttpRequest();

  request.addEventListener("load", function () {
    var response = JSON.parse(request.response);
    console.log(response);

    if (request.status !== 200) {
      alert(
        "Произошла ошибка при получении ответа от сервера:\n\n" +
          response.message
      );
      return;
    }

    if (response.count == 0) {
      alert("К сожалению, данные не получены по запросу: " + url);
      return;
    }

    alert("Найдено персонажей:" + response.results.length);

    savedResults = response;
    let i = 0;
    response.results.forEach((item) => {
      let searchItem = document.createElement("li");
      searchItem.innerText = item.name;
      searchItem.setAttribute("index", i++);
      searchResults.append(searchItem);
    });
  });

  request.open("get", url);
  request.send();
}

searchResults.addEventListener("click", function (event) {
  let target = event.target;
  let itemIndex = target.getAttribute("index");
  let personName = document.querySelector("#persom_name");
  let height = document.querySelector("#height");
  let mass = document.querySelector("#mass");
  let birthEar = document.querySelector("#birth_year");
  let filmsCount = document.querySelector("#films_count");
  let starshipName = document.querySelector("#starship_name");
  let starshipClass = document.querySelector("#starship_class");
  let manufacturer = document.querySelector("#manufacturer");
  let created = document.querySelector("#created");
  let cargoCapacity = document.querySelector("#cargo_capacity");
  let starshipFilmsCount = document.querySelector("#starship_films_count");
  let planetName = document.querySelector("#planet_name");
  let climate = document.querySelector("#climate");
  let diameter = document.querySelector("#diameter");
  let population = document.querySelector("#population");
  let planetFilmsCount = document.querySelector("#planet_films_count");

  if (savedResults.results[itemIndex].eye_color) {
    personName.innerText = savedResults.results[itemIndex].name;
    height.innerText = savedResults.results[itemIndex].height;
    mass.innerText = savedResults.results[itemIndex].mass;
    birthEar.innerText = savedResults.results[itemIndex].birth_year;
    filmsCount.innerText = savedResults.results[itemIndex].films.length;
  }

  if (savedResults.results[itemIndex].starship_class) {
    starshipName.innerText = savedResults.results[itemIndex].name;
    starshipClass.innerText = savedResults.results[itemIndex].starship_class;
    manufacturer.innerText = savedResults.results[itemIndex].manufacturer;
    created.innerText = savedResults.results[itemIndex].created;
    cargoCapacity.innerText = savedResults.results[itemIndex].cargo_capacity;
    starshipFilmsCount.innerText = savedResults.results[itemIndex].films.length;
  }

  if (savedResults.results[itemIndex].terrain) {
    planetName.innerText = savedResults.results[itemIndex].name;
    climate.innerText = savedResults.results[itemIndex].climate;
    diameter.innerText = savedResults.results[itemIndex].diameter;
    population.innerText = savedResults.results[itemIndex].population;
    planetFilmsCount.innerText = savedResults.results[itemIndex].films.length;
  }
});

selector.addEventListener("change", function () {
  personSearchInput.value = "";
  document.querySelectorAll("span").forEach((item) => {
    item.innerText = "";
  });
  searchResults.querySelectorAll("li").forEach((item) => {
    item.remove();
  });
  let selectedOption = selector.options[selector.selectedIndex].value;
  switch (selectedOption) {
    case "people":
      starshipData.style.display = "none";
      planetData.style.display = "none";
      personData.style.display = "block";
      break;
    case "starships":
      personData.style.display = "none";
      planetData.style.display = "none";
      starshipData.style.display = "block";
      break;
    case "planets":
      personData.style.display = "none";
      starshipData.style.display = "none";
      planetData.style.display = "block";
      break;
  }
});
