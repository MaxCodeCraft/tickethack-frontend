// Event qui lance la fonction searchTrip lorque l'on clique sur le boutton

document.querySelector("#btn-search").addEventListener("click", function () {
  let departure = document.querySelector("#departure").value;
  let arrival = document.querySelector("#arrival").value;
  let date = document.querySelector("#trip-date").value;

  searchTrip(departure, arrival, date);
});

// searchTrip; fonction de recherche de trajets

function searchTrip(departure, arrival, date) {
  const searchRequest = {
    departure: departure,
    arrival: arrival,
    date: date,
  };
  fetch("http://localhost:3000/trips/find", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(searchRequest),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.results.length === 0) {
        // Affiche une image et un text lorsqu'il n'y a pas de résultat de la recherche
        document.querySelector("#results").innerHTML = `
         <img id="results-img" src="./assets/notfound.png" alt="trip not found" />
         <p>No Trip found.</p>`;
      } else {
        document.querySelector("#results").innerHTML = ``;
        for (let i = 0; i < data.results.length; i++) {
          document.querySelector("#results").innerHTML += `
          <div class="trip">
            <p>
              <span class="departure">${data.results[i].departure}</span> >
              <span class="arrival">${data.results[i].arrival}</span>
            </p>
            <p class="hour">${data.results[i].date.slice(11, 16)}</p>
            <p class="price">${data.results[i].price}€</p>
            <button class="btn-book" type="button">Book</button>
          </div>`;
        }
        const tripResults = document.querySelectorAll(".btn-book");
        for (let i = 0; i < tripResults.length; i++) {
          tripResults[i].addEventListener("click", function () {
            const newTrip = {
              departure: document.querySelectorAll(".departure")[i].textContent,
              arrival: document.querySelectorAll(".arrival")[i].textContent,
              hour: document.querySelectorAll(".hour")[i].textContent,
              price: document
                .querySelectorAll(".price")
                [i].textContent.split("€")[0],
            };
            fetch("http://localhost:3000/carts/add", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newTrip),
            })
              .then((response) => response.json())
              .then((data) => console.log(data));
          });
        }
      }
    });
}

// Affiche l'image et le texte de base dans l'ID results

document.querySelector("#results").innerHTML = `
        <img id="results-img" src="./assets/train.png" alt="train" />
        <p>It's time to book your future trip.</p>`;
