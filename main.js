const main = document.getElementsByTagName("main").item(0);
const ulMenu = document.getElementById("ulMenu");
const cardRow = document.getElementById("cardRow");
const URLMain = "https://fakestoreapi.com/products/";

function getData(cat){
    const options = {"method": "GET"};
    fetch(URLMain+cat, options)
    .then((response) =>{
        response.json().then((res)=>{
            // console.log(res.length);
            // console.log(res[10].title);
                 cardRow.innerHTML = "";
            createCards(res);
        });
    })
    .catch((err)=>{
        main.insertAdjacentHTML("beforeend",
            `<div class="alert alert-danger" role="alert">
                ${err.message}
                </div>`);
    });
}//getData

function getCategories(){
  const options = {"method": "GET"};
  fetch(URLMain+"categories/", options)
  .then((response) => {
      response.json().then((res)=>{
        //console.log("categories:",res);
        res.forEach((cat)=>{
          ulMenu.insertAdjacentHTML("afterbegin",
          `<li><a class="dropdown-item" style="cursor: pointer;" onclick="getData('category/${(cat.replace("'","%27"))}');">${cat}</a></li>`);
        })
      });
  })
  .catch((err)=>{
      main.insertAdjacentHTML("beforeend",
          `<div class="alert alert-danger" role="alert">
              ${err.message}
              </div>`);
  });
}//getCategories

getCategories();
getData("");

function createCards(prods){

    prods.forEach(product => {
        const shortDescription = product.description.length > 120
            ? product.description.substring(0, 60) + "..."
            : product.description;

       const card = `
<div class="col-md-4 mb-4 mb-4 d-flex">
<div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${product.image}" class="img-fluid rounded-start" alt="${product.title}">
    </div>
    <div class="col-md-8">
      <div clas= "card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">${shortDescription}</p>
        <p class="card-text mt-auto">
          <small class="text-body-secondary">$${product.price} USD</small>
        </p>
      </div>
    </div>
  </div>`;
cardRow.insertAdjacentHTML("beforeend", card);

    });
}


