$(document).ready(function () {
    var basket = [];
    var orderNumber = 1;

    // Function to check if the user is logged in
    function isLoggedIn() {
        return sessionStorage.getItem('isLoggedIn') === 'true';
    }

    // Function to display a message and redirect to the login page
    function displayMessageAndRedirect() {
        alert('Please login to place an order.'); // Display a message
        setTimeout(function () {
            window.location.href = 'login.html'; // Redirect to the login page after 1 second
        }, 1000);
    }

    // Function to add item to basket
    function addToBasket(productName, productPrice) {
        basket.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });

        $("#basketCount").text(basket.length);

        alert(productName + " added to basket!");
    }

    // Event listener for order button click
    $('.order-btn').click(function (e) {
        e.preventDefault();

        var productName = $(this).closest(".product").find(".product-name").text();
        var productPrice = parseFloat($(this).closest(".product").find(".price").text().replace('$', ''));

        // Check if the user is logged in
        if (isLoggedIn()) {
            // If logged in, add item to basket
            addToBasket(productName, productPrice);
        } else {
            // If not logged in, display message and redirect to login page
            displayMessageAndRedirect();
        }
    });

    $(".basket").click(function () {
        updateBasketDisplay();
        $("#basketModal").show();
    });

    $(document).on("input", ".item-quantity", function () {
        var index = $(this).data("index");
        var quantity = $(this).val();

        basket[index].quantity = quantity;
        updateBasketDisplay();
    });

    $(document).on("click", ".remove-item", function () {
        var index = $(this).data("index");
        basket.splice(index, 1);
        updateBasketDisplay();
        $("#basketCount").text(basket.length);
    });

    function updateBasketDisplay() {
        var orderItemsContainer = $("#orderItems");
        orderItemsContainer.empty();

        basket.forEach(function (item, index) {
            var itemDiv = `
                <div class="order-item">
                    <span>${item.name}</span>
                    <span class="item-price" tyle="margin-right:5px">$${(item.price * item.quantity).toFixed(2)}</span>
                    <input style="padding:7px" type="number" min="1" value="${item.quantity}" data-index="${index}" class="item-quantity">
                    <button style="width:90px;margin-left:10px;" class="remove-item" data-index="${index}">Remove</button>
                </div>
            `;
            orderItemsContainer.append(itemDiv);
        });

        var totalPriceDiv = `
            <div class="total-price">
                <span>Total: $<span id="totalPrice">${calculateTotalPrice().toFixed(2)}</span></span>
            </div>
        `;
        orderItemsContainer.append(totalPriceDiv);
    }

    function calculateTotalPrice() {
        return basket.reduce(function (total, item) {
            return total + (item.price * item.quantity);
        }, 0);
    }

    $(".close").click(function () {
        $("#basketModal").hide();
    });

    $("#checkoutBtn").click(function () {
        $("#basketModal").hide();
        $("#paymentModal").show();
    });

    $(".close-payment").click(function () {
        $("#paymentModal").hide();
    });

    $(document).on("submit", "#paymentForm", function (e) {
        e.preventDefault();

        var cardNumber = $("#cardNumber").val();
        var ownerName = $("#ownerName").val();
        var expiryDate = $("#expiryDate").val();
        var cvv = $("#cvv").val();
        var address = $("#address").val();

        if (cardNumber.length !== 16 || cvv.length !== 3) {
            alert("Invalid card number or CVV.");
            return;
        }

        $("#paymentModal").hide();
        displayThankYouMessage(ownerName, orderNumber);
        basket = [];
        $("#basketCount").text(basket.length);
        orderNumber++;

        $("#paymentForm")[0].reset();
    });

    function displayThankYouMessage(ownerName, orderNumber) {
        var thankYouModal = `
            <div id="thankYouModal" class="modal">
                <div class="modal-content">
                    <span class="close-thank-you">&times;</span>
                    <h2>Thank You, ${ownerName}!</h2>
                    
                    <p>Your order will be delivered in a moment.</p>
                </div>
            </div>
        `;
        $("body").append(thankYouModal);
        $("#thankYouModal").show();

        $(".close-thank-you").click(function () {
            $("#thankYouModal").remove();
        });

        $(window).click(function (event) {
            if ($(event.target).is("#thankYouModal")) {
                $("#thankYouModal").remove();
            }
        });
    }

    $(window).click(function (event) {
        if ($(event.target).is("#basketModal")) {
            $("#basketModal").hide();
        }
    });

    $(window).click(function (event) {
        if ($(event.target).is("#paymentModal")) {
            $("#paymentModal").hide();
        }
    });
});
