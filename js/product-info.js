let objProductInfo = {};
let arrProductComments = [];
let objProductInfoRelatedExtra;
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
            <div class="card mb-4 shadow-sm custom-card cursor-active">
              <img class="bd-placeholder-img card-img-top" src="${objProductInfo.relatedProducts[index].image}"
                alt="Imagen de ${objProductInfo.relatedProducts[index].name}-${index}">
              <h3 class="mx-3 my-0">${objProductInfo.relatedProducts[index].name} - ${objProductInfoRelatedExtra.currency} ${objProductInfoRelatedExtra.cost}</h3>
              
              <div class="card-body py-0">
              <!-- -------- Estrellas Calificacion Promedio (Falta implementar calculo promedio) -------- -->      
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

  /* ----- Contenido principal; detalles de los productos ----- */
  mainHTMLProductInfo = `<div class="container">
  <div class="row">
    <div id="${objProductInfo.id}">
    <!-- ----------- Product Info ---------- -->
      <div class="row">
<!-- ----------- Bootstrap Carousel ------------ -->
 <div id="carousel-product-images-container" class="col col-8 carousel slide my-3" data-bs-ride="carousel" data-wrap="true">
<div id="carousel-indicators-container" class="carousel-indicators">
${productImagesCarouselIndicator}
</div>
<div id="carousel-images-container" class="carousel-inner">
 ${productImages} 
</div>
<button class="carousel-control-prev" type="button" data-bs-target="#carousel-product-images-container"
  data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Anterior</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carousel-product-images-container"
  data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Siguiente</span>
</button>
</div> 
<!-- ----------- Fin Bootstrap Carousel ------------ -->

<!-- ---- Bootstrap Card Product Info ---- -->
<div class="col"> 
<div class="card my-3">
  <div class="card-body">
    <h1 class="card-title display-6">${objProductInfo.name} - ${objProductInfo.currency} ${objProductInfo.cost}</h1>
    
    <!-- -------- Estrellas Calificacion Promedio (Falta implementar funcionalidad) -------- -->      
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

    <small class="text-muted d-block">${objProductInfo.soldCount} vendidos</small>
    <p class="card-text">${objProductInfo.description}</p>
    <div class="d-grid gap-2">
  <button class="btn bg-indigo text-orange rounded-pill" type="button"><strong>Comprar ahora</strong></button>
  <button class="btn rounded-pill btn-outline-danger" type="button">Añadir al carrito</button>
</div>
  </div>
</div>
</div>
<!-- ---- Fin Bootstrap Card Product Info ---- -->
</div>
<!-- ----------- Fin Product Info ---------- -->

<!-- ----- Productos relacionados card plantilla categories ----- -->
    <div class="album py-5">
      <div id="related-products-container" class="row row-cols-2 justify-content-center">
        <h3 class="w-100" >Productos relacionados</h3>
        ${productsRel} 
      </div>
          </div>
<!-- ----- Fin Productos relacionados card plantilla categories ----- -->

 </div>
  </div>
  </div>`;
  /* ----- Fin Contenido principal; detalles de los productos ----- */

  document.getElementById("main-container").innerHTML = mainHTMLProductInfo;
}
/* ------ Fin Funcion que genera el contenido para cada producto ------ */

