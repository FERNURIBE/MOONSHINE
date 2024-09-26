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



// Funcionalidad del carrusel de imágenes
// Comprueba si hay un elemento con el ID 'container-slider' en el documento.
if (document.querySelector('#container-slider')) {
    // Establece un intervalo que llama a la función 'funcionEjecutar' con el argumento 'siguiente' cada 5000 milisegundos (5 segundos).
    setInterval('funcionEjecutar("siguiente")', 5000);
}

// Comprueba si hay un elemento con la clase 'listslider' en el documento.
if (document.querySelector('.listslider')) {
    // Obtiene todos los enlaces dentro de los elementos <li> con la clase 'listslider'.
    let link = document.querySelectorAll(".listslider li a");
    
    // Recorre todos los enlaces obtenidos.
    link.forEach(function(link) {
        // Añade un evento 'click' a cada enlace.
        link.addEventListener('click', function(e) {
            // Previene el comportamiento por defecto del enlace (navegar a la URL).
            e.preventDefault();
            
            // Obtiene el valor del atributo 'itlist' del enlace clicado.
            let item = this.getAttribute('itlist');
            
            // Divide el valor del atributo 'itlist' en un array usando el carácter '_' como separador.
            let arrItem = item.split("_");
            
            // Llama a la función 'funcionEjecutar' con el segundo elemento del array.
            funcionEjecutar(arrItem[1]);
            
            // Devuelve false para evitar cualquier acción adicional.
            return false;
        });
    });
}


let currentSlide = 0;

function moveSlide(direction) {
    const slides = document.querySelectorAll('.carousel-item');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;

    // Mover las imágenes
    const carousel = document.querySelector('.carousel');
    carousel.style.transform = `translateX(${-currentSlide * 100}%)`;
}


