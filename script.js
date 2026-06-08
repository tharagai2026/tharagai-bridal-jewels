const API_URL = "https://script.google.com/macros/s/AKfycbz7HnYYOUsofS0M1G8Gj4BrgKZEKFTkR-vCMhorLY1I1mHvGAEHHCbUjyewtB3fnjeF/exec";

async function loadProducts() {
    try {
        const response = await fetch(API_URL);
        const products = await response.json();

        const rentalContainer = document.getElementById("rentalProducts");
        const purchaseContainer = document.getElementById("purchaseProducts");

        if (!rentalContainer || !purchaseContainer) return;

        rentalContainer.innerHTML = "";
        purchaseContainer.innerHTML = "";

        products.forEach(product => {

            if (product.Status !== "Active") return;

            const card = document.createElement("div");
            card.className = "card";

            let price = "";

            if (product.Type === "RENT") {
                price = "₹" + product["Rental Price"] + " / Rental";
            } else {
                price = "₹" + product["Purchase Price"];
            }

            card.innerHTML = `
                <img src="${product["Thumbnail URL"]}" alt="${product["Product Name"]}">
                <h3>${product["Product Name"]}</h3>
                <p style="padding:0 20px 10px;text-align:center;">
                    ${product.Description}
                </p>
                <p style="padding:0 20px 20px;text-align:center;font-weight:600;color:#D4AF37;">
                    ${price}
                </p>
            `;

            if (product.Type === "RENT") {
                rentalContainer.appendChild(card);
            }

            if (product.Type === "BUY") {
                purchaseContainer.appendChild(card);
            }
        });

    } catch (error) {
        console.error("Error loading products:", error);
    }
}

loadProducts();
