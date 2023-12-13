let commentsApiData;
let postsApiData; 
let usersApiData; 
// FOR LOADER
const loader = () => {
    const loaderElement = document.querySelector(".loader");
    loaderElement.innerHTML = `
        <img src="https://media3.giphy.com/media/y1ZBcOGOOtlpC/200w.webp?cid=ecf05e47wv79fv56jk7z1hloyhr22zy55ancrc6rlnebruf7&ep=v1_gifs_search&rid=200w.webp&ct=g" alt="LoaderImage">
    `;
}

loader();

// ALERT MSG FOR PAGE RELOAD
window.onbeforeunload = function (){
    return "if you reload the page all details will cancelled!.."
}
function handlePageRelloadConfirmation(){
    let confirmation = confirm("if you reload the page, all detailed will be cancel . do you want to proceed?")
    if(!confirmation){
        e.preventDefault()
    }
}
window.addEventListener('beforeunload', handlePageRelloadConfirmation)

// DISPLAY USERS DATA IN TABLE 
const displayTableFunction = (successResponseUserAPI) => {
    successResponseUserAPI.forEach((element) => {
        let tableBody = document.querySelector("#tBody").innerHTML += `
        <tr>
            <th scope="row">${element.id}</th>
            <td>${element.name}</td>
            <td>${element.email}</td>
            <td>${element.address.city}</td>
            <td>${element.address.street}</td>
            <td>${element.phone}</td>
            <td>${element.website}</td>
            <td>${element.company.name}</td>
            
            <td id="lastTD">
                <button type="button" class="btn btn-primary seeAllPostBtn" id="seeAllPost" data-element='${JSON.stringify(element)}' onclick="seePosts(this)" disabled> 
                    See Posts
                </button>
            </td>

        </tr>`;
    });
  
}

// USERSDATA API
const usersApi = () => {
    return new Promise((resolve, reject) => {
        fetch("users.json")
            .then((data) => data.json())
            .then((successResponse) => {
                setTimeout(() => {
                    resolve(successResponse);
                }, 4000);
            })

            .catch((errorResponse) => {
                setTimeout(() => {
                    reject(errorResponse);
                }, 4000);
            });
           
    });
}
// POSTS DATA API
const postsApi = () => {
    return new Promise((resolve, reject) => {
        fetch("posts.json")
            .then((data) => data.json())
            .then((successResponse) => {
                setTimeout(() => {
                    resolve(successResponse);
                }, 4000);
            })
            .catch((errorResponse) => {
                setTimeout(() => {
                    reject(errorResponse);
                }, 4000);
            });
    });
}

// COMMENTS DATA API
const seeComments = () => {
    return new Promise((resolve, reject) => {
        fetch("comments.json")
            .then((data) => data.json())
            .then((successResponse) => {
                setTimeout(() => {
                    resolve(successResponse);
                }, 4000);
            })

            .catch((errorResponse) => {
                setTimeout(() => {
                    reject(errorResponse);
                }, 4000);
            });
           
    });
}

// CALLING ALL PROMISES
usersApi()
    .then((successResponseUserAPI) => {
        // localStorage.setItem("USER_API" , JSON.stringify(successResponseUserAPI))
        let table = document.querySelector(".tableContainer").classList.add("displaytable");
        let loader = document.querySelector(".loader").classList.add("hideLoader");
        usersApiData = successResponseUserAPI;
        displayTableFunction(usersApiData)
        return postsApi();
    })
    .then((successResponsePostAPI) => {
        // localStorage.setItem("POST_API" , JSON.stringify(successResponsePostAPI))
        let seeAllPost = document.querySelectorAll(".seeAllPostBtn");
        seeAllPost.forEach((element) => {
            element.disabled = false;
        })
        postsApiData = successResponsePostAPI;
        return seeComments();
       
    })
    .then((successResponseCommentsAPI) => {
        localStorage.setItem("COMMENTS_API" , JSON.stringify(successResponseCommentsAPI))
        commentsApiData = successResponseCommentsAPI
    })
    .catch((errorResponse) => {
        console.log(errorResponse);
    });

// SEE ALL POSTS FUNCTION
let seePosts = (button) => {
    let element = JSON.parse(button.getAttribute("data-element"));
    // location.href = 'seePosts.html?elementData=' + element
    // // // console.log(element.id);
    postsApiData.filter(ele => {

        if(ele.userId === element.id){
            let table = document.querySelector(".tableContainer").classList.remove("displaytable");
            let loader = document.querySelector(".loader").classList.remove("hideLoader");
          
            setTimeout(() => {
                let table = document.querySelector(".tableContainer").classList.add("displaytable");
                let tableCustom = document.querySelector(".tableCustom").classList.add("hideUsersdata");
                let loader = document.querySelector(".loader").classList.add("hideLoader");
                let postData = document.querySelector("#postData");
                postData.classList.add("showPostData")
                postData.innerHTML += `
                <tbody>
                    <tr>
                    <th scope="row">${ele.id}</th>
                    <td>${ele.title}</td>
                    <td class = 'align-top'>${ele.body}</td>
                    <td>
                        <button type="button" class="btn btn-primary seeAllPostBtn" postComments = '${JSON.stringify(ele)}' onclick = seeCommentsData(this)>
                            See Comments
                        </button>
                    </td>
                    </tr>
                </tbody>
                `
            },3000)
        }
    })
    
}
// SEE ALL COMMENTS FUNCTION
const seeCommentsData = (button) => {
    const postCommentsData = JSON.parse(button.getAttribute("postComments"));
    commentsApiData.filter((data) => {
        if(data.postId === postCommentsData.userId){
            let table = document.querySelector(".tableContainer").classList.remove("displaytable");
            let loader = document.querySelector(".loader").classList.remove("hideLoader");
          
            setTimeout(() => {
                let table = document.querySelector(".tableContainer").classList.add("displaytable");
                let tableCustom = document.querySelector("#postData").classList.add("hideUsersdata");
                let loader = document.querySelector(".loader").classList.add("hideLoader");
                let commentsData = document.querySelector("#commentsData");
                commentsData.classList.add("showCommentsData")
                commentsData.innerHTML += `
                <tbody>
                    <tr>
                    <th scope="row">${data.id}</th>
                    <td>${data.email}</td>
                    <td>${data.name}</td>
                    <td>${data.body}</td>
                    </tr>
                </tbody>
                `
            },3000)
        }
    })
}





