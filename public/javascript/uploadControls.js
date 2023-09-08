// upon update request, user will get content

document.querySelector("#update").addEventListener("click",event=>{
    event.preventDefault();
    const blogId = document.querySelector("#hiddenUploadId").value;
    const editUpload = {
        title:document.querySelector("#editedTitle").value,
        content:document.querySelector("#editedContent").value,
    }
   // PUT method allows upload to be edited with new input
    fetch((`/api/blogs/${blogId}`),{
        method:"PUT",
        body:JSON.stringify(editUpload),
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
// upon delete request, post will use delete method to be removed from dashboard
document.querySelector("#delete").addEventListener("click",event=>{
    event.preventDefault();
    const blogId = document.querySelector("#hiddenUploadId").value;
    fetch((`/api/blogs/${blogId}`),{
        method:"DELETE",
    }).then(res=>{
        if(res.ok){
            location.href="/dashboard"
        } else {
            alert(err)
        }
    })
})