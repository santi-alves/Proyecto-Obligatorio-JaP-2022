let objProductInfo = {};
let arrProductComments = [];
let objProductInfoRelatedExtra;
let averageScore = 0;
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
/* ------ Funcion que genera el contenido para cada producto ------ */
function showProductInfo() {
  let mainHTMLProductInfo = "";
  let productImages = "";
  let productImagesCarouselIndicator = "";
  /* ---- Deberia ser un string o un array ???? --- */
  let productsRel = "";
  /* -------- */

  const containerProductDetails = document.querySelector(
    "[data-id='container-product-details']"
  );
  const carouselIndicatorsContainer = document.querySelector(
    "#carousel-indicators-container"
  );
  const carouselImagesContainer = document.querySelector(
    "#carousel-images-container"
  );
  const productDetailsTitle = document.querySelector("#product-details-title");
  const productSoldCount = document.querySelector("#product-sold-count");
  const productDescription = document.querySelector("#product-description");
  const containerRelatedProducts = document.querySelector(
    "#container-related-products"
  );

  /* ------ Loop Carousel Imagenes ------ */
  for (let index = 0; index < objProductInfo.images.length; index++) {
    if (index === 0) {
      productImages += `<div class="carousel-item active">
            <img src="${objProductInfo.images[index]}" class="d-block w-100" alt="Imagen de ${objProductInfo.name}-${index}">
          </div>`;

      productImagesCarouselIndicator += `<button type="button" data-bs-target="#carousel-product-images-container" data-bs-slide-to="${index}" class="active"
  aria-current="true" aria-label="Slide ${index + 1}"></button>`;
    } else {
      productImages += `<div class="carousel-item">
  <img src="${objProductInfo.images[index]}" class="d-block w-100" alt="Imagen de ${objProductInfo.name}-${index}">
</div>`;

      productImagesCarouselIndicator += `<button type="button" data-bs-target="#carousel-product-images-container" data-bs-slide-to="${index}"
      aria-label="Slide ${index + 1}"></button>`;
    }
  }
  /* ------ Fin Loop Carousel Imagenes ------ */

  /* ----- Productos relacionados card Plantilla Categories ----- */
  for (let index = 0; index < objProductInfo.relatedProducts.length; index++) {
    productsRel += `<div id="related-product-card-${index}" data-product-id="${objProductInfo.relatedProducts[index].id}" onclick="setProductID(${objProductInfo.relatedProducts[index].id})" class="col-md-3">
            <div class="card mb-2 shadow-sm custom-card cursor-active min-height-100 rounded-borders py-2">
            <div class="card-header"></div>
              <img class="bd-placeholder-img card-img-top" src="${objProductInfo.relatedProducts[index].image}"
                alt="Imagen de ${objProductInfo.relatedProducts[index].name}-${index}">
              <h3 class="mx-3 my-0">${objProductInfo.relatedProducts[index].name} - ${objProductInfoRelatedExtra.currency} ${objProductInfoRelatedExtra.cost}</h3>
              
              <div class="card-body py-0">
              <!-- -------- Estrellas Calificacion Promedio (Falta implementar calculo promedio, Agregar a una funcion) -------- -->      
              <div tabindex="0" data-average-user-score="" class="average-stars-container d-inline" data-bs-trigger="hover" data-bs-placement="auto"
              data-bs-toggle="popover" data-bs-trigger="focus" title=""
              data-bs-content="Calificación promedio del producto según otros usuarios">
                <span class="star-item-1 fa fa-star checked"></span>
                <span class="star-item-2 fa fa-star checked"></span>
                <span class="star-item-3 fa fa-star checked"></span>
                <span class="star-item-4 fa fa-star checked"></span>
                <span class="star-item-5 fa fa-star unchecked"></span>
             </div>
         <!-- -------- Fin Estrellas Calificacion Promedio -------- -->
                <p class="card-text">${objProductInfoRelatedExtra.description}</p>
              </div>
            </div>
            </div>`;
    /* ----- Fin Productos relacionados card Plantilla Categories ----- */
  }

  containerProductDetails.setAttribute("id", objProductInfo.id);
  carouselIndicatorsContainer.innerHTML = productImagesCarouselIndicator;
  carouselImagesContainer.innerHTML = productImages;
  productDetailsTitle.innerHTML +=
    objProductInfo.name +
    " - " +
    objProductInfo.currency +
    " " +
    objProductInfo.cost;
  productDescription.innerHTML = objProductInfo.description;
  productSoldCount.innerHTML = objProductInfo.soldCount + " vendidos";
  containerRelatedProducts.innerHTML += productsRel;

  document.getElementById("main-container").innerHTML += mainHTMLProductInfo;
}
/* ------ Fin Funcion que genera el contenido para cada producto ------ */

