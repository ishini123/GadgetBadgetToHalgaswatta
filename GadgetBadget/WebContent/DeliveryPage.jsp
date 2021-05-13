<%@page import="DeliveryModel.Delivery"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Delivery Management</title>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.2.1.min.js"></script>
<script src="Components/delivery.js"></script>
</head>
<body> 
<div class="container"><div class="row"><div class="col-6"> 
<h1>Delivery Management</h1>
<form id="formItem" name="formDelivery">
 	Order Id: 
 <input id="orderId" name="orderId" type="text" 
 class="form-control form-control-sm">
 <br> User Id: 
 <input id="userId" name="userId" type="text" 
 class="form-control form-control-sm">
 <br> Delivery Person Id: 
 <input id="deliveryPersionId" name="deliveryPersionId" type="text" 
 class="form-control form-control-sm">
  <br> payment Id: 
 <input id="paymentId" name="paymentId" type="text" 
 class="form-control form-control-sm">
  <br> Delivery Status: 
 <input id="status" name="status" type="text" 
 class="form-control form-control-sm">
  <br> address: 
 <input id="address" name="address" type="text" 
 class="form-control form-control-sm">
 <br>
 <input id="btnSave" name="btnSave" type="button" value="Save" 
 class="btn btn-primary">
 <input type="hidden" id="deliveryId" 
 name="deliveryId" >
</form>
<div id="alertSuccess" class="alert alert-success"></div>
<div id="alertError" class="alert alert-danger"></div>
<br>
<div id="divItemsGrid">
 <%
 Delivery po = new Delivery(); 
 out.print(po.readItems()); 
 %>
</div>
</div> </div> </div> 
</body>
</html>