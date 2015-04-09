function parseInit() {
    Parse.initialize("4t3AwcQGddd2DQMPJRFFGjVrUQCyicl8QdrUUqY5", "FHuYBidLocVSs3Pv7U64aYeJMqgzCvRQOyMhkcSt");
}

function submitRegistration() {
  var firstname = document.getElementById("firstname").value;
  var lastname = document.getElementById('lastname').value;
  var address1 = document.getElementById('address1').value;
  var address2 = document.getElementById('address2').value;
  var city = document.getElementById('city').value;
  var state = document.getElementById('state').value;  
  var zip = document.getElementById('zip').value;
  var country = document.getElementById('country').value;
  var date = getFormattedDate();

  var errorList = new Array();
  var submitBool = true;



  if(isEmpty(firstname)) {
    submitBool = false;
    errorList.push("Missing First Name"); 
  } else if(!alphabetical(firstname)) {
    submitBool = false;
    errorList.push("Non alphabetical First Name"); 
  }  

  if(isEmpty(lastname)) {
    submitBool = false;
    errorList.push("Missing Last Name"); 
  } else if(!alphabetical(lastname)) {
    submitBool = false;
    errorList.push("Non alphabetical Last Name"); 
  }   

  if(isEmpty(address1)) {
    submitBool = false;
    errorList.push("Missing Address 1"); 
  } else if(!alphanumeric(address1)) {
    submitBool = false;
    errorList.push("Non alphanumeric Address 1"); 
  }  

  if(!isEmpty(address2) && !alphanumeric(address2)) {
    submitBool = false;
    errorList.push("Non alphabetical Address 2"); 
  }  

  if(isEmpty(city)) {
    submitBool = false;
    errorList.push("Missing City"); 
  } else if(!alphabetical(city)) {
    submitBool = false;
    errorList.push("Non alphabetical City"); 
  }

  if(zip.length != 5 && zip.length != 9) {
    submitBool = false;
    errorList.push("Incorrect length of Zip"); 
  } else if(!numerical(zip)) {
    submitBool = false;
    errorList.push("Non numeric Zip"); 
  }  

  event.preventDefault(); 

  if(submitBool) {
    parseInit();
    var Registration = Parse.Object.extend("RegistrationForm");
    var registerUser = new Registration();

    registerUser.set("firstname", firstname);
    registerUser.set("lastname", lastname);
    registerUser.set("address1", address1);
    registerUser.set("address2", address2);
    registerUser.set("city", city);
    registerUser.set("state", state); 
    registerUser.set("zip", zip);
    registerUser.set("country", country);
    registerUser.set("date", date);


    registerUser.save(null, {
      success: function(registerUser) {
        // Execute any logic that should take place after the object is saved.
        // alert('New object created with objectId: ' + registerUser.id);

        document.getElementById("message").innerHTML = "User " + firstname + " " + lastname + " has been successfully been created at " + date;
        document.getElementById("message").style.display = 'block';
        document.getElementById("registration").reset();
      },
      error: function(registerUser, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        document.getElementById("message").innerHTML = "Failed to create new object, with error code: " + error.message;
        document.getElementById("message").style.display = 'block';
      }
    });
  } else {
    document.getElementById("message").innerHTML = "Error:<ul>";
    document.getElementById("message").style.display = 'block';
    for(var i = 0; i < errorList.length; i++) {
      document.getElementById("message").innerHTML = document.getElementById("message").innerHTML + "<li>" + errorList[i] + "</li>";
    }  
    document.getElementById("message").innerHTML = document.getElementById("message").innerHTML + "</ul>";  
  }
  return false;
}

function displayUsers() {
  parseInit();
  var Registration = Parse.Object.extend("RegistrationForm");
  var query = new Parse.Query(Registration);
  query.descending("date");
  query.find({
    success: function(results) {
      // alert("Successfully retrieved " + results.length + " scores.");
      // Do something with the returned Parse.Object values
 
      for (var i = 0; i < results.length; i++) { 
        var object = results[i];

        document.getElementById("users").innerHTML = document.getElementById("users").innerHTML + "<tr><td>" + object.get("firstname") + "</td>" + 
                                                                                                  "<td>" + object.get("lastname") + "</td>" +
                                                                                                  "<td>" + object.get("address1") + "</td>" +
                                                                                                  "<td>" + object.get("address2") + "</td>" +
                                                                                                  "<td>" + object.get("city") + "</td>" +
                                                                                                  "<td>" + object.get("state") + "</td>" +       
                                                                                                  "<td>" + object.get("zip") + "</td>" +  
                                                                                                  "<td>" + object.get("country") + "</td>" +
                                                                                                  "<td>" + object.get("date") + "</td></tr>";
      }


    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });
}
function getFormattedDate() {
    var date = new Date();
    var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    return str;
}
function isEmpty(textToTest) {
  return textToTest == "" ? true : false;
}
function alphabetical(textToTest)
{ 
  if(textToTest.match(/^[A-Za-z\s]+$/)) {
    return true;
  } else {
   return false;
  }
}
function alphanumeric(textToTest)
{ 
  if(textToTest.match(/^[0-9a-zA-Z\s]+$/)) {
    return true;
  } else {
    return false;
  }
}
function numerical(textToTest)
{ 
  if(textToTest.match(/^[0-9]+$/)) {
    return true;
  }
  else {
    return false;
  }
}
