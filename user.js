function validate() {
  var letters = /^[A-Z a-z ]+$/;
  var userForm = document.getElementById("userForm");
  var name = userForm["userName"].value;
  var email = userForm["userEmail"].value;
  var password = userForm["userPassword"].value;
  var birthDate = userForm["userBirthdate"].value;
  var atPostion = email.indexOf("@");
  var pointPosition = email.indexOf(".");
  if (name == "" || !name.match(letters)) {
    alert("Name Invalid");
    return false;
  } else if (
    email == "" ||
    atPostion < 2 ||
    atPostion + 2 > pointPosition ||
    pointPosition + 2 > email.length
  ) {
    alert("E-mail Invalid");
    return false;
  } else if (password == "") {
    alert("passsword is empty");
    return false;
  } else if (birthDate == "") {
    alert("BirthDate Required");
    return false;
  } else {
      var returnObject={};
      returnObject["name"]=name;
      returnObject["email"]=email;
      returnObject["password"]=password;
      returnObject["birthDate"]=birthDate;
    return returnObject;
  }
}
function add_user() {
  var returnObject = validate();
  if (returnObject) {
    var adduser = new addUser(
      returnObject.name,
      returnObject.email,
      returnObject.password,
      returnObject.birthDate,
      calcAge(returnObject.birthDate)
    );
    adduser.storeUser();
    display();
  }
}
function calcAge(birthDate) {
  var d = new Date();
  tempDate = birthDate.split("/");
  return d.getFullYear() - tempDate[2];
}
class addUser {
  constructor(name, email, password, birthDate, age) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.birthDate = birthDate;
    this.age = age;
  }
  storeUser() {
    var users = new Array();
    var getUser = JSON.parse(localStorage.getItem("users"));
    if (getUser !== null) {
      users = getUser;
    }
    users.push(this);
    localStorage.setItem("users", JSON.stringify(users));
  }
}
display();
function display() {
  var users = JSON.parse(localStorage.getItem("users"));
  var table =
    "<table><tr><td>Name</td><td>Email</td><td>Password</td><td>Birtdate</td><td>Age</td><td>Actions</td></tr>";
  if (users == null) {
    table += "<tr><td>No Data Found</td></tr>";
  } else {
    for (var i = 0; i < users.length; i++) {
      table +=
        "<tr><td>" +
        users[i].name +
        "</td><td>" +
        users[i].email +
        "</td><td>" +
        users[i].password +
        "</td><td>" +
        users[i].birthDate +
        "</td><td>" +
        users[i].age +
        "</td><td><button onclick='updateUser(" +
        i +
        ")'>Edit</button> <button onclick='deleteUser(" +
        i +
        ")'>Delete</a></td></tr>";
    }
  }
  table += "</table>";
  document.getElementById("userTable").innerHTML = table;
}
function updateUser(userNo) {
  var user = JSON.parse(localStorage.getItem("users"))[userNo];
  document.getElementById("userName").value = user.name;
  document.getElementById("userEmail").value = user.email;
  document.getElementById("userPassword").value = user.password;
  document.getElementById("userBirthdate").value = user.birthDate;
  document.getElementById("title_user").innerHTML = "Update User";
  document.getElementById("userButton").innerHTML ="<input type='button' onclick='updateUserButton("+userNo+")' value='Update User'>";
}
function updateUserButton(userNo) {
    
  var returnObject = validate();
  if (returnObject) {
    var updatedUsers = new Array();
    var allUsers = JSON.parse(localStorage.getItem("users"));
    for (i = 0; i < allUsers.length; i++) {
      if (i !== userNo) {
        updatedUsers.push(allUsers[i]);
      }
      else
      {
        var adduser = new addUser(returnObject.name,returnObject.email,returnObject.password,returnObject.birthDate,calcAge(returnObject.birthDate));
          updatedUsers.push(adduser);
      }
    }
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    display();
    window.location.href="user.html";
      
  }
}
function deleteUser(userNo) {
  var updatedUsers = new Array();
  var oldUsers = JSON.parse(localStorage.getItem("users"));
  for (i = 0; i < oldUsers.length; i++) {
    if (i !== userNo) {
      updatedUsers.push(oldUsers[i]);
    }
  }
  localStorage.setItem("users", JSON.stringify(updatedUsers));
  display();
}
