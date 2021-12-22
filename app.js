const endpoint =
  "https://raw.githubusercontent.com/fahimxyz/bangladesh-geojson/master/bd-districts.json";

let cities = [];

fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => (cities = data.districts));

function findMatches(wordToMatch, cities) {
  return cities.filter((place) => {
    const regex = new RegExp(wordToMatch, "gi");

    return place.name.match(regex);
  });
}

const searchInput = document.querySelector(".search");
const suggation = document.querySelector(".city-list");

function displayMatches() {
  const mathcArray = findMatches(this.value, cities);
  const html = mathcArray
    .map((place) => {
      const divId = place.division_id;

      let div = " ";
      switch (divId) {
        case "1":
          div = "Barishal";
          break;
        case "2":
          div = "Chattogram";
          break;
        case "3":
          div = "Dhaka";
          break;
        case "4":
          div = "Khulna";
          break;
        case "5":
          div = "Rajshahi";
          break;
        case "6":
          div = "Rangpur";
          break;
        case "7":
          div = "Sylhet";
          break;
        case "8":
          div = "Mymensing";
      }

      return `<li class="city-list-item">
          <span class="city-name">${place.name}</span
          ><span class="city-divition">${div}</span>
        </li>`;
    })
    .join("");
  suggation.innerHTML = html;
}

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
