const totalQuantity = document.querySelector("#totalQuantity");

const totalPrice = document.querySelector("#totalPrice");

async function fetchProduct() {
  return await fetch(`http://localhost:3000/api/products`)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (product) {
      return product;
    })
    .catch(function (error) {
      console.error(error);
    });
}

function generateCart(arrayCart) {
  for (let index = 0; index < arrayCart.length; index++) {
    const sectionCartItem = document.querySelector("#cart__items");

    const article = document.createElement("article");
    article.classList.add("cart__item");
    article.setAttribute("data-id", arrayCart[index].productId);
    article.setAttribute("data-color", arrayCart[index].color);
    sectionCartItem.appendChild(article);

    const divImg = document.createElement("div");
    divImg.classList.add("cart__item__img");
    article.appendChild(divImg);

    const img = document.createElement("img");
    img.src = arrayCart[index].imageUrl;
    img.alt = arrayCart[index].altTxt;
    divImg.appendChild(img);

    const divItemContent = document.createElement("div");
    divItemContent.classList.add("cart__item__content");

    article.appendChild(divItemContent);

    const divItemContentDescription = document.createElement("div");
    divItemContentDescription.classList.add("cart__item__content__description");
    divItemContent.appendChild(divItemContentDescription);

    const title = document.createElement("h2");
    title.innerHTML = arrayCart[index].name;
    divItemContentDescription.appendChild(title);

    const color = document.createElement("p");
    color.innerHTML = arrayCart[index].color;
    divItemContentDescription.appendChild(color);

    const price = document.createElement("p");
    price.innerHTML = arrayCart[index].price + " €";
    divItemContentDescription.appendChild(price);

    const divSettings = document.createElement("div");
    divSettings.classList.add("cart__item__content__settings");
    divItemContent.appendChild(divSettings);

    const divQuantity = document.createElement("div");
    divQuantity.classList.add("cart__item__content__settings__quantity");
    divSettings.appendChild(divQuantity);

    const pQuantity = document.createElement("p");
    pQuantity.innerHTML = "Qté : ";
    divQuantity.appendChild(pQuantity);

    const input = document.createElement("input");

    input.setAttribute("type", "number");
    input.classList.add("itemQuantity");
    input.setAttribute("name", "itemQuantity");
    input.setAttribute("min", "1");
    input.setAttribute("max", "100");
    input.setAttribute("value", arrayCart[index].quantity);
    divQuantity.appendChild(input);

    const divSettingsDelete = document.createElement("div");
    divSettingsDelete.classList.add("cart__item__content__settings__delete");
    divSettings.appendChild(divSettingsDelete);

    const pDeleteItem = document.createElement("p");
    pDeleteItem.classList.add("deleteItem");
    pDeleteItem.innerHTML = "Supprimer";
    divSettingsDelete.appendChild(pDeleteItem);
  }
}
function calcTotalPrice(arrayCart) {
  let totalPrice = 0;
  for (let index = 0; index < arrayCart.length; index++) {
    totalPrice += Number(arrayCart[index].quantity * arrayCart[index].price);
  }
  return totalPrice;
}
function calcTotalQuantity(arrayCart) {
  let totalQuantity = 0;
  for (let index = 0; index < arrayCart.length; index++) {
    totalQuantity += Number(arrayCart[index].quantity);
  }
  return totalQuantity;
}
function addProductQuantity(productInCart) {
  let buttonQuantity = document.querySelector(".itemQuantity");
  buttonQuantity.addEventListener("Change", function () {
    if (productInCart.productId && productInCart.color) {
      productInCart.quantity += Number(buttonQuantity.value.quantity) + Number(productInCart.quantity);

      return localStorage.setItem("productCart", JSON.stringify(productsInCart));
    }
  });
}
function removeProduct() {
  let buttonRemove = document.querySelector(".deleteItem");
  buttonRemove.addEventListener("Click", function () {
    buttonRemove.closest();
  });
}
async function main() {
  let productsInCart = JSON.parse(localStorage.getItem("productCart") || "[]");

  const products = await fetchProduct();
  let filteredProducts = [];
  productsInCart.forEach(function (productInCart) {
    products.forEach(function (product) {
      if (productInCart.productId === product._id) {
        filteredProducts.push({
          productId: productInCart.productId,
          name: product.name,
          imageUrl: product.imageUrl,
          altTxt: product.altTxt,
          price: product.price,
          color: productInCart.color,
          quantity: productInCart.quantity,
        });
      }
    });
  });

  generateCart(filteredProducts);

  totalPrice.innerHTML = calcTotalPrice(filteredProducts);
  totalQuantity.innerHTML = calcTotalQuantity(filteredProducts);
}
main();
