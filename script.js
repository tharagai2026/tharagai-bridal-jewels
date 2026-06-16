const PRODUCTS_API =
"https://sheetdb.io/api/v1/5rewa63efh5wi?sheet=PRODUCTS";

const GALLERY_API =
"https://sheetdb.io/api/v1/5rewa63efh5wi?sheet=PRODUCT_GALLERY";

let galleryData = [];
let currentImages = [];
let currentIndex = 0;
let currentProductId = "";
let currentProductName = "";
let productsData = [];

async function loadProducts() {

    try {

        const productResponse = await fetch(PRODUCTS_API);
        productsData = await productResponse.json();
        const products = productsData;

        const galleryResponse = await fetch(GALLERY_API);
        galleryData = await galleryResponse.json();

        const rentalContainer =
            document.getElementById("rentalProducts");

        const purchaseContainer =
            document.getElementById("purchaseProducts");
        const featuredContainer =
            document.getElementById("featuredProducts");

        rentalContainer.innerHTML = "";
purchaseContainer.innerHTML = "";

if(featuredContainer){
    featuredContainer.innerHTML = "";
}

        products.forEach(product => {

            if (product.Status !== "Active") return;

            const card = document.createElement("div");
            card.className = "card";

            let price = "";

            if (product.Type === "RENT") {

                price =
                    "₹" +
                    product["Rental Price"] +
                    " / Rental";

            } else {

                price =
                    "₹" +
                    product["Purchase Price"];

            }

            card.innerHTML = `
                <img src="${product["Thumbnail URL"]}" alt="${product["Product Name"]}">

                <h3>${product["Product Name"]}</h3>

                <p style="padding:0 20px 10px;text-align:center;">
                    ${product.Description || ""}
                </p>

                <p style="
                    padding:0 20px 20px;
                    text-align:center;
                    font-weight:600;
                    color:#D4AF37;">
                    ${price}
                </p>

                <button
                    onclick="openGallery('${product["Product ID"]}')"
                    style="
                        margin-top:10px;
                        padding:12px 24px;
                        background:#D4AF37;
                        color:white;
                        border:none;
                        border-radius:30px;
                        cursor:pointer;
                        font-weight:600;
                    ">
                    View Gallery
                </button>
            `;

            if (
    product.Featured &&
    product.Featured.toUpperCase() === "YES"
) {

    const featuredCard =
        card.cloneNode(true);

    featuredCard.classList.add(
        "featured-card"
    );

    if(featuredContainer){
        featuredContainer.appendChild(
            featuredCard
        );
    }
}

if (product.Type === "RENT") {

    rentalContainer.appendChild(card);

} else {

    purchaseContainer.appendChild(card);

}

        });

    } catch(error) {

        console.error("Error loading products:", error);

    }
}

function openGallery(productId){

    currentProductId = productId;

const productInfo = productsData.find(
    p => p["Product ID"] === productId
);

currentProductName =
    productInfo?.["Product Name"] || productId;
    document.getElementById("popupTitle").innerText =
    productInfo["Product Name"];

let popupPrice = "";

if(productInfo.Type === "RENT"){

    popupPrice =
        "Rental ₹" +
        productInfo["Rental Price"];

}else{

    popupPrice =
        "Purchase ₹" +
        productInfo["Purchase Price"];

}

document.getElementById("popupPrice").innerText =
    popupPrice;

document.getElementById("popupDescription").innerText =
    productInfo.Description || "";
    currentImages = galleryData
        .filter(item => item["Product ID"] === productId)
        .map(item => item["Image URL"]);

    if(currentImages.length === 0){

        alert("No gallery images found");
        return;

    }

    currentIndex = 0;

    document.getElementById("galleryModal").style.display = "flex";

    document.getElementById("galleryImage").src =
        currentImages[currentIndex];

   const whatsappMessage =
`Hi Tharagai Bridal Jewels,

I am interested in:

Product: ${currentProductName}
Product ID: ${productId}

Please share:

• Availability
• Pricing Details
• Booking Process

Thank you.`;

document.getElementById("whatsappBtn").href =
`https://wa.me/919000000000?text=${encodeURIComponent(whatsappMessage)}`;
}

document
.getElementById("nextBtn")
.addEventListener("click", () => {

    currentIndex++;

    if(currentIndex >= currentImages.length){

        currentIndex = 0;

    }

    document.getElementById("galleryImage").src =
        currentImages[currentIndex];

});

document
.getElementById("prevBtn")
.addEventListener("click", () => {

    currentIndex--;

    if(currentIndex < 0){

        currentIndex = currentImages.length - 1;

    }

    document.getElementById("galleryImage").src =
        currentImages[currentIndex];

});

document
.querySelector(".close-gallery")
.addEventListener("click", () => {

    document.getElementById("galleryModal").style.display = "none";

});

window.addEventListener("click", function(event){

    const modal = document.getElementById("galleryModal");

    if(event.target === modal){

        modal.style.display = "none";

    }

});

loadProducts();
