// ----------------------- Data -----------------------
const products = {
    "Wines": [
        { name: "Red Wine", image: "1.jpeg" },
        { name: "White Wine", image: "2.jpeg" },
        { name: "Rose Wine", image: "3.jpeg" },
        { name: "Sparkling Wine", image: "4.jpeg" },
        { name: "Dessert Wine", image: "5.jpeg" },
        { name: "Table Wine", image: "6.jpeg" },
        { name: "Fruit Wine", image: "7.jpeg" },
        { name: "Ice Wine", image: "8.jpeg" },
        { name: "Dry Wine", image: "9.jpeg" },
        { name: "Organic Wine", image: "10.jpeg" }
    ],
    "Spirits": [
        { name: "Gin", image: "11.jpeg" },
        { name: "Rum", image: "12.jpeg" },
        { name: "Brandy", image: "13.jpeg" },
        { name: "Absinthe", image: "14.jpeg" },
        { name: "Mezcal", image: "15.jpeg" },
        { name: "Pisco", image: "16.jpeg" },
        { name: "Cachaca", image: "17.jpeg" },
        { name: "Schnapps", image: "18.jpeg" },
        { name: "Soju", image: "19.jpeg" },
        { name: "Grappa", image: "20.jpeg" }
    ],
    "Tequila": [
        { name: "Blanco", image: "21.jpeg" },
        { name: "Reposado", image: "22.jpeg" },
        { name: "Anejo", image: "23.jpeg" },
        { name: "Extra Anejo", image: "24.jpeg" },
        { name: "Cristalino", image: "25.jpeg" },
        { name: "Gold Tequila", image: "26.jpeg" },
        { name: "Silver Tequila", image: "27.jpeg" },
        { name: "Agave Tequila", image: "28.jpeg" },
        { name: "Mixto Tequila", image: "29.jpeg" },
        { name: "Reserva Tequila", image: "30.jpeg" }
    ],
    "Soft Drinks": [
        { name: "Coca-Cola", image: "31.jpeg" },
        { name: "Pepsi", image: "32.jpeg" },
        { name: "Sprite", image: "33.jpeg" },
        { name: "Fanta", image: "34.jpeg" },
        { name: "Mountain Dew", image: "35.jpeg" },
        { name: "Ginger Ale", image: "36.jpeg" },
        { name: "Root Beer", image: "37.jpeg" },
        { name: "Tonic Water", image: "38.jpeg" },
        { name: "Club Soda", image: "39.jpeg" },
        { name: "Lemonade", image: "40.jpeg" }
    ],
    "Vodka": [
        { name: "Classic Vodka", image: "51.jpeg" },
        { name: "Flavored Vodka", image: "52.jpeg" },
        { name: "Premium Vodka", image: "53.jpeg" },
        { name: "Wheat Vodka", image: "54.jpeg" },
        { name: "Potato Vodka", image: "55.jpeg" },
        { name: "Corn Vodka", image: "56.jpeg" },
        { name: "Grape Vodka", image: "57.jpeg" },
        { name: "Rye Vodka", image: "58.jpeg" },
        { name: "Organic Vodka", image: "59.jpeg" },
        { name: "Crystal Vodka", image: "60.jpeg" }
    ],
    "Brandy": [
        { name: "Cognac", image: "61.jpeg" },
        { name: "Armagnac", image: "62.jpeg" },
        { name: "American Brandy", image: "63.jpeg" },
        { name: "Spanish Brandy", image: "64.jpeg" },
        { name: "Fruit Brandy", image: "65.jpeg" },
        { name: "Grape Brandy", image: "66.jpeg" },
        { name: "Aged Brandy", image: "67.jpeg" },
        { name: "Fine Brandy", image: "68.jpeg" },
        { name: "XO Brandy", image: "69.jpeg" },
        { name: "VSOP Brandy", image: "70.jpeg" }
    ],
    "Whiskey": [
        { name: "Scotch Whisky", image: "71.jpeg" },
        { name: "Irish Whiskey", image: "72.jpeg" },
        { name: "Bourbon", image: "73.jpeg" },
        { name: "Rye Whiskey", image: "74.jpeg" },
        { name: "Japanese Whisky", image: "75.jpeg" },
        { name: "Single Malt", image: "76.jpeg" },
        { name: "Blended Whiskey", image: "77.jpeg" },
        { name: "Tennessee Whiskey", image: "78.jpeg" },
        { name: "Corn Whiskey", image: "79.jpeg" },
        { name: "Canadian Whisky", image: "80.jpeg" }
    ]
};

