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
    var type = ($("#deliveryId").val() == "") ? "POST" : "PUT";
    $.ajax(
        {
            url: "PaymentDeliveryService/delivery",
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
    $("#deliveryId").val("");
    $("#formItem")[0].reset();
}

$(document).on("click", ".btnUpdate", function (event) {
    $("#deliveryId").val($(this).data("deliveryId"));
    $("#deliveryId").val($(this).closest("tr").find('td:eq(0)').text());
    $("#paymentId").val($(this).closest("tr").find('td:eq(1)').text());
    $("#orderId").val($(this).closest("tr").find('td:eq(2)').text());
    $("#userId").val($(this).closest("tr").find('td:eq(3)').text());
    $("#deliveryPersionId").val($(this).closest("tr").find('td:eq(4)').text());
    $("#address").val($(this).closest("tr").find('td:eq(5)').text());
    $("#status").val($(this).closest("tr").find('td:eq(6)').text());
    $("#updatedDate").val($(this).closest("tr").find('td:eq(7)').text());


});

$(document).on("click", ".btnRemove", function (event) {
    var datax = {
        deliveryId: `${$(this).closest("tr").find('td:eq(0)').text()}`
    }

    $.ajax(
        {
            url: "PaymentDeliveryService/delivery",
            type: "DELETE",
            data: JSON.stringify(datax),
            dataType: 'json',
            contentType: 'application/json',
            complete: function (response, status) {
                onItemDeleteComplete(response, status);
            }
        });
});
function onItemDeleteComplete(response, status) {
    if (response.status == 200) {

        $("#alertSuccess").text(response.responseText);
        $("#alertSuccess").show();


    } else if (status == "error") {
        $("#alertError").text("Error while deleting.");
        $("#alertError").show();
    } else {
        $("#alertError").text("Unknown error while deleting..");
        $("#alertError").show();
    }
    $("#deliveryId").val("");
    $("#formItem")[0].reset();
}
function validateItemForm() {
    // amount
    if ($("#paymentId").val().trim() == "") {
        return "Insert paymentId.";
    }
    // order id
    if ($("#orderId").val().trim() == "") {
        return "Insert order Id.";
    }
    // user id-------------------------------
    if ($("#userId").val().trim() == "") {
        return "Insert userId.";
    }
    // deliveryPerson id-------------------------------
    if ($("#deliveryPersionId").val().trim() == "") {
        return "Insert Delivery person id.";
    }

    // status -------------------------------
    if ($("#status").val().trim() == "") {
        return "Insert status.";
    }

    // address-------------------------------
    if ($("#address").val().trim() == "") {
        return "Insert address.";
    }

    return true;
}
