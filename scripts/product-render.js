const products = [
    { id: 1, name: "Эмийн хайрцаг дэлгэдэг", price: "25,000₮", image: "images/products/product1.png" },
    { id: 2, name: "Утлагын аппарат W302", price: "55,000₮", image: "images/products/product2.jpg" },
    { id: 3, name: "Ханиалга астманы наалт №10", price: "15,920₮", image: "images/products/product3.jpg", discount: "20%", originalPrice: "19,900₮" },
    { id: 4, name: "Хүүхдийн ханиалга намдаах наалт", price: "12,800₮", image: "images/products/product4.jpg" },
    { id: 5, name: "Дархлаа сэргээх цай", price: "10,000₮", image: "images/products/product5.jpg" },
    { id: 6, name: "Шингэн витамин C", price: "22,000₮", image: "images/products/product6.jpg" },
    { id: 7, name: "Дархлаа дэмжигч нунтаг", price: "18,500₮", image: "images/products/product7.jpg" },
    { id: 8, name: "Эмийн багц", price: "30,000₮", image: "images/products/product8.jpg" },
    { id: 9, name: "Хүүхдийн витамин багц", price: "20,000₮", image: "images/products/product9.jpg" },
    { id: 10, name: "Эмийн сангийн хайрцаг", price: "40,000₮", image: "images/products/product10.jpg" },
    { id: 11, name: "Зөв амьсгал маск", price: "8,500₮", image: "images/products/product11.jpg" },
    { id: 12, name: "Дархлаа дэмжигч капсул", price: "25,000₮", image: "images/products/product12.jpg" },
    { id: 13, name: "Хүүхдийн хананд наадаг эм", price: "12,500₮", image: "images/products/product13.jpg" },
    { id: 14, name: "Ханиалга намдаах дусаагуур", price: "18,000₮", image: "images/products/product14.jpg" },
    { id: 15, name: "Эмийн багц №2", price: "35,000₮", image: "images/products/product15.jpg" },
];

const productGrid = document.querySelector(".product-grid");

products.forEach((product) => {
    const productCard = `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            ${product.discount ? `<p class="product-discount">${product.discount}</p>` : ""}
            ${product.originalPrice ? `<p class="original-price">${product.originalPrice}</p>` : ""}
            <p class="product-price">${product.price}</p>
            <button onclick="viewProductDetail(${product.id})">Дэлгэрэнгүй</button>
        </div>
    `;
    productGrid.innerHTML += productCard;
});

function viewProductDetail(productId) {
    const product = products.find((p) => p.id === productId);

    if (product) {
        const queryParams = new URLSearchParams(product).toString();
        window.open(`content/product-detail.html?${queryParams}`, "_blank"); // Open in a new tab
    }
}