/* --------- Carga de la página ---------- */
document.addEventListener("DOMContentLoaded", function (e) {
  //const categoryTitle = document.querySelector("#categoryTitle");
  // const mainContainer = document.querySelector("#main-container");
  const navSearch = document.querySelector("#nav-search");

  /* ------- Fetch Info adicional para Productos relacionados (Falta volver dinamico el id del producto) ------- */
  // array.forEach((element) => {
  /* al cargar la pagina 
          por cada id de producto relacionado
              obtener la informacion de cada producto: (nombre, descripcion, moneda, precio) */
  //});
  getJSONData(
    PRODUCT_INFO_URL +
      /* document.querySelector(
        "[data-product-id]"
      ) */ 50741 /*localStorage.getItem("productID") */ +
      EXT_TYPE
  ).then(function (resultObjProductInfoRelatedExtra) {
    if (resultObjProductInfoRelatedExtra.status === "ok") {
      objProductInfoRelatedExtra = resultObjProductInfoRelatedExtra.data;
      //showProductInfo();
      //console.log({ objProductInfoRelatedExtra: objProductInfoRelatedExtra });
    }
  });
  //console.log(PRODUCT_INFO_URL + document.querySelector("[data-product-id]") /*50741 localStorage.getItem("productID") */ + EXT_TYPE);
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
      //console.log({ objProductInfo: objProductInfo });
      //console.log(document.querySelectorAll("[data-product-id]"));
      categoryBreadcrumbs.innerHTML = objProductInfo.category;
      productNameBreadcrumbs.innerHTML = objProductInfo.name;
    }
  });
  /* ---------- Fin Fetch Product Info Plantilla Categories ------------ */

  /* ----- Definicion Funcion que genera los comentarios de otros usuarios ------ */
  function getProductComments() {
    let productComments = "";
    for (let index = 0; index < arrProductComments.length; index++) {
      productComments += `<div class="list-group-item">
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
           <!-- -------- Fin Estrellas Calificacion Comentarios de otros usuarios -------- -->
      <p class="mb-1">${arrProductComments[index].description}</p>
    </div>`;
    }
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
      /* ------ */

      /* ---- ELIMINAR 01 ???? ---- */
      //console.log(ndListStarsContainer.indexOf(document.querySelector("comments-container")));
      // console.log(ndListStarsContainer);
      /* console.log(ndListStarsContainer[0].children);
      console.log(arrProductComments[0].score);
      console.log(starsContainer);
      console.table(arrProductComments); */
      // console.log(starsContainer.children[1].classList);
      //console.log(ndListStarsContainer[1].childNodes[0].nodeName);

      /* starsContainer.forEach((element, index) => {
        if (index < arrProductComments[1].score) {
          starsContainer.children[index].classList.add("checked");
        }
      }); */

      /* for (let index = 0; index < starsContainer.length; index++) {
        if (index < arrProductComments[1].score) {
          starsContainer.children[index].classList.add("checked");
        }
      } */
      //console.log(starsContainer);
      /* ---- Fin ELIMINAR 01 ???? ---- */

      /* ------- Formulario comentarios ------- */
      const btnComment = document.querySelector("#btn-comment");
      btnComment.addEventListener("click", () => {
        const txtComment = document.querySelector("#txt-comment");
        const slctScore = document.querySelector("#slct-score");
        const frmComment = document.querySelector("#frm-comment");
        const commentDateTime = new Date();
        const commentYear = commentDateTime.getFullYear();
        const commentMonth = commentDateTime.getMonth();
        const commentDay = commentDateTime.getDate();
        const commentHour = commentDateTime.getHours();
        const commentMinutes = commentDateTime.getMinutes();
        const commentSeconds = commentDateTime.getSeconds();

        // const starsContainer = document.querySelectorAll("[data-id=star-container-select]");

        if (!frmComment.checkValidity()) {
          frmComment.classList.add("was-validated");
        } else {
          commentsContainer.innerHTML +=
            /* --- Realizar Comentario Bs --- */
            `<div class="list-group-item" data-id="star-container-select">
           <div class="d-flex w-100 justify-content-between">
             <h5 class="mb-1"><a class="" href="#">${localStorage.getItem(
               "userEmail"
             )}</a></h5>
             <small class="text-muted">${
               commentYear +
               "-" +
               commentMonth +
               "-" +
               commentDay +
               " " +
               commentHour +
               ":" +
               commentMinutes +
               ":" +
               commentSeconds
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

          // console.log(parseInt(document.querySelectorAll("data-user-score]")[0].attributes[0].value));
          /*  console.log(
            document
              .querySelectorAll("[data-user-score]")[0]
              .children[0].classList.add("checked")
          ); */
          //console.log(document.querySelectorAll(`[data-user-score=${slctScore.value}]`));
          //console.log(Array.isArray(document.querySelector("[data-user-score]")));

          slctScore.value = "";
          txtComment.value = "";
          frmComment.classList.remove("was-validated");

          /* --- ELIMINAR 02 ??? --- */
          for (
            let index = 0;
            index < commentsContainer.children.length;
            index++
          ) {
            /* ---- Bucle Estrellas Comentario Propio TEST 02 --- */
            /* for (
              let i = 0;
              i < commentsContainer.children[index].children[0].children.length;
              i++
            ) {
              if (
                i <
                parseInt(
                  document.querySelectorAll("[data-user-score]")[i]
                    .attributes[0].value
                )
              ) {
                document
                  .querySelectorAll("[data-user-score]")
                  [i].children[i].classList.add("checked");

                //parseInt(document.querySelectorAll("[data-user-score]")[0].attributes[0].classlist)

                //document.querySelector("[data-user-score]")[0].classList.add("checked");
              } else {
                document
                  .querySelectorAll("[data-user-score]")
                  [i].children[i].classList.add("unchecked");

                //document.querySelector("[data-user-score]")[0].classList.add("unchecked");
              }
            } */
            /* ---- Fin Bucle Estrellas Comentario Propio TEST 02 --- */

            /* ---- Bucleo Estrellas Comentario Propio 01 --- */
            for (let i = 0; i < ndListStarsContainer[0].children.length; i++) {
              // if (i < parseInt(document.querySelector("br~span").innerHTML)) {
              // document.querySelector("br~span").classList.add("checked");
              // } else {
              // document.querySelector("br~span").classList.add("unchecked");
              // }

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
                //  parseInt(document.querySelectorAll("[data-user-score]")[0].attributes[0].classlist)
                //document.querySelector("[data-user-score]")[0].classList.add("checked");
              } else {
                document
                  .querySelectorAll("[data-user-score]")[0]
                  .children[i].classList.add("unchecked");
                //document.querySelector("[data-user-score]")[0].classList.add("unchecked");
              }
            }
            /* ---- Fin Bucle Estrellas Comentario Propio 01 --- */
          }
          /* --- Fin ELIMINAR 02 ??? --- */
          //console.log(starsContainer);
        }
      });

      /* ------- Fin Formulario comentarios ------- */
    }
  });
  /* -------- Fin Fetch comentarios del producto ------- */

  /* ------------- Muestra email del usuario guardado en localStorage ------------- */
  loadUserEmail();
  /* ------------ */

  /* --- Async Await Test --- */
  /*  const getURLInfoAsyncAwait = async (url) => {
    const promise = await fetch(url);
    if (promise.ok) {
      const response = await promise.json();
      return response;
    }
    return promise.status + " " + promise.statusText;
  };

  console.log(
    getURLInfoAsyncAwait(
      "https://japceibal.github.io/emercado-api/products/60803.json"
    )
  ); */
  /* --- Fin Async Await Test --- */

  /* --- .Then .Catch Test --- */
  /* const getURLInfoThenCatchFinally = (url) => {
    const prom = fetch(url);
    prom.then(
      (resp) => {
        if (resp.ok) {
          return resp;
        }
      },
      prom.catch((err) => {
        return err;
      })
    );

    // prom.finally((fin) => {
      //return fin;
    //});
    return prom;
  };

  console.log(
    getURLInfoThenCatchFinally(
      "https://japceibal.github.io/emercado-api/products/60803.jso"
    ).then((finalResp) => {
      return finalResp;
    })
  ); */
  /* --- .Then .Catch Test --- */

  /* ------- Bootstrap Tooltips Inicializador (En desuso) ------- */
  /* var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  }); */
  /* ------- Fin Bootstrap Tooltips Inicializador ------- */

  /* ------- Bootstrap Popovers Inicializador (En desuso) ------- */
  var popoverTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="popover"]')
  );
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });
  //console.log(document.querySelector("[data-bs-content='Calificación promedio del producto según otros usuarios']"));
  /* ------- Fin Bootstrap Popovers Inicializador ------- */
});
