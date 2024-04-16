// Affiche l'image et le texte de base dans l'ID results

document.querySelector("#results").innerHTML = `
        <img id="results-img" src="./assets/train.png" alt="train" />
        <p>It's time to book your future trip.</p>`;

// Fonction de recherche de trajets

function searchTrip(departure, arrival, date) {
  const searchRequest = {
    departure: departure,
    arrival: arrival,
    date: date,
  };
  fetch("http://localhost:3000/trips/find", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(searchRequest),
  })
    .then((r) => r.json())
    .then((data) => console.log(data));
}

// Event qui lance la fonction searchTrip lorque l'on clique sur le boutton

document.querySelector("#btn-search").addEventListener("click", function () {
  let departure = document.querySelector("#departure").value;
  let arrival = document.querySelector("#arrival").value;
  let date = document.querySelector("#trip-date").value;
  console.log(departure, arrival, date);
  //   searchTrip(departure, arrival, date);
});

// Affiche une image et un text lorsqu'il n'y a pas de résultat de la recherche

function tripNotFound() {
  document.querySelector("#results").innerHTML = `
        <img id="results-img" src="./assets/notfound.png" alt="trip not found" />
        <p>No Trip found.</p>`;
}
