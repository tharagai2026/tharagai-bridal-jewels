const API_URL =
"https://script.google.com/macros/s/AKfycbz7HnYYOUsofS0M1G8Gj4BrgKZEKFTkR-vCMhorLY1I1mHvGAEHHCbUjyewtB3fnjeF/exec";

async function loadProducts() {

    try {

        const response = await fetch(API_URL);

        const products = await response.json();

        const rentalContainer =
            document.getElementById("rentalProducts");

        const purchaseContainer =
            document.getElementById("purchaseProducts");

        rentalContainer.innerHTML = "";
        purchaseContainer.innerHTML = "";

        products.forEach(product => {

            if (product.Status !== "Active")
                return;

            const card = document.createElement("div");

            card.className = "card";

            card.innerHTML = `
                <img src="${product["Thumbnail URL"]}" alt="">
                <h3>${product["Product Name"]}</h3>
                <p style="padding:0 20px 20px;text-align:center;">
                    ${product.Description}
                </p>
            `;

            if (product.Type === "RENT") {
                rentalContainer.appendChild(card);
            }

            if (product.Type === "BUY") {
                purchaseContainer.appendChild(card);
            }

        });

    }
    catch(error) {

        console.error(error);

    }
}

loadProducts();
