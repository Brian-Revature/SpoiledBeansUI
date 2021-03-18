window.onload = () => {
    document.getElementById("login-button").addEventListener('click', grabUsername);
    document.getElementById("register-button").addEventListener('click', register);
}

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
            window.localStorage.setItem('token', response.headers.get("spoiledBeans-token"));
            if(response.status < 400 && response.status >= 200){
                redirect();
            }
    });
}

function redirect(){
    document.location.href="/SpoiledBeansUI/html/home.html";
}

function register(){
    window.location.href = "/SpoiledBeansUI/html/register.html";
}
