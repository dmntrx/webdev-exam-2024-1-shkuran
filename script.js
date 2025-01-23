document.addEventListener("DOMContentLoaded", function () {
    const itemsContainer = document.querySelector(".items-container");
    const productCards = Array.from(itemsContainer.querySelectorAll(".product-card"));

    // фильтрация товаров
    document.getElementById("applyFilters").addEventListener("click", function () {
        const selectedCategories = Array.from(document.querySelectorAll("input[name='category']:checked"))
            .map(input => input.value);
        const minPrice = parseFloat(document.querySelector("input[name='min-price']").value) || 0;
        const maxPrice = parseFloat(document.querySelector("input[name='max-price']").value) || Infinity;
        const onlyDiscount = document.querySelector("input[name='category'][value='discount']").checked;

        productCards.forEach(card => {
            const category = card.getAttribute("data-category");
            const price = parseFloat(card.getAttribute("data-price"));
            const discount = card.getAttribute("data-discount") === "true";

            // проверяем условия
            let matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(category);
            let matchesPrice = price >= minPrice && price <= maxPrice;
            let matchesDiscount = !onlyDiscount || discount;

            if (matchesCategory && matchesPrice && matchesDiscount) {
                card.classList.remove("hidden"); // показываем товар
            } else {
                card.classList.add("hidden"); // скрываем товар
            }
        });
    });

    // сортировка товаров
    document.getElementById("selectSort").addEventListener("change", function () {
        const sortOption = this.value;

        const sortedCards = [...productCards];

        if (sortOption === "rating-asc") {
            sortedCards.sort((a, b) => {
                const ratingA = parseFloat(a.querySelector(".product-rating").textContent.match(/(\d(\.\d+)?)/)[0]);
                const ratingB = parseFloat(b.querySelector(".product-rating").textContent.match(/(\d(\.\d+)?)/)[0]);
                return ratingA - ratingB;
            });
        } else if (sortOption === "rating-desc") {
            sortedCards.sort((a, b) => {
                const ratingA = parseFloat(a.querySelector(".product-rating").textContent.match(/(\d(\.\d+)?)/)[0]);
                const ratingB = parseFloat(b.querySelector(".product-rating").textContent.match(/(\d(\.\d+)?)/)[0]);
                return ratingB - ratingA;
            });
        } else if (sortOption === "price-asc") {
            sortedCards.sort((a, b) => parseFloat(a.getAttribute("data-price")) - parseFloat(b.getAttribute("data-price")));
        } else if (sortOption === "price-desc") {
            sortedCards.sort((a, b) => parseFloat(b.getAttribute("data-price")) - parseFloat(a.getAttribute("data-price")));
        }

        // обновляем контейнер с отсортированными карточками без перерисовки
        sortedCards.forEach(card => itemsContainer.appendChild(card));
    });

    // фиксация стилей после изменения карточек
    const fixCardStyles = () => {
        const productCards = document.querySelectorAll(".product-card");
        productCards.forEach(card => {
            const button = card.querySelector(".add-to-cart-btn");
            if (button) {
                button.style.marginTop = "auto"; // Убедитесь, что кнопка всегда внизу
            }
        });
    };

    // применение стилей после фильтрации
    fixCardStyles();
});
