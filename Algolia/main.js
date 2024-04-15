
import algoliasearch from "algoliasearch";

const client = algoliasearch("81B309EVRP", "c0c5f7f0c4fc2e3a984f078a5cfc404d");
const index = client.initIndex("search");



// Step One fetch the api to get product details.

let data = [];

let resultsRootElement = document.querySelector('.results');

fetch('https://fakestoreapi.com/products').then(res=>res.json()).then(json=>{
                data = json
                // console.log(data)
            })

//Step two, add event to the search bar 

document.querySelector('#searchInput').addEventListener('keyup', ()=> {
    let searchTerm = document.querySelector('#searchInput').value;
    let resultsArray = [];

    if(String(searchTerm).trim().length > 0) {

     index.search(searchTerm).then(response=> {
      renederProducts(response.hits);
     })
    } else {
      removeElements();
    } 
})

//Step three, Rendering the products which means remove the current the products in the results and get the searched element

function renederProducts(products){
   removeElements();
    products.forEach(product=> {
        renderSingleProduct(product);
    })
}

function renderSingleProduct(product){
    let resultDiv = document.createElement('div');
    let resultImage = document.createElement('img');
    let resultTitle = document.createElement('h4');
    let resultPrice = document.createElement('p');
    let purchaseButton = document.createElement('button');

    resultImage.src = product.image;
    resultTitle.innerHTML = product.title;
    resultPrice.innerHTML = product.price;
    purchaseButton.innerText = "Purchase";

    resultDiv.appendChild(resultImage);
    resultDiv.appendChild(resultTitle);
    resultDiv.appendChild(resultPrice);
    resultDiv.appendChild(purchaseButton);
    resultDiv.className = 'result';

    resultsRootElement.appendChild(resultDiv)
    
}

function removeElements(){
  document.querySelectorAll('.result').forEach(prod => {
    prod.remove()
  })
}

function addNewElement() {
  index.saveObject(
    {
      objectID: 51,
      "id": 1,
      "title": "Ajay Favourite T-shirt",
      "price": 109.95,
      "description": "This is my favourite Armani t-shirt",
      "category": "men's clothing",
      "image": "https://picsum.photos/200",
      "rating": {
          "rate": 3.9,
          "count": 120
      }
  }
  ).then(response=> {
    console.log(response)
  })
}

addNewElement()

