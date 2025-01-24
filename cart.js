import { saveCart } from './storage.js';

export function addToCart(product) {
    console.log('Product added to cart:', product); // Проверка, вызывается ли функция
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.some(item => item.id === product.id)) {
        cart.push(product);
        saveCart(cart);
    }
}

export function getCart() {
    // return JSON.parse(localStorage.getItem('cart')) || [];

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('Извлеченная корзина из localStorage:', cart); // Лог извлеченной корзины
    return cart;
}

export function removeFromCart(productId) {
    let cart = getCart();
    console.log('Корзина перед удалением продукта:', cart); // Лог корзины до удаления
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    console.log('Корзина после удаления продукта:', cart); // Лог корзины после удаления
}
