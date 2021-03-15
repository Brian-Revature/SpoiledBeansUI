window.onload = () => {
    document.getElementById("login-button").addEventListener("click", grabUsername);
}

function grabUsername() {
    let url = 'http://Spoiledbeansapi-env.eba-mnv79iji.us-east-2.elasticbeanstalk.com/auth/login';
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    let loginInfo = document.querySelectorAll("input");
    console.log(loginInfo.item(0).value);
    console.log(loginInfo.item(1).value);

    let user = {
        username:loginInfo.item(0).value,
        password:loginInfo.item(1).value
    };

    fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
            redirect();
    });
}

function redirect(){
    let url = 'http://Spoiledbeansapi-env.eba-mnv79iji.us-east-2.elasticbeanstalk.com/users';
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    fetch('http://localhost:5000/users', {
        method: 'GET'
    })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
    });
}