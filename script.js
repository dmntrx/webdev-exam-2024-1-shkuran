import { fetchProducts } from './fetchProducts.js';
import { renderProducts } from './renderProducts.js';
import { addToCart } from './cart.js';

let productCards = []; // Глобальная переменная для карточек товаров

async function init() {
    const productsContainer = document.querySelector('.products-container'); // Контейнер для товаров
    const products = await fetchProducts(); // Загружаем данные о товарах

    renderProducts(products, productsContainer); // Отображаем товары

    // Обновляем глобальный массив карточек товаров после рендера
    productCards = Array.from(productsContainer.querySelectorAll('.product-card'));

    // Добавляем обработчик кликов для кнопок "Add to cart"
    productsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart-btn')) {
            const card = event.target.closest('.product-card'); // Получаем карточку товара

            // Извлекаем значение из data-price
            const priceString = card.dataset.price;
            console.log('Значение card.dataset.price:', priceString); // Выводим значение, которое извлекаем из data-price

            // Преобразуем в число
            const price = parseFloat(priceString);
            console.log('Цена после parseFloat:', price); // Выводим результат parseFloat

            const product = {
                id: card.dataset.id,
                title: card.querySelector('.product-title').textContent,
                image: card.querySelector('.product-image').src,
                price: parseFloat(card.dataset.price),
            };
            console.log('Цена установлена в data-price:', product.price);
            addToCart(product); // Добавляем товар в корзину
        }
    });
}

init();



document.addEventListener("DOMContentLoaded", function () {
    const productsContainer = document.querySelector(".products-container");

    // Фильтрация товаров
    document.getElementById("applyFilters").addEventListener("click", function () {
        const selectedCategories = Array.from(document.querySelectorAll("input[name='category']:checked"))
            .map(input => input.value);
        const minPrice = parseFloat(document.querySelector("input[name='min-price']").value) || 0;
        const maxPrice = parseFloat(document.querySelector("input[name='max-price']").value) || Infinity;
        const onlyDiscount = document.querySelector("input[name='discount']").checked;

        productCards.forEach(card => {
            const category = card.getAttribute("data-category");
            const price = parseFloat(card.getAttribute("data-price"));
            const discount = card.getAttribute("data-discount") === "true";

            // Проверяем условия
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(category);
            const matchesPrice = price >= minPrice && price <= maxPrice;
            const matchesDiscount = !onlyDiscount || discount;

            if (matchesCategory && matchesPrice && matchesDiscount) {
                card.classList.remove("hidden"); // Показываем товар
            } else {
                card.classList.add("hidden"); // Скрываем товар
            }
        });
    });

    // Сортировка товаров
    document.getElementById("selectSort").addEventListener("change", function () {
        const sortOption = this.value;

        const sortedCards = [...productCards];

        if (sortOption === "rating-asc") {
            sortedCards.sort((a, b) => {
                const ratingA = parseFloat(a.querySelector(".product-rating").textContent.match(/(\d+(\.\d+)?)/)[0]);
                const ratingB = parseFloat(b.querySelector(".product-rating").textContent.match(/(\d+(\.\d+)?)/)[0]);
                return ratingA - ratingB;
            });
        } else if (sortOption === "rating-desc") {
            sortedCards.sort((a, b) => {
                const ratingA = parseFloat(a.querySelector(".product-rating").textContent.match(/(\d+(\.\d+)?)/)[0]);
                const ratingB = parseFloat(b.querySelector(".product-rating").textContent.match(/(\d+(\.\d+)?)/)[0]);
                return ratingB - ratingA;
            });
        } else if (sortOption === "price-asc") {
            sortedCards.sort((a, b) => parseFloat(a.getAttribute("data-price")) - parseFloat(b.getAttribute("data-price")));
        } else if (sortOption === "price-desc") {
            sortedCards.sort((a, b) => parseFloat(b.getAttribute("data-price")) - parseFloat(a.getAttribute("data-price")));
        }

        // Обновляем контейнер с отсортированными карточками
        sortedCards.forEach(card => productsContainer.appendChild(card));
    });

    // Фиксация стилей после изменения карточек
    const fixCardStyles = () => {
        productCards.forEach(card => {
            const button = card.querySelector(".add-to-cart-btn");
            if (button) {
                button.style.marginTop = "auto"; // Убедитесь, что кнопка всегда внизу
            }
        });
    };

    // Применение стилей после фильтрации
    fixCardStyles();
});
