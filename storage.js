export function saveCart(cart) {
    console.log('Сохраняем корзину в localStorage:', cart); // Лог перед сохранением
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function loadCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}
