document.addEventListener('DOMContentLoaded', function() {
    const shopLink = document.getElementById('shopLink');
    const dropdownMenu = document.getElementById('dropdownMenu');

    dropdownMenu.style.display = 'none';

    shopLink.addEventListener('click', function(event) {
        event.preventDefault();
        dropdownMenu.style.display = dropdownMenu.style.display === 'flex' ? 'none' : 'flex';
    });

    document.addEventListener('click', function(event) {
        if (!shopLink.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartModal = document.getElementById('cartModal');
    const cartItemsContainer = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');

    // Función para actualizar el carrito
    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price;
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <span>${item.name} - $${item.price}</span>
                <span class="remove-item" onclick="removeFromCart(${index})">Eliminar</span>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        totalPriceElement.innerText = `Total: $${total}`;
        localStorage.setItem('cart', JSON.stringify(cart)); // Guardar en localStorage
    }

    // Función para añadir productos al carrito
    window.addToCart = function (product) {
        cart.push(product);
        updateCart();
    };

    // Función para eliminar productos del carrito
    window.removeFromCart = function (index) {
        cart.splice(index, 1);
        updateCart();
    };

    // Mostrar y ocultar el carrito
    document.querySelector('.icon-cart').addEventListener('click', () => {
        cartModal.classList.toggle('active');
    });

    // Cerrar el carrito al hacer clic fuera, pero no al hacer clic en el botón de eliminar
    window.addEventListener('click', (event) => {
        const isClickOnCartIcon = document.querySelector('.icon-cart').contains(event.target);
        const isClickInsideCart = cartModal.contains(event.target);
        const isClickOnDeleteButton = event.target.classList.contains('remove-item'); // Detectar si es botón de eliminar

        if (!isClickOnCartIcon && !isClickInsideCart && !isClickOnDeleteButton) {
            cartModal.classList.remove('active');
        }
    });

    // Manejar el evento de agregar productos
    document.querySelectorAll('.shop-btn').forEach((button) => {
        button.addEventListener('click', () => {
            const productCard = button.parentElement;
            const productName = productCard.querySelector('h3').innerText;
            const productPrice = parseFloat(productCard.querySelector('p').innerText.replace('$', '').replace('.', '')) || 0;

            addToCart({ name: productName, price: productPrice });
        });
    });

    // Funcionalidad del botón de comprar
    document.getElementById('checkoutBtn').addEventListener('click', () => {
        alert("Oops, funcionalidad no disponible.");
    });

    // Actualizar el carrito al cargar la página
    updateCart();
});


document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const products = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            // Filter products
            const category = this.getAttribute('data-category');
            products.forEach(product => {
                if (category === 'all' || product.getAttribute('data-category') === category) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });
});
