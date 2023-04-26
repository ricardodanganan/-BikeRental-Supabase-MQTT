// This file contains the code for the View Bikes button 
document.getElementById("view-bikes").addEventListener("click", openModal);
window.addEventListener("click", closeModalOnClickOutside);

// Function to open the modal and fetch the products
function openModal() {
    fetchProducts();
    document.getElementById("shop-modal").style.display = "block";
}

// Function to close the modal when the user clicks outside of the modal
function closeModalOnClickOutside(event) {
    const modal = document.getElementById("shop-modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}