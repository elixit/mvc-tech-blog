// login page searches existing user database upon login request

document.querySelector("#login").addEventListener("submit",event=>{
    event.preventDefault();
    const userList = {
        username:document.querySelector("#loginUsername").value,
        password:document.querySelector("#loginPassword").value,
    }
    // if login request matches database, previous session's content will be posted 
    fetch("/api/users/login",{
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