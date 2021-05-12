package DeliveryModel;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.time.LocalDate;

public class Delivery {
	
	//This Method provides a proper Database Connection
	private Connection connect()
	{
		Connection mySQLconnection = null;
		
		try
		{
			Class.forName("com.mysql.jdbc.Driver");

			mySQLconnection = DriverManager.getConnection("jdbc:mysql://localhost:3306/paymentDb", "root", "123");
			
		 }
		 catch (Exception e)
		 {
			 e.printStackTrace();
		 }
		
		 	return mySQLconnection;
		 	
		 }
	
	//This Method allows to Insert new Products to the Catalogue
	
	public String insertDelivery( String orderId, String paymentId, String userId, String address, String deliveryPersonId, String status)
	{
		String operationStatus = "";
		
	 try
	 {
		 Connection mySQLconnection = connect();
		 
		 if (mySQLconnection == null)
		 {
			 
			 return "Database Connection Failed. Insert Operation Failed!";
			 
		 }
		 
		 
	 
	 String sql_statement = " insert into delivery (`deliveryId`, `paymentId`,`orderId`,`userId`,`deliveryPersonId`, `address`, `status`, `updatedDate`)"
	 + " values (?, ?, ?, ?, ?, ?, ?, ?)";
	 
	 PreparedStatement preparedStmt = mySQLconnection.prepareStatement(sql_statement);
	 
	 String updatedDate = LocalDate.now().toString();
	 
	 preparedStmt.setInt(1, 0);
	 preparedStmt.setInt(2, Integer.parseInt(paymentId));
	 preparedStmt.setString(3, orderId);
	 preparedStmt.setString(4, userId);
	 preparedStmt.setString(5, deliveryPersonId);
	 preparedStmt.setString(6, address);
	 preparedStmt.setString(7, status);
	 preparedStmt.setString(8, updatedDate);
	
	 
	 preparedStmt.execute();
	 mySQLconnection.close();
	 
	 operationStatus = "Delivery record Inserted Successfully";
	 
	 }
	 catch (Exception e)
	 {
		 
		 operationStatus = "Something went wrong! Plese Check the Details...";
		 System.err.println(e.getMessage());
	 }
	 
	 	return operationStatus;
	 	
	 }
	
	public String readItems()
	 {
	 String output = "";
	 try
	 {
	 Connection con = connect();
	 if (con == null)
	 {return "Error while connecting to the database for reading."; }
	 // Prepare the html table to be displayed
	 output = "<table border='1'><tr><th>Delivery Id </th><th>Payment Id</th> <th>Order Id</th> <th>User Id</th>" +
	 "<th>Delivery Person Id</th>" +
	 "<th>Address</th>" + "<th>Status</th> <th>Updated Date</th>" + 
	 "<th>Update</th><th>Remove</th></tr>";
	 String query = "select * from delivery";
	 Statement stmt = con.createStatement();
	 ResultSet rs = stmt.executeQuery(query);
	 // iterate through the rows in the result set
	 while (rs.next())
	 {
	 String paymentId = Integer.toString(rs.getInt("paymentId"));
	 String deliveryId = Integer.toString(rs.getInt("deliveryId"));
	 String orderId = rs.getString("orderId");
	 String userId = rs.getString("userId");
	 String address = rs.getString("address");
	 String deliveryPersonId = rs.getString("deliveryPersonId");
	 String status = rs.getString("status");
	 String updatedDate = rs.getString("updatedDate");

	 
	 
	 // Add into the html table
	 output += "<tr><td>" + deliveryId + "</td>";
	 output += "<td>" + paymentId + "</td>";
	 output += "<td>" + orderId + "</td>";
	 output += "<td>" + userId + "</td>";
	 
	 output += "<td>" + deliveryPersonId + "</td>";
	 output += "<td>" + address + "</td>";
	 output += "<td>" + status + "</td>";
	 output += "<td>" + updatedDate + "</td>";
	 // buttons
	 
	 output += "<td><input name='btnUpdate' type='button' value='Update' "
				+ "class='btnUpdate btn btn-secondary' data-itemid='" + deliveryId + "'></td>"
				+ "<td><input name='btnRemove' type='button' value='Remove' "
				+ "class='btnRemove btn btn-danger' data-itemid='" + deliveryId + "'></td></tr>"; 
	 }
	 con.close();
	 
	 // Complete the html table
	 output += "</table>";
	 }
	 catch (Exception e)
	 {
	 output = "Error while reading the deliveries.";
	 System.err.println(e.getMessage());
	 }
	 return output;
	 }

	public String updateDelivery(String deliveryId, String orderId, String paymentId, String userId, String address, String deliveryPersonId, String status)
	
	 {
	 String output = "";
	 try
	 {
	 Connection con = connect();
	 if (con == null)
	 {return "Error while connecting to the database for updating."; }
	 // create a prepared statement
	 
	 
	 String query = " update delivery set orderId= ? , paymentId = ? , userId = ? , address = ?, deliveryPersonId = ?, status= ?"
	 		+ "  where deliveryId = ? ";
		
	 PreparedStatement preparedStmt = con.prepareStatement(query);
	 // binding values
	 preparedStmt.setString(1, orderId);
	 preparedStmt.setInt(2, Integer.parseInt(paymentId));
	 preparedStmt.setString(3, userId);
	 preparedStmt.setString(4, address);
	 preparedStmt.setString(5, deliveryPersonId);
	 preparedStmt.setString(6, status);
	 preparedStmt.setInt(7, Integer.parseInt(deliveryId));
	 // execute the statement
	 preparedStmt.execute();
	 con.close();
	 output = "Updated successfully";
	 }
	 catch (Exception e)
	 {
	 output = "Error while updating the delivery information.";
	 System.err.println(e.getMessage());
	 }
	 return output;
	 }
	public String deleteDeliveryEntry(String deliveryId)
	 {
	 String output = "";
	 try
	 {
	 Connection con = connect();
	 if (con == null)
	 {return "Error while connecting to the database for deleting."; }
	 // create a prepared statement
	 String query = "delete from delivery where deliveryId=?";
	 PreparedStatement preparedStmt = con.prepareStatement(query);
	 // binding values
	 preparedStmt.setInt(1, Integer.parseInt(deliveryId));
	 // execute the statement
	 preparedStmt.execute();
	 con.close();
	 output = "Deleted successfully";
	 }
	 catch (Exception e)
	 {
	 output = "Error while deleting the delivery entry.";
	 System.err.println(e.getMessage());
	 }
	 return output;
	 }
	
}

