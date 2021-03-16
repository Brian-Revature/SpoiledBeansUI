window.onload = () => {
    document.getElementById("login-button").addEventListener('click', grabUsername);
}

import {state} from './state.js';

function grabUsername() {

    let url = 'http://Spoiledbeansapi-env.eba-mnv79iji.us-east-2.elasticbeanstalk.com/auth/login';
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    let loginInfo = document.querySelectorAll("input");

    let user = {
        username:loginInfo.item(0).value,
        password:loginInfo.item(1).value
    };

    fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(user)
    })
        .then(response => {
            state.token = response.headers.get("spoiledBeans-token");
    })
        .then(() => redirect());
}

function redirect(){
    let url = 'http://Spoiledbeansapi-env.eba-mnv79iji.us-east-2.elasticbeanstalk.com/users';
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('spoiledBeans-token', state.token);

    fetch(url, {
        method: 'GET',
        headers: headers
    })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
    });
}