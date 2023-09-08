// upon signup request, user will be prompted to input a username/password

document.querySelector("#signup").addEventListener("submit",event=>{
    event.preventDefault();
    // .value will check if passsword mztches required length
    const userList = {
        username:document.querySelector("#signupUsername").value,
        password:document.querySelector("#signupPassword").value,
    }
   // other users in database will be displayed to dashboard upon signup/login
    fetch("/api/users/",{
        method:"POST",
        body:JSON.stringify(userList),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            location.href="/dashboard"
        } else {
            alert(err)
        }
    })
})