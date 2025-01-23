function getStars(rating) {
    const fullStars = '★'.repeat(Math.floor(rating));
    const emptyStars = '☆'.repeat(5 - Math.floor(rating));
    if (rating >= 4.8) {
        return '★'.repeat(5);
    } else {
        return fullStars + emptyStars;
    };
}

export function renderProducts(data) {
    const container = document.querySelector('.products-container'); // контейнер для карточек товаров
    container.innerHTML = ''; // очистка контейнера
    
    data.forEach(category => {
        category.products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.setAttribute('data-category', category.category);
            productCard.setAttribute('data-price', parseFloat(product.currentPrice)); // Преобразуем цену в число
            productCard.setAttribute('data-discount', product.discount === true); // Преобразуем скидку в булево значение

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-rating">Rating: ${getStars(product.rating)} ${product.rating}</div>
                <div class="product-price">
                    ${
                        product.discount
                            ? `<span class="old-price">${product.oldPrice} ₽</span>
                               <span class="new-price">${product.currentPrice} ₽</span>`
                            : `<span class="current-price">${product.currentPrice} ₽</span>`
                    }
                </div>
                <button class="add-to-cart-btn">Add to cart</button>
            `;

            container.appendChild(productCard);
        });
    });
}
