function showBookings() {
  fetch("http://localhost:3000/bookings/")
    .then((r) => r.json())
    .then((data) => {
      if (data.cartData.length != 0) {
        document.querySelector("#my-cart").innerHTML = `
          <div>
            <p class="cart">My cart</p>
          </div>
          <div id="cart-line-box"></div>
          <div id="total">
            <p class="text">Total : <span class="cart-total-price">0</span>€</p>
            <button id="btn-purchase" type="button">Purchase</button>
          </div>`;
      } else {
        document.querySelector("#my-cart").innerHTML = `
          <div id="empty-cart">
            <p class="no-ticket">No tickets in your cart.</p>
            <p>Why not plan a trip ?</p>
          </div>`;
      }
      for (let i = 0; i < data.cartData.length; i++) {
        document.querySelector("#cart-line-box").innerHTML += `
          <div class="trip cart-line">
            <p>
              <span class="cart-departure">${data.cartData[i].departure}</span> >
              <span class="cart-arrival">${data.cartData[i].arrival}</span>
            </p>
            <p class="cart-hour">${data.cartData[i].hour}</p>
            <p class="hidden">${data.cartData[i]._id}</p>
            <p><span class="cart-price">${data.cartData[i].price}</span>€</p>
            <button id="btn-delete" type="button">X</button>
          </div>`;
      }
    });
}

showBookings();
