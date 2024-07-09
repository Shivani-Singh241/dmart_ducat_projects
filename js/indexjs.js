let slideIndex = 0;
const slides = document.querySelectorAll(".slider");

// Function to show the current slide
function showSlide(n) {
    slideIndex = n;
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }
    if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex].style.display = "block";
    
}

// Function to move to the previous or next slide
function moveSlide(n) {
    showSlide(slideIndex + n);
}

// Initial display of first slide
showSlide(slideIndex);

// Automated slide change every 3 seconds
setInterval(function() {
    moveSlide(1);
}, 2000);

// Previous and Next buttons event listeners
document.getElementById("pre").addEventListener("click", function() {
    moveSlide(-1);
});

document.getElementById("next").addEventListener("click", function() {
    moveSlide(1);
});
  // JavaScript code for handling cart functionality
  let cart = JSON.parse(localStorage.getItem('cart')) || []

  // Function to update cart count in the navbar
  function updateCartCount() {
      const cartCount = document.querySelector('.cart-count');
      cartCount.textContent = cart.length;
      updateCartCount();
  }
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card');
            const productId = productCard.dataset.id; // Retrieve the product ID from data-id attribute
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = parseInt(productCard.querySelector('p').textContent.split(' ')[1]); // Parse price into integer

            addToCart(productId, productName, productPrice); // Pass productId, name, and price to addToCart function
        });
    });

    function addToCart(id, productName, price) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let found = false;

        // Check if item already exists in cart
        cart.forEach(item => {
            if (item.id === id) {
                item.quantity++;
                found = true;
            }
        });

        // If item is not found in cart, add it
        if (!found) {
            cart.push({ id: id, name: productName, price: price, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    function updateCartCount() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartCountElement = document.querySelector('.cart-count');
        let totalCount = 0;

        cart.forEach(item => {
            totalCount += item.quantity;
        });

        cartCountElement.textContent = totalCount;
    };
