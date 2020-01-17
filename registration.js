function registration()
{
    var letters = /^[A-Z a-z ]+$/;
    var form=document.getElementById("register_form");
    var name=form['adminName'].value;
    var email=form['adminEmail'].value;
    var password=form['adminPassword'].value;
    var coPassword=form['adminCoPassword'].value;
    var city=form['city'].value;
    var state=form['state'].value;
    var atPostion = email.indexOf('@');
    var pointPosition = email.indexOf('.');
    if(name=="" || !name.match(letters))
    {
        alert("Name Invalid");
    }
    else if(email == "" || atPostion < 2 || atPostion + 2 > pointPosition || pointPosition + 2 > email.length)
    {
        alert("E-mail Invalid");
    }
    else if(password=="")
    {
        alert("passsword is empty");
    }
    else if(password!==coPassword)
    {
        alert("Password does not match");
    }
    else if(!form['terms'].checked)
    {
        alert("Terms And Conditions not checked");
    }
    else
    {
        var Newadmin=new admin(name,email,password,city,state);
        Newadmin.setStorage();
        alert("Registered Successfully");
        window.location.href="login.html";
    }
}

class admin{
    constructor(name,email,password,city,state)
    {
        this.name=name;
        this.email=email;
        this.password=password;
        this.city=city;
        this.state=state;
        this.type="admin";
    }
    setStorage()
    {
        
        localStorage.setItem("admin",JSON.stringify(this));
    }
}