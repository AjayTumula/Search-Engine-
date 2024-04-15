
// Step One fetch the api to get product details.

let data = [];

fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>{
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

//Step three, Rendering the products which means remove the current the products in the results

function renederProducts(products){
    document.querySelectorAll('.result').forEach(prod => {
        prod.remove();
    })
    products.forEach(product=> {
        renderSingleProduct(product);
    })
}

function renderSingleProduct(product){
    console.log(product)
}


