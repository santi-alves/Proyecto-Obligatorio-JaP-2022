const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL =
  "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL =
  "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

const emercadoAPI = "https://japceibal.github.io/emercado-api/";
/* ----------------- Definicion de Variables ----------------- */
// --- No se usa mas ??? ---
//const navEmail = document.querySelector("#idNavEmail");
const navLogout = document.querySelector("#idLogout");

/* ----------------- Definicion de Funciones  ----------------- */
let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
};

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
};

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      hideSpinner();
      return result;
    });
};
/* ------------------------------- */

/* --------- Funcion que almacena id del producto en almacenamiento local --------- */
function setProductID(id) {
  localStorage.setItem("productID", id);
  window.location = "product-info.html";
}
/* ---------- */
/* --------- Funcion que almacena id de la categoria en almacenamiento local --------- */
function setCatID(id) {
  localStorage.setItem("catID", id);
  window.location = "products.html";
}
/* ---------- */

/* ------------- Funcion que muestra email del usuario guardado en localStorage ------------- */
function loadUserEmail(cssSlctr) {
  return (document.querySelector(cssSlctr).innerHTML =
    localStorage.getItem("userEmail"));
}
/* ---------------------------------- */

/* --- Elimina email de local storage TERMINAR --- */
/* const deleteUserEmail = (logOutBtn) => {
  logOutBtn.addEventListener("click" => {
    localStorage.removeItem("userEmail")
  })
} */
/* --- Fin Elimina email de local storage TERMINAR --- */

/* --- Verificacion inicio sesion ---- */
const logInCheck = () => {
  if (
    location.pathname != "/index.html" &&
    localStorage.getItem("userEmail") === null
  ) {
    location.pathname = "/index.html";
  }
  console.log("El usuario inició sesión correctamente");
};

/* document.onload = */ logInCheck();
/* --- fin Verificacion inicio sesion ---- */

/* --- search bar prevDef ---- */
document.addEventListener("DOMContentLoaded", () => {
  const navFormSearch = document.querySelector("#nav-form-search");
  const formsAll = document.querySelectorAll("form");
  formsAll.forEach((form) => {
    form.addEventListener("submit", (submit) => {
      submit.preventDefault();
    });
  });
});
/* --- fin search bar prevDef ---- */
