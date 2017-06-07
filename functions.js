/**
 * Created by SRUJAN on 5/22/2017.
 */

$(function () {
  var operation = "C"; //"C"=Ceate
  var selected_index = -1; // Index of the item selected in the list
  var tblPersons = localStorage.getItem("tblPersons"); //Return stored data
  tblPersons = JSON.parse(tblPersons); //Convert object to string
  if (tblPersons === null) // If there is no data, initialize an empty array
      tblPersons = [];

  function Create() {
    //Get the values ​​of the HTML and form them into String.
    var person = JSON.stringify({
      Username: $("#txtUserName").val(),
      Password: $("#txtPassword").val(),
      FirstName: $("#txtFn").val(),
      LastName: $("#txtLn").val(),
      Email: $("#txtEmail").val(),
      Gender: $("input[name=gender]:checked").val(),
      Location: $("#txtLocation").val()
    }); 
    //Add object to table
    tblPersons.push(person);
    //Store data in Local Storage
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons));
    alert("Data stored successfully!"); //Message
    return true;
  }

  function Edit() {
    // Edit the selected item in the table
    tblPersons[selected_index] = JSON.stringify({
        Username: $("#txtUserName").val(),
        Password: $("#txtPassword").val(),
        FirstName: $("#txtFn").val(),
        LastName: $("#txtLn").val(),
        Email: $("#txtEmail").val(),
        Gender: $("input[name=gender]:checked").val(),
        Location: $("#txtLocation").val()
    });
    //Store data in Local Storage
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons)); 
    alert("Data edited successfully!"); //Message
    return true;
  }

  function Delete() {
    //Delete the selected item in the table
    tblPersons.splice(selected_index, 1); 
    //Store data in Local Storage
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons)); 
    alert("Data deleted successfully!"); //Message
  }

  function List() {
    $("#tblList").html("");
    $("#tblList").html(
            "<thead>" +
            "<tr>" +                
            "<th>Username</th>" +
            "<th>Password</th>" +
            "<th>First Name</th>" +
            "<th>Last Name</th>" +
            "<th>Email</th>" +
            "<th>Gender</th>" +
            "<th>Location</th>" +
            "<th>Action</th>" +
            "</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
            ); //Add table to HTML structure
    for (var i in tblPersons) {
        var per = JSON.parse(tblPersons[i]);
        $("#tblList tbody").append("<tr>" +                    
                "<td>" + per.Username + "</td>" +
                "<td>" + per.Password + "</td>" +
                "<td>" + per.FirstName + "</td>" +
                "<td>" + per.LastName + "</td>" +
                "<td>" + per.Email + "</td>" +
                "<td>" + per.Gender + "</td>" +
                "<td>" + per.Location + "</td>" +
                "<td><img src='edit.png' alt='Edit" + i + "' class='btnEdit'/>&nbsp &nbsp<img src='delete.png' alt='Delete" + i + "' class='btnDelete'/></td>" +
                "</tr>"
                );
    } //Browse and add items to the HTML table
  }

  $("#frmPerson").bind("submit", function () {
    if (operation === "C")
        return Create();
    else
        return Edit();
  }); //Function to decide if you are adding or editing an item
  
  List();

  $(".btnEdit").bind("click", function () {
    operation = "E"; //"E" = Editor
    //Obtain the identifier of the item to be edited
    selected_index = parseInt($(this).attr("alt").replace("Edit", ""));
    // Convert from JSON to the appropriate format for editing data
    var per = JSON.parse(tblPersons[selected_index]); 
    $("#txtUserName").val(per.Username);
    $("#txtPassword").val(per.Password);
    $("#txtFn").val(per.FirstName);
    $("#txtLn").val(per.LastName);
    $("#txtEmail").val(per.Email);
    $("#txtGender").val(per.Gender);
    $("#txtLocation").val(per.Location);
    $("#txtUserName").focus();
  });

  $(".btnDelete").bind("click", function () {
    //Obtain the identifier of the item to be deleted
    selected_index = parseInt($(this).attr("alt").replace("Delete", "")); 
    Delete(); //Delete item
    List(); //Re-list the items in the table
  });
});