let stock = {};
let price = 250;
let ratings = {};
let customers = []; // Stores registered customers
let currentCustomer = null; // Tracks the currently logged-in customer
let customerPurchases = []; // Stores purchase history for all customers
let cart = []; // Stores items in the customer's cart

// Initialize stock and ratings
for (let category in products) {
    stock[category] = {};
    ratings[category] = {};
    products[category].forEach(product => {
        stock[category][product.name] = { quantity: 40, price: price };
        ratings[category][product.name] = { totalStars: 0, totalRatings: 0 };
    });
}

// ----------------------- DOM Elements -----------------------
const loginPage = document.getElementById('loginPage');
const mainApp = document.getElementById('mainApp');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const registerSection = document.getElementById('registerSection');
const registerForm = document.getElementById('registerForm');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');
const viewCartBtn = document.getElementById('viewCartBtn');

const categories = document.querySelectorAll('.category');
const productsSection = document.getElementById('products');
const productList = document.querySelector('.product-list');
const productTitle = document.getElementById('product-title');
const adminBtn = document.getElementById('adminBtn');
const adminModal = document.getElementById('adminModal');
const adminPass = document.getElementById('adminPass');
const loginAdmin = document.getElementById('loginAdmin');
const adminPanel = document.getElementById('adminPanel');
const stockList = document.getElementById('stockList');
const backBtn = document.getElementById('backBtn');
const logoutAdmin = document.getElementById('logoutAdmin');
const updatesBtn = document.getElementById('updatesBtn');
const updatesSection = document.getElementById('updatesSection');
const purchaseList = document.getElementById('purchaseList');

// ----------------------- Event Listeners -----------------------

// Show registration form
showRegister.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.add('hidden');
    registerSection.classList.remove('hidden');
});

// Show login form
showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    registerSection.classList.add('hidden');
    loginForm.classList.remove('hidden');
});

// Handle Registration Form Submission
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;

    // Check if the email is already registered
    if (customers.some(customer => customer.email === email)) {
        alert("Email already registered. Please login.");
        return;
    }

    // Add the new customer
    customers.push({ email, phone, password, purchases: [] });
    alert("Registration successful! Please login.");
    registerSection.classList.add('hidden');
    loginForm.classList.remove('hidden');
});

// Handle Login Form Submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validate User
    const user = customers.find(customer => customer.email === username && customer.password === password);

    if (user) {
        // Successful Login
        currentCustomer = user; // Set the current customer
        loginPage.classList.add('hidden');
        mainApp.classList.remove('hidden');
        loginError.classList.add('hidden');
    } else {
        // Failed Login
        loginError.classList.remove('hidden');
    }
});

// Open Admin Login Modal
adminBtn.addEventListener('click', () => {
    adminModal.style.display = "block";
});

// Admin Login Validation
loginAdmin.addEventListener('click', () => {
    if (adminPass.value === "admin123") {
        adminModal.style.display = "none";
        adminPanel.style.display = "block";
        updateStockView();
        viewCustomerPurchases();
    } else {
        alert("Wrong password! Access Denied.");
    }
});

// Handle Category Selection
categories.forEach(btn => {
    btn.addEventListener('click', () => {
        let category = btn.dataset.category;
        productTitle.innerText = category;
        updateProductDisplay(category); // Update the product display for the selected category
        productsSection.classList.remove('hidden');
        document.getElementById('categories').classList.add('hidden');
    });
});

// Add to Cart Function
function addToCart(category, productName, price) {
    const product = products[category].find(p => p.name === productName);
    const item = { category, product: product.name, price, image: product.image };
    cart.push(item);
    alert(`${product.name} added to cart!`);
}

// View Cart Function (Updated to show as an alert)
viewCartBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Format the cart details for the alert
    let cartDetails = "Your Cart:\n\n";
    let total = 0;

    cart.forEach((item, index) => {
        cartDetails += `${index + 1}. ${item.product} - Ksh ${item.price}\n`;
        total += item.price;
    });

    cartDetails += `\nTotal: Ksh ${total}\n\nDo you want to proceed to checkout?`;

    // Show the cart details in an alert
    const proceedToCheckout = confirm(cartDetails);

    // If the user clicks "OK" in the alert, proceed to checkout
    if (proceedToCheckout) {
        buyNow(); // Call the buyNow function to complete the purchase
    }
});

