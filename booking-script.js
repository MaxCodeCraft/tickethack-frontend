function showBookings() {
  fetch("https://tickethack-backend-lemon.vercel.app/bookings")
    .then((r) => r.json())
    .then((data) => {
      if (data.bookingData.length != 0) {
        document.querySelector("#my-booking").innerHTML = `
          <div>
            <p class="booking">My bookings</p>
          </div>
          <div id="booking-line-box"></div>
          <span class="border"></span>
          <p class="enjoy">Enjoy your travels with Tickethack!</p>`;
      } else {
        document.querySelector("#my-booking").innerHTML = `
        <div id="booking-line">
          <p class="no-booking">No booking yet</p>
          <p>Why not plan a trip?</p>
        </div>`;
      }
      for (let i = 0; i < data.bookingData.length; i++) {
        document.querySelector("#booking-line-box").innerHTML += `   
        <div class="trip">
          <p>
            <span class="booking-departure">${data.bookingData[i].departure}</span> >
            <span class="booking-arrival">${data.bookingData[i].arrival}</span>
          </p>
          <p class="booking-hour">${data.bookingData[i].hour}</p>
          <p class="booking-price">${data.bookingData[i].price}€</p>
          <p>Departure in <span class="count"></span> hours</p>
        </div>
        `;
        const departureHour = +data.bookingData[i].hour.split(":")[0];
        let actualDate = new Date();
        actualDate = actualDate.getHours();
        let timeLeft = departureHour - actualDate;
        document.querySelectorAll(".count")[i].textContent = timeLeft;
      }
    });
}

showBookings();
