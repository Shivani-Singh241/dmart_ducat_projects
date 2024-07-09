document.addEventListener('DOMContentLoaded', () => {
    const cartItemsElement = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to initialize product prices in localStorage
    function initializeProductPrices() {
        const storedPrices = JSON.parse(localStorage.getItem('productPrices'));
        if (!storedPrices) {
            const priceMap = {};
            products.forEach(product => {
                priceMap[product.id] = product.price;
            });
            localStorage.setItem('productPrices', JSON.stringify(priceMap));
        }
    }

    // Initialize product prices if not already stored
    initializeProductPrices();

    function updateCart() {
    // Clear previous cart items and update total price
    cartItemsElement.innerHTML = '';
    let totalPrice = 0;

    // Update cart items
    if (cart.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.textContent = "Your cart is empty.";
        cartItemsElement.appendChild(emptyMessage);
        totalPriceElement.textContent = "Total Price: ₹0";
    } else {
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            const productPrice = getProductPrice(item.id);
            console.log(item.id)
            const itemTotalPrice = productPrice * item.quantity;

            cartItem.innerHTML = `
                <span>${item.name} - ${productPrice} ₹</span><br><br>
                <button class="increase-btn" data-index="${index}">+</button>
                <span class="quantity">Quantity: ${item.quantity || 1}</span>
                <button class="decrease-btn" data-index="${index}">-</button><br><br>
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;
            cartItemsElement.appendChild(cartItem);

            // Event listener for increase button
            cartItem.querySelector('.increase-btn').addEventListener('click', () => {
                increaseQuantity(index);
            });

            // Event listener for decrease button
            cartItem.querySelector('.decrease-btn').addEventListener('click', () => {
                decreaseQuantity(index);
            });

            // Event listener for remove button
            cartItem.querySelector('.remove-btn').addEventListener('click', () => {
                removeFromCart(index);
            });

            // Accumulate total price for all items
            totalPrice += itemTotalPrice;
        });

        // Update total price display
        totalPriceElement.textContent = `Total Price: ₹${totalPrice.toFixed(2)}`;
    }
}


    function increaseQuantity(index) {
        if (cart[index]) {
            cart[index].quantity = (cart[index].quantity || 1) + 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart(); // Update UI
        }
    }

    function decreaseQuantity(index) {
        if (cart[index]) {
            if (cart[index].quantity <= 1) {
                // Remove item from cart if quantity is 1
                removeFromCart(index);
            } else if (cart[index].quantity > 1) {
                cart[index].quantity--;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCart(); // Update UI
            }
        }
    }

    function removeFromCart(index) {
        cart.splice(index, 1); // Remove the item at the specific index
        localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
        updateCart(); // Update UI
    }

    // Function to get product price from localStorage
    function getProductPrice(productId) {
        const priceMap = JSON.parse(localStorage.getItem('productPrices'));
        return priceMap[productId] || 0;
    }

    updateCart(); // Initial update on page load
});
