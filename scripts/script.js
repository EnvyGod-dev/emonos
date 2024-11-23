document.addEventListener("DOMContentLoaded", function () {
    loadComponent("mainNavFooter/header.html", "header-placeholder");
    loadComponent("mainNavFooter/footer.html", "footer-placeholder");
});

function loadComponent(url, placeholderId) {
    fetch(url)
        .then((response) => {
            if (!response.ok) throw new Error(`Failed to load ${url}: ${response.statusText}`);
            return response.text();
        })
        .then((data) => (document.getElementById(placeholderId).innerHTML = data))
        .catch((error) => console.error(`Error loading ${url}:`, error));
}


document.addEventListener("DOMContentLoaded", () => {
    const scrollToTopBtn = document.querySelector(".scroll-to-top");

    // Show or hide scroll-to-top button
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = "flex";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    });

    // Scroll to top functionality
    scrollToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    loadCart();
    attachAddToCartEvents();
});

function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = ""; // Clear existing items
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}" class="cart-image"></td>
            <td>${item.name}</td>
            <td>₮${item.price}</td>
            <td>
                <button class="qty-btn" onclick="updateQuantity(${index}, -1)">-</button>
                ${item.quantity}
                <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
            </td>
            <td>₮${itemTotal}</td>
            <td><button class="remove-btn" onclick="removeFromCart(${index})">Устгах</button></td>
        `;
        cartItems.appendChild(row);
    });

    cartTotal.textContent = total.toLocaleString();
}

// Add a product to the cart
function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.name === product.name);

    if (existingProduct) {
        existingProduct.quantity += product.quantity;
    } else {
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Бүтээгдэхүүн сагсанд нэмэгдлээ!");
}

// Update product quantity in the cart
function updateQuantity(index, change) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1); // Remove if quantity becomes zero
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// Remove a product from the cart
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// Attach "Add to Cart" events for buttons
function attachAddToCartEvents() {
    const addButtons = document.querySelectorAll(".add-to-cart");

    addButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const productCard = btn.closest(".product-card");
            const product = {
                name: productCard.querySelector("h3").textContent,
                price: parseFloat(
                    productCard.querySelector(".product-price").textContent.replace("₮", "")
                ),
                image: productCard.querySelector("img").src,
                quantity: 1,
            };

            addToCart(product);
        });
    });
}
