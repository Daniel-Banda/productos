const main = document.getElementsByTagName("main").item(0);
const URLMain = "https://fakestoreapi.com/products/";

function getData(){
    const options = {"method": "GET"};
    fetch(URLMain, options)
    .then((response) =>{
        console.log(response);
        response.json().then((res)=>{
            // console.log(res.length);
            // console.log(res[10].title);
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

getData();

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
    document.querySelectorAll(".btn-show-modal").forEach(btn => {
        btn.addEventListener("click", function() {
            const product = JSON.parse(this.getAttribute("data-product"));

            // Actualizamos el modal con la info del producto
            document.getElementById("productModalLabel").textContent = product.title;
            document.getElementById("productModalBody").innerHTML = `
                <img src="${product.image}" class="img-fluid mb-3" alt="${product.title}">
                <p>${product.description}</p>
                <p><strong>Precio:</strong> $${product.price} USD</p>
            `;

            // Mostramos el modal
            const modal = new bootstrap.Modal(document.getElementById("productModal"));
            modal.show();
        });
    });
