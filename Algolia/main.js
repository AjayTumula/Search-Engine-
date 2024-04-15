
// Step One fetch the api to get product details.

let data = [];

let resultsRootElement = document.querySelector('.results');

fetch('https://fakestoreapi.com/products').then(res=>res.json()).then(json=>{
                data = json
                console.log(data)
            })

//Step two, add event to the search bar 

document.querySelector('#searchInput').addEventListener('keyup', ()=> {
    let searchTerm = document.querySelector('#searchInput').value;
    let resultsArray = [];
    resultsArray = data.filter(product=> String(product.title).includes(searchTerm))
    renederProducts(resultsArray);
})

//Step three, Rendering the products which means remove the current the products in the results and get the searched element

function renederProducts(products){
    document.querySelectorAll('.result').forEach(prod => {
        prod.remove();
    })
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

    resultsRootElement.appendChild(resultDiv)
    
}


