$(document).ready(function () {
    if ($("#alertSuccess").text().trim() == "") {
        $("#alertSuccess").hide();
    }
    $("#alertError").hide();
});
$(document).on("click", "#btnSave", function (event) {
    // Clear alerts---------------------
    $("#alertSuccess").text("");
    $("#alertSuccess").hide();
    $("#alertError").text("");
    $("#alertError").hide();
    // Form validation-------------------
    var status = validateItemForm();
    if (status != true) {
        $("#alertError").text(status);
        $("#alertError").show();
        return;
    }
    // If valid------------------------
    var type = ($("#hidItemIDSave").val() == "") ? "POST" : "PUT";
    $.ajax(
        {
            url: "PaymentDeliveryService/payment",
            type: type,
            data: $("#formItem").serialize(),
            dataType: "text",
            complete: function (response, status) {
                onItemSaveComplete(response.responseText, status);
            }
        });
});

function onItemSaveComplete(response, status) {
    if (status == "success") {
        
            $("#alertSuccess").text(response);
            $("#alertSuccess").show();

      
    } else if (status == "error") {
        $("#alertError").text("Error while saving.");
        $("#alertError").show();
    } else {
        $("#alertError").text("Unknown error while saving..");
        $("#alertError").show();
    }
    $("#hidItemIDSave").val("");
    $("#formItem")[0].reset();
}

$(document).on("click", ".btnUpdate", function (event) {
    $("#hidItemIDSave").val($(this).data("paymentId"));
    $("#userId").val($(this).closest("tr").find('td:eq(0)').text());
    $("#orderId").val($(this).closest("tr").find('td:eq(1)').text());
    $("#amount").val($(this).closest("tr").find('td:eq(2)').text());

});

$(document).on("click", ".btnRemove", function (event) {
    $.ajax(
        {
            url: "ItemsAPI",
            type: "DELETE",
            data: "itemID=" + $(this).data("itemid"),
            dataType: "text",
            complete: function (response, status) {
                onItemDeleteComplete(response.responseText, status);
            }
        });
});

function onItemDeleteComplete(response, status) {
    if (status == "success") {
        var resultSet = JSON.parse(response);
        if (resultSet.status.trim() == "success") {
            $("#alertSuccess").text("Successfully deleted.");
            $("#alertSuccess").show();
            $("#divItemsGrid").html(resultSet.data);
        } else if (resultSet.status.trim() == "error") {
            $("#alertError").text(resultSet.data);
            $("#alertError").show();
        }
    } else if (status == "error") {
        $("#alertError").text("Error while deleting.");
        $("#alertError").show();
    } else {
        $("#alertError").text("Unknown error while deleting..");
        $("#alertError").show();
    }
}
function validateItemForm() {
    // amount
    if ($("#amount").val().trim() == "") {
        return "Insert total price.";
    }
    // order id
    if ($("#orderId").val().trim() == "") {
        return "Insert order Id.";
    } 9
    // user id-------------------------------
    if ($("#userId").val().trim() == "") {
        return "Insert userId.";
    }
    // is numerical value
    var amount = $("#amount").val().trim();
    if (!$.isNumeric(amount)) {
        return "Insert a numerical value for Price.";
    }
    // convert to decimal price
    $("#amount").val(parseFloat(amount).toFixed(2));
    
    return true;
}
