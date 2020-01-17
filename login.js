function admin_check()
{
    var admin=localStorage.getItem("admin");
    if(admin!==null)
    {
        document.getElementById("register").disabled=true;
    }
}
admin_check();
function login_check()
{
    var email=document.getElementById('email').value;
    var password=document.getElementById('password').value;
    var admin=JSON.parse(localStorage.getItem("admin"));
    console.log(admin);
    if(admin.email==email)
    {

        if(password===admin.password)
        {
            alert("Login Successfull");
            localStorage.setItem("current_user",admin.name);
            window.location.href="frame.html";
        }
        else{
            alert("Invalid Password");
        }

    }
    else{
    var user=JSON.parse(localStorage.getItem("users"));
    if(user!==null)
    {
    for(var i=0;i<user.length;i++)
    {
        if(email===user[i].email)
        {
            
            if(password===user[i].password)
            {
                alert("Login Successfull");
                localStorage.setItem("current_user",user[i].name);
                window.location.href="userDashboard.html";
            }
            else{
                alert("Invalid Password");
                break;
            }
        }
    }
}
else
{
    alert("Invalid User");
}
}

}