const fields = document.getElementsByClassName("Edit");
const edit_button = document.getElementById("begin-edit");
const done_button = document.getElementById("end-edit");
const cancel_button = document.getElementById("cancel");
const role = document.getElementById('userRole');
const reviews_button = document.getElementById('myReviews');
// gross global variable but needed to save values
// at least for now

window.onload = () => {
    let url = 'http://Spoiledbeansapi-env.eba-mnv79iji.us-east-2.elasticbeanstalk.com/users';
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('spoiledBeans-token', window.localStorage.getItem('token'));



    fetch(url,{
        method: 'GET',
        headers: headers
    })
    .then(Response => Response.json())
    .then(result => {
        for (const key in result) {
            if (result.hasOwnProperty.call(result, key)) {
                const element = result[key];
                console.log(element);
                if(key=="userRole"){
                    role.textContent = element;
                    continue;
                }
                if(key=="id"){
                    continue;
                }
                if(key==undefined){
                    element = "";
                }
                if(key == "password"){
                    continue;
                }
                fields[key].value = element;
                console.log(fields[key].value);
            }
        }
    })
}


let backupArray = new Array();
// add all the values into place holders?
edit_button.addEventListener("click", function(){
    for(let i = 0; i < fields.length; i++){
        fields[i].readOnly = false;
        fields[i].style.backgroundColor = "black";
        fields[i].style.color = "white";
        backupArray[i] = fields[i].value;
        // console.log(backupArray[i]);
    }
    //console.log(backupArray);
})

done_button.addEventListener("click", function(){

    for(let i = 0; i < fields.length; i++){
        fields[i].readOnly = true;
        backupArray[i] = fields[i].value;
        // console.log(backupArray[i]);
    }
        // do something here to go to endpoint that updates database
        let url = 'http://Spoiledbeansapi-env.eba-mnv79iji.us-east-2.elasticbeanstalk.com/users/update';
        let headers = new Headers();
    
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('spoiledBeans-token', window.localStorage.getItem('token'));    
        
        let userProfile = {
            username: backupArray[0],
            password: backupArray[1],
            email: backupArray[2],
            firstName: backupArray[3],
            lastName: backupArray[4],
            bio: backupArray[5],
            Role: role.textContent
        };
        // console.log("here is the user profile");
        // console.log(userProfile);
        fetch(url, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(userProfile)
        })
        .then(Response => {
            window.localStorage.setItem('token', Response.headers.get("spoiledBeans-token"));
        });
        //.then(() => redirect());

    //     console.log("printing out my backup array but might not get here");
    // console.log(backupArray);
})

cancel_button.addEventListener("click", function(){
    for(let i = 0; i < fields.length; i++){
        fields[i].value = backupArray[i];
        fields[i].style.backgroundColor = "white";
        fields[i].style.color = "black";
        fields[i].contentEditable = 'false';

    }
})



// function redirect(){
//     console.log("got to the redirect");
// }

// reviews_button.addEventListener("click", function(){
//     let url = 'http://Spoiledbeansapi-env.eba-mnv79iji.us-east-2.elasticbeanstalk.com/reviews/myreviews';
//     let headers = new Headers();
//     headers.append('Content-Type', 'application/json');
//     headers.append('Accept', 'application/json');
//     headers.append('spoiledBeans-token', window.localStorage.getItem('token'));    
    
//     fetch(url, {
//         method: 'GET',
//         headers: headers
//     })
//     .then()
// })
