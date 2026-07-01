
//needs cors
const blobUrl = "https://comp3002productstorage.blob.core.windows.net/products/products.json";

let products = JSON.parse(localStorage.getItem("products")) || [];

if (products.length === 0) {
    loadProductsFromBlob();
} else {
    displayProducts();
}

function loadProductsFromBlob() {
    fetch(blobUrl)
        .then(response => response.json())
        .then(data => {
            products = data;
            localStorage.setItem("products", JSON.stringify(products));
            displayProducts();
        })
        .catch(error => {
            console.error("Error loading products from Blob:", error);
            displayProducts();
        });
}

function clearLocalProducts() {
    localStorage.removeItem("products");
    products = [];
    displayProducts();
}

function addProduct() {
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;

    if (name === "" || price === "") {
        alert("Please enter both Product Name and Price.");
        return;
    }

    const product = {
        id: Date.now(),
        name: name,
        price: price
    };

    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));

    document.getElementById("name").value = "";
    document.getElementById("price").value = "";

    displayProducts();
}

function displayProducts() {
    const table = document.getElementById("productTable");
    table.innerHTML = "";

    for (let i = 0; i < products.length; i++) {
        table.innerHTML += `
            <tr>
                <td>${products[i].name}</td>
                <td>$${products[i].price}</td>
                <td>
                    <button onclick="deleteProduct(${i})">Delete</button>
                </td>
            </tr>
        `;
    }
}

function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
}