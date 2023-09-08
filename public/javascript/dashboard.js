// dashboard created with query selectors

var newUpload = document.querySelector('#newUpload')
var existingBlogs = document.querySelector("#existingblogs")
var createNew = document.querySelector("#createNew")
var newPost = document.querySelector("#newpost")

function hideCreateNew() {
    createNew.hidden=true;
}
// post event listener upon submit request
hideCreateNew();

newPost.addEventListener("submit",event=>{
    event.preventDefault()
    existingBlogs.hidden=true;
    newPost.hidden =true;
    createNew.hidden =false;
});
// If submit button is pressed, title and content will be returned
newUpload.addEventListener("submit", event => {
    var title = document.querySelector("#title").value;
    var content = document.querySelector("#content").value
    event.preventDefault()
    if (!title || !content) {
        alert(err)
        return;
    }
    const blogList = {
        title: title,
        content: content,
    }
    fetch("/api/blogs",{
        method:"POST",
        body:JSON.stringify(blogList),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            createNew.setAttribute("hidden", "false")
            location.reload()
        } else {
            alert(err)
        }
    })
})