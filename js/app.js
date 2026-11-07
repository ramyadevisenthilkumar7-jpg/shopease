// Product Details

const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 1499,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 1999,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
    },
    {
        id: 3,
        name: "Sneakers",
        price: 2499,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
    },
    {
        id: 4,
        name: "Backpack",
        price: 999,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400"
    }
];

// Get HTML Elements

const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search");

// Display Products

function displayProducts(productItems = products) {

    if (!productList) return;

    productList.innerHTML = "";

    if (productItems.length === 0) {
        productList.innerHTML = "<p>No products found!</p>";
        return;
    }

    productItems.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <button onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        `;

        productList.appendChild(card);
    });
}

// Search Products

if (searchInput) {

    searchInput.addEventListener("input", function() {

        const searchValue = searchInput.value.trim().toLowerCase();

        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchValue)
        );

        displayProducts(filteredProducts);
    });
}

// Add Products to Cart

function addToCart(id) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(id);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product added to cart successfully!");
}

// Display Cart

function displayCart() {

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItems || !cartTotal) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty!</p>";
        cartTotal.innerHTML = "Total: ₹0";
        return;
    }

    cart.forEach((id, index) => {

        const product = products.find(item => item.id === id);

        if (product) {

            total += product.price;

            cartItems.innerHTML += `
                <div class="product-card">
                    <h3>${product.name}</h3>
                    <p>Price: ₹${product.price}</p>
                    <button onclick="removeFromCart(${index})">
                        Remove
                    </button>
                </div>
            `;
        }
    });

    cartTotal.innerHTML = "Total: ₹" + total;
}

// Remove Product from Cart

function removeFromCart(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}

// Clear Cart

function clearCart() {

    localStorage.removeItem("cart");

    displayCart();
}

// Initial Display

displayProducts();
displayCart();