let fields = document.getElementsByClassName("Edit");
let edit_button = document.getElementById("begin-edit");
let done_button = document.getElementById("end-edit");
let cancel_button = document.getElementById("cancel");

// gross global variable but needed to save values
// at least for now

window.onload = () => {
    let url = 'http://Spoiledbeansapi-env.eba-mnv79iji.us-east-2.elasticbeanstalk.com/users';
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('spoiledBeans-token', window.localStorage.getItem('token'));
    let role = document.getElementById('role');


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
    console.log(backupArray);
})

done_button.addEventListener("click", function(){

    for(let i = 0; i < fields.length; i++){
        fields[i].readOnly = true;
        fields[i].style.backgroundColor = "white";
        fields[i].style.color = "black";
        backupArray[i] = fields[i].value;
        // console.log(backupArray[i]);

        // do something here to go to endpoint that updates database
        

    }

    console.log(backupArray);
})

cancel_button.addEventListener("click", function(){
    for(let i = 0; i < fields.length; i++){
        fields[i].value = backupArray[i];
        fields[i].style.backgroundColor = "white";
        fields[i].style.color = "black";
        fields[i].contentEditable = 'false';

    }
})

// function getBackup(){
//     let backupArray;
//     return function(){
//         if(backupArray.length == 0){
//             backupArray = new Array();
//         }
//         return backupArray;
//     };
// }