// Buy Now Function
function buyNow() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let total = cart.reduce((sum, item) => sum + item.price, 0);
    alert(`Thank you, ${currentCustomer.email}! Your total is Ksh ${total}.`);

    // Log the purchase
    cart.forEach(item => {
        currentCustomer.purchases.push({
            product: item.product,
            category: item.category,
            price: item.price,
            date: new Date().toLocaleString()
        });

        customerPurchases.push({
            customer: currentCustomer.email,
            product: item.product,
            category: item.category,
            price: item.price,
            date: new Date().toLocaleString()
        });
    });

    // Clear the cart
    cart = [];
}

// Rate Drink Function
function rateDrink(category, drink, stars) {
    ratings[category][drink].totalStars += stars;
    ratings[category][drink].totalRatings++;
    alert(`You rated ${drink} with ${stars} stars!`);
    updateStockView();
}

// Update Stock View in Admin Panel
function updateStockView() {
    const stockList = document.getElementById('stockList');
    stockList.innerHTML = "";

    for (let category in stock) {
        for (let drink in stock[category]) {
            const quantity = stock[category][drink].quantity;
            const price = stock[category][drink].price;
            const avgRating = ratings[category][drink].totalRatings > 0 ?
                (ratings[category][drink].totalStars / ratings[category][drink].totalRatings).toFixed(1) : "No Ratings";

            stockList.innerHTML += `
                <tr>
                    <td>${category}</td>
                    <td>${drink}</td>
                    <td>${quantity}</td>
                    <td>${price}</td>
                    <td>${avgRating}⭐</td>
                    <td>
                        <input type="number" id="increase-${drink}" placeholder="Add Stock">
                        <button onclick="increaseStock('${category}', '${drink}')">Increase</button>
                        <input type="number" id="price-${drink}" placeholder="New Price">
                        <button onclick="modifyPrice('${category}', '${drink}')">Update Price</button>
                    </td>
                </tr>`;
        }
    }
}

// View Customer Purchases
function viewCustomerPurchases() {
    const purchaseList = document.getElementById('purchaseList');
    purchaseList.innerHTML = "";

    if (customerPurchases.length === 0) {
        purchaseList.innerHTML = `<tr><td colspan="5">No purchases recorded yet.</td></tr>`;
    } else {
        customerPurchases.forEach(purchase => {
            purchaseList.innerHTML += `
                <tr>
                    <td>${purchase.customer}</td>
                    <td>${purchase.product}</td>
                    <td>${purchase.category}</td>
                    <td>${purchase.price}</td>
                    <td>${purchase.date}</td>
                </tr>`;
        });
    }
}

// Increase Stock Function
function increaseStock(category, drink) {
    let increaseAmount = parseInt(document.getElementById(`increase-${drink}`).value);
    if (!isNaN(increaseAmount)) {
        stock[category][drink].quantity += increaseAmount;
        alert(`${increaseAmount} units added to ${drink}`);
        updateStockView();
        updateProductDisplay(category); // Update the product display for customers
    } else {
        alert("Please enter a valid number.");
    }
}

// Modify Price Function
function modifyPrice(category, drink) {
    let newPrice = parseFloat(document.getElementById(`price-${drink}`).value);
    if (!isNaN(newPrice)) {
        stock[category][drink].price = newPrice;
        alert(`Price for ${drink} updated to Ksh ${newPrice}`);
        updateStockView();
        updateProductDisplay(category); // Update the product display for customers
    } else {
        alert("Please enter a valid price.");
    }
}

// Update Product Display for Customers
function updateProductDisplay(category) {
    productList.innerHTML = "";
    products[category].forEach(product => {
        const quantity = stock[category][product.name].quantity;
        const price = stock[category][product.name].price;
        productList.innerHTML += `
            <div class="product" data-category="${category}">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <p>${product.name} - <strong>Ksh ${price}</strong> (${quantity} left)</p>
                <button onclick="addToCart('${category}', '${product.name}', ${price})">Add to Cart</button>
                <div class="rating" id="rating-${category}-${product.name.replace(/\s+/g, '-')}">
                    ${[1, 2, 3, 4].map(star => `
                        <span class="star" onclick="rateDrink('${category}', '${product.name}', ${star})">&#9733;</span>
                    `).join('')}
                </div>
            </div>`;
    });
}

// Admin Logout
logoutAdmin.addEventListener('click', () => {
    adminPanel.style.display = "none";
    adminModal.style.display = "none";
    adminPass.value = "";
});

// Back Button to Return to Categories
backBtn.addEventListener('click', () => {
    productsSection.classList.add('hidden');
    document.getElementById('categories').classList.remove('hidden');
});