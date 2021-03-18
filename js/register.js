window.onload = () => {
    document.getElementById("register-button").addEventListener('click', registerUser);
}

function registerUser(){
    let url = 'http://Spoiledbeansapi-env.eba-mnv79iji.us-east-2.elasticbeanstalk.com/auth/registeruser';
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    let registerInfo = document.querySelectorAll("input");

    let newUser = {
        username: registerInfo.item(0).value,
        password: registerInfo.item(1).value,
        email: registerInfo.item(2).value
    };

    fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(newUser)
    })
        .then(response => {
            if(response.status < 400 && response.status >= 200){
                redirect();
            }else{
                window.alert("User already in use");
            }
        });
}

function redirect(){
    window.location.href = "../html/login.html";
}
