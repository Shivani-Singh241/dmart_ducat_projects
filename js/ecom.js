$('.thumbnail').on('click', function() {
    // Get the src of the clicked thumbnail
    var newSrc = $(this).attr('src');
    
    // Set the src of the main image to the new src
    $('#mainImage').attr('src', newSrc);
});

document.addEventListener("DOMContentLoaded", function() {
const listItems = document.querySelectorAll("#myList li");
const contentDisplay = document.getElementById("contentDisplay");

listItems.forEach(item => {
item.addEventListener("mouseover", function() {
const content = item.getAttribute("data-content");
contentDisplay.textContent = content;
});

item.addEventListener("mouseout", function() {
contentDisplay.textContent = "Vermicompost is a nutrient rich organic supplement used in home gardening for healthy & fast growth of plant.";
});
});
});