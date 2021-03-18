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
            window.localStorage.setItem('token', response.headers.get("spoiledBeans-token"));

    })
        .then(() => redirect());
}

function redirect(){


        let url = 'http://Spoiledbeansapi-env.eba-mnv79iji.us-east-2.elasticbeanstalk.com/users';
        let url2 = 'http://Spoiledbeansapi-env.eba-mnv79iji.us-east-2.elasticbeanstalk.com/users/myfavorites';
        let url3 = 'http://Spoiledbeansapi-env.eba-mnv79iji.us-east-2.elasticbeanstalk.com/movies';
        let url4 = 'http://Spoiledbeansapi-env.eba-mnv79iji.us-east-2.elasticbeanstalk.com/reviews/myreviews';

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

//        fetch(url2, {
//                    method: 'GET',
//                    headers: headers
//                })
//                    .then(response => response.json())
//                    .then(result => {
//                        console.log('Success:', result);
//                });
//
//
//
//         fetch(url3, {
//                           method: 'GET',
//                           headers: headers
//                       })
//                           .then(response => response.json())
//                           .then(result => {
//                               console.log('Success:', result);
//                       });
//
//        fetch(url4, {
//                            method: 'GET',
//                            headers: headers
//                        })
//                            .then(response => response.json())
//                            .then(result => {
//                                console.log('Success:', result);
//                        });


        //document.getElementById("tH").click();
        //window.location.href-"..html/home.html";
        document.location.href="../html/home.html";

}