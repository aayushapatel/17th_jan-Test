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
    var users=JSON.parse(localStorage.getItem("users"));
    var allUsers=new Array();
    var cnt=0;
    if(users!==null)
    {
    for(var i=0;i<users.length;i++)
    {
        
        if(email===users[i].email)
        {
            
            if(password===users[i].password)
            {
                alert("Login Successfull");

                localStorage.setItem("current_user",users[i].name);
                cnt=1;
                users[i].loginTime=new Date();
                allUsers.push(users[i]);
                
            }
            else{
                alert("Invalid Password");
                allUsers.push(users[i]);
                break;
            }
        }
        else
        {
        
            allUsers.push(users[i]);
        }
    }
    if(cnt==1)
    {
        localStorage.setItem("users",JSON.stringify(allUsers));
        window.location.href="frameUser.html";
    }
}
else
{
    alert("Invalid User");
}
}

}