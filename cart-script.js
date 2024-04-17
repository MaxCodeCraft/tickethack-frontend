function showCartItems() {
  fetch("https://tickethack-backend-lemon.vercel.app/carts")
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
        calculateTotal();
        purchaseAll();
      }

      let deleteButtons = document.querySelectorAll("#btn-delete");

      for (let j = 0; j < deleteButtons.length; j++) {
        deleteButtons[j].addEventListener("click", function () {
          const deletedId = {
            id: data.cartData[j]._id,
          };
          fetch("https://tickethack-backend-lemon.vercel.app/carts/delete", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(deletedId),
          })
            .then((r) => r.json())
            .then((data) => {
              showCartItems();
              calculateTotal();
              console.log(data);
            });
        });
      }
    });
}

showCartItems();

function calculateTotal() {
  let prices = document.querySelectorAll(".cart-price");
  let totalPrice = 0;
  for (let i = 0; i < prices.length; i++) {
    totalPrice += +prices[i].textContent;
  }
  document.querySelector(".cart-total-price").textContent = totalPrice;
}

function purchaseAll() {
  document
    .querySelector("#btn-purchase")
    .addEventListener("click", function () {
      fetch("https://tickethack-backend-lemon.vercel.app/carts")
        .then((r) => r.json())
        .then((data) => {
          for (let i = 0; i < data.cartData.length; i++) {
            const newBooking = {
              departure: data.cartData[i].departure,
              arrival: data.cartData[i].arrival,
              hour: data.cartData[i].hour,
              price: data.cartData[i].price,
            };
            fetch("https://tickethack-backend-lemon.vercel.app/bookings/add", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newBooking),
            })
              .then((r) => r.json())
              .then((data) => console.log(data));
          }
          fetch("https://tickethack-backend-lemon.vercel.app/carts/deleteall", {
            method: "DELETE",
          })
            .then((r) => r.json())
            .then((data) => {
              document.location = "./bookings.html";
              console.log(data);
            });
        });
    });
}