/* --------- Carga de la página ---------- */
document.addEventListener("DOMContentLoaded", function (e) {
  //const categoryTitle = document.querySelector("#categoryTitle");
  // const mainContainer = document.querySelector("#main-container");
  const navSearch = document.querySelector("#nav-search");

  /* ------- Fetch Info adicional para Productos relacionados (Falta volver dinamico el id del producto) ------- */
  getJSONData(
    PRODUCT_INFO_URL +
      /* document.querySelector(
        "[data-product-id]"
      ) */ 50741 /*localStorage.getItem("productID") */ +
      EXT_TYPE
  ).then(function (resultObjProductInfoRelatedExtra) {
    if (resultObjProductInfoRelatedExtra.status === "ok") {
      objProductInfoRelatedExtra = resultObjProductInfoRelatedExtra.data;
    }
  });
  /* ------- Fin Fetch Info adicional para Productos relacionados ------- */

  /* ----- Fetch Product Info Plantilla Categories ---- */
  /* ----------- Llamado a la funcion que genera el contenido a partir de la respuesta que devuelve fetch a la URL general de productos mas el id de la categoria almacenado en localStorage y la extension .json----------- */
  getJSONData(
    PRODUCT_INFO_URL + localStorage.getItem("productID") + EXT_TYPE
  ).then(function (resultObjProductInfo) {
    if (resultObjProductInfo.status === "ok") {
      objProductInfo = resultObjProductInfo.data;
      showProductInfo();
      const categoryBreadcrumbs = document.querySelector(
        "#category-breadcrumbs"
      );
      const productNameBreadcrumbs = document.querySelector(
        "#product-name-breadcrumbs"
      );
      categoryBreadcrumbs.innerHTML = objProductInfo.category;
      productNameBreadcrumbs.innerHTML = objProductInfo.name;
    }
  });
  /* ---------- Fin Fetch Product Info Plantilla Categories ------------ */

  /* ----- Definicion Funcion que genera los comentarios de otros usuarios ------ */
  function getProductComments() {
    let productComments = "";
    let totalScore = 0;
    let commentsAmount = 0;
    for (let index = 0; index < arrProductComments.length; index++) {
      /* --- calcular promedio calificacion (continuar) --- */
      //totalScore += arrProductComments[index].score;
      //commentsAmount++;
      /* --- fin calcular promedio calificacion (continuar) --- */

      productComments += `<div class="list-group-item border-0 border-start border-5 border-start-light-indigo mb-2">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">${arrProductComments[index].user}</h5>
        <small class="text-muted">${arrProductComments[index].dateTime}</small>
      </div>
      <!-- -------- Estrellas Calificacion Comentarios de otros usuarios -------- -->      
      <div data-other-user-score="${arrProductComments[index].score}" class="star-container">
           <span class="star-item-1 fa fa-star"></span>
           <span class="star-item-2 fa fa-star"></span>
           <span class="star-item-3 fa fa-star"></span>
           <span class="star-item-4 fa fa-star"></span>
           <span class="star-item-5 fa fa-star"></span>
         </div>
         <!-- ${totalScore} ELIMINAR -->
           <!-- -------- Fin Estrellas Calificacion Comentarios de otros usuarios -------- -->
      <p class="mb-1">${arrProductComments[index].description}</p>
    </div>`;
    }
    /* --- calcular promedio calificacion (continuar) --- */
    //averageScore = totalScore / commentsAmount;
    // console.log(totalScore + " \\ " + commentsAmount + " : " + averageScore);
    /* --- fin calcular promedio calificacion (continuar) --- */
    return productComments;
  }
  /* ----- Fin Definicion Funcion que genera los comentarios de otros usuarios ------ */

  /* -------- Fetch comentarios del producto ------- */
  getJSONData(
    PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("productID") + EXT_TYPE
  ).then(function (resultObjProductComments) {
    if (resultObjProductComments.status === "ok") {
      arrProductComments = resultObjProductComments.data;
      const commentsContainer = document.querySelector("#comments-container");
      commentsContainer.innerHTML += getProductComments();
      const ndListStarsContainer = document.querySelectorAll(".star-container");
      function commentStars() {
        /* ---- Bucle estrellas puntuacion otros usuarios --- */
        for (let index = 0; index < arrProductComments.length; index++) {
          for (
            let j = 0;
            j < ndListStarsContainer[index].children.length;
            j++
          ) {
            if (j < arrProductComments[index].score) {
              ndListStarsContainer[index].children[j].classList.add("checked");
            } else {
              ndListStarsContainer[index].children[j].classList.add(
                "unchecked"
              );
            }
          }
        }
      }
      /* ---- Fin Bucle estrellas puntuacion otros usuarios ---- */

      /* --- Funcion que genera estrellas para cada comentario de otros usuarios --- */
      commentStars();
      //console.log("+++" + averageScore);
      /* ------ */

      /* ------- Formulario comentarios ------- */
      const btnComment = document.querySelector("#btn-comment");
      btnComment.addEventListener("click", () => {
        const txtComment = document.querySelector("#txt-comment");
        const slctScore = document.querySelector("#slct-score");
        const frmComment = document.querySelector("#frm-comment");
        const commentDateTime = new Date();
        // const starsContainer = document.querySelectorAll("[data-id=star-container-select]");

        if (!frmComment.checkValidity()) {
          frmComment.classList.add("was-validated");
        } else {
          commentsContainer.innerHTML +=
            /* --- Realizar Comentario Bs --- */
            `<div class="list-group-item border-0 border-start border-5 border-orange mb-2" data-id="star-container-select">
           <div class="d-flex w-100 justify-content-between">
             <h5 class="mb-1"><a class="text-indigo text-decoration-none" href="#">${localStorage.getItem(
               "userEmail"
             )}</a></h5>
             <small class="text-muted">${
               commentDateTime.getFullYear() +
               "-" +
               (commentDateTime.getMonth() + 1) +
               "-" +
               commentDateTime.getDate() +
               " " +
               commentDateTime.getHours() +
               ":" +
               commentDateTime.getMinutes() +
               ":" +
               commentDateTime.getSeconds()
             }</small>
           </div>
           <!-- -------- Estrellas Select Commentarios -------- -->      
           <div data-user-score="${slctScore.value}" class="star-container">
                <span class="star-item-1 fa fa-star"></span>
                <span class="star-item-2 fa fa-star"></span>
                <span class="star-item-3 fa fa-star"></span>
                <span class="star-item-4 fa fa-star"></span>
                <span class="star-item-5 fa fa-star"></span>
              </div>
                <!-- -------- Fin Estrellas Select Commentarios -------- -->
           <p class="mb-1">${txtComment.value}</p>
         </div>`;
          /* --- fin Realizar Comentario Bs --- */

          slctScore.value = "";
          txtComment.value = "";
          frmComment.classList.remove("was-validated");

          for (
            let index = 0;
            index < commentsContainer.children.length;
            index++
          ) {
            /* ---- Bucleo Estrellas Comentario Propio 01 --- */
            for (let i = 0; i < ndListStarsContainer[0].children.length; i++) {
              if (
                i <
                parseInt(
                  document.querySelectorAll("[data-user-score]")[0]
                    .attributes[0].value
                )
              ) {
                document
                  .querySelectorAll("[data-user-score]")[0]
                  .children[i].classList.add("checked");
              } else {
                document
                  .querySelectorAll("[data-user-score]")[0]
                  .children[i].classList.add("unchecked");
              }
            }
            /* ---- Fin Bucle Estrellas Comentario Propio 01 --- */
          }
        }
      });
      /* ------- Fin Formulario comentarios ------- */
    }
  });
  /* -------- Fin Fetch comentarios del producto ------- */

  /* ------------- Muestra email del usuario guardado en localStorage ------------- */
  loadUserEmail("#navbar-dropdown-user");
  /* ------------ */

  /* ------- Bootstrap Popovers Inicializador (En desuso) ------- */
  var popoverTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="popover"]')
  );
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });
  /* ------- Fin Bootstrap Popovers Inicializador ------- */
});
