function showCartItems() {
  document.querySelector("#my-cart").innerHTML += ``;
  fetch("http://localhost:3000/carts/").then((data) => {
    for (let i = 0; i < data.lenght; i++) {
      document.querySelector("#my-cart").innerHTML += ``;
    }
  });
}

showCartItems();
