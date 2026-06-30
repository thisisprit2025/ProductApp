// Load products from Local Storage
let products = JSON.parse(localStorage.getItem("products")) || [];

// Display existing products
displayProducts();

// Add a new product
function addProduct() {

    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;

    if (name === "" || price === "") {
        alert("Please enter both Product Name and Price.");
        return;
    }

    const product = {
        name: name,
        price: price
    };

    products.push(product);

    localStorage.setItem("products", JSON.stringify(products));

    document.getElementById("name").value = "";
    document.getElementById("price").value = "";

    displayProducts();
}

// Display all products
function displayProducts() {

    const table = document.getElementById("productTable");

    table.innerHTML = "";

    for (let i = 0; i < products.length; i++) {

        table.innerHTML += `
            <tr>
                <td>${products[i].name}</td>
                <td>$${products[i].price}</td>
                <td>
                    <button onclick="deleteProduct(${i})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    }
}

// Delete a product
function deleteProduct(index) {

    products.splice(index, 1);

    localStorage.setItem("products", JSON.stringify(products));

    displayProducts();
}