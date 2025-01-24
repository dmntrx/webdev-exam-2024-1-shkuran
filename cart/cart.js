import { getCart, removeFromCart } from '../cart.js';

function renderCart() {
    const cartContainer = document.querySelector('.cart-container');
    // const emptyMessage = document.querySelector('.cart-container p'); // Сообщение о пустой корзине
    const cart = getCart();

    cartContainer.innerHTML = ''; // Очистка контейнера

    // if (cart.length > 0) {
    //     emptyMessage.style.display = 'none'; // Скрыть сообщение о пустой корзине
    // } else {
    //     emptyMessage.style.display = 'block'; // Показать сообщение, если корзина пуста
    // }

    cart.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.className = 'product-card';
        cartItem.setAttribute('data-id', product.id);

        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <h3 class="product-title">${product.title}</h3>
            <div class="product-price">${product.price} ₽</div>
            <button class="delete-from-cart-btn">Delete</button>
        `;

        cartContainer.appendChild(cartItem);
    });

    // Обработчик кнопок удаления
    cartContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-from-cart-btn')) {
            const card = event.target.closest('.product-card');
            const productId = card.dataset.id;

            removeFromCart(productId);
            renderCart();
        }
    });
}

if (window.location.pathname.includes('cart.html')) {
    renderCart();
}
