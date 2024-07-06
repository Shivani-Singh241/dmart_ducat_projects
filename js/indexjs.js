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
}, 3000);

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
  }

  // Function to handle adding product to cart
  function addToCart(productName, price) {
      cart.push({ name: productName, price: price });
      localStorage.setItem('cart',JSON.stringify(cart));
      updateCartCount();
  }

  // Event listener for add to cart buttons
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
      button.addEventListener('click', () => {
          const productCard = button.closest('.product-card');
          const productName = productCard.querySelector('h3').textContent;
          const productPrice = productCard.querySelector('p').textContent.split(' ')[1]; // Assuming price is formatted as "Price: ₹xxx"
          addToCart(productName, productPrice);
      });
  });
  updateCartCount();

