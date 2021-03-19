let fields = document.getElementsByClassName("form-control");
let edit_button = document.getElementById("begin-edit");
let done_button = document.getElementById("end-edit");
let cancel_button = document.getElementById("cancel");
let nav_home = document.getElementById("home");
let add_movie = document.getElementById("add");
let delete_movie = document.getElementById("delete");

// gross global variable but needed to save values
// at least for now

window.onload = () => {
    getFavorites();
    getReviews();
    let url = 'http://Spoiledbeansapi-env.eba-mnv79iji.us-east-2.elasticbeanstalk.com/users';
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('spoiledBeans-token', window.localStorage.getItem('token'));
    let role = document.getElementById('userRole');


    fetch(url,{
        method: 'GET',
        headers: headers
    })
    .then(Response => Response.json())
    .then(result => {
        for (const key in result) {
            if (result.hasOwnProperty.call(result, key)) {
                let element = result[key];
                if(key=="userRole"){
                    role.textContent = element;
                    continue;
                }
                if(key=="password"){
                    continue;
                }
                if(key=="id"){
                    continue;
                }
                if(key==undefined){
                    element = "";
                }
                fields[key].value = element;
            }
        }
    })
}


let backupArray = new Array();
// add all the values into place holders?
edit_button.addEventListener("click", function(){
    for(let i = 0; i < fields.length; i++){
        fields[i].readOnly = false;
        fields[i].style.backgroundColor = "light-grey";
        fields[i].style.color = "black";
        backupArray[i] = fields[i].value;
        // console.log(backupArray[i]);
    }
    console.log(backupArray);
})

done_button.addEventListener("click", function(){

    for(let i = 0; i < fields.length; i++) {
        fields[i].readOnly = true;
        fields[i].style.backgroundColor = "white";
        fields[i].style.color = "black";
        backupArray[i] = fields[i].value;
        // console.log(backupArray[i]);
    }

    // do something here to go to endpoint that updates database
    let url = 'http://Spoiledbeansapi-env.eba-mnv79iji.us-east-2.elasticbeanstalk.com/users/update';
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('spoiledBeans-token', window.localStorage.getItem('token'));

    let user = {
        username: backupArray[0],
        password: backupArray[1],
        email: backupArray[2],
        firstName: backupArray[3],
        lastName: backupArray[4],
        bio: backupArray[5]
    };

    fetch(url,{
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(user)
    })
    .then(Response => Response.json());

    console.log(backupArray);
})

cancel_button.addEventListener("click", function(){
    for(let i = 0; i < fields.length; i++){
        fields[i].readOnly = true;
        // fields[i].value = backupArray[i];
        fields[i].style.backgroundColor = "white";
        fields[i].style.color = "black";
        // fields[i].contentEditable = 'false';

    }
})

nav_home.addEventListener('click', function(){
    window.location.href = "../index.html";
});

function getReviews(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('spoiledBeans-token', window.localStorage.getItem('token'));

    let url = 'http://Spoiledbeansapi-env.eba-mnv79iji.us-east-2.elasticbeanstalk.com/reviews/myreviews';

    fetch(url, {
        method: 'GET',
        headers: headers
    })
        .then(response => response.json())
        .then(result => {
            addReview(result);
        });
}

function addReview(data){

    let movieName = data.movies;
    let reviews = data.reviews;
    
    for(let i=0;i<reviews.length;i++){

        let row1 = document.createElement('tr')
        //User will be an anchor to user's profile
        let cellMovie = document.createElement('td');
        let cellRating = document.createElement('td');
        let cellReview = document.createElement('td');
        let cellReviewTime = document.createElement('td');

        // //Populating with values
        cellMovie.innerText = movieName[i].name;
        cellRating.innerText = reviews[i].rating;
        cellReview.innerText = reviews[i].review;
        cellReviewTime.innerText = reviews[i].reviewTime.substring(0,10);

        //Appending to html
        row1.appendChild(cellMovie);
        row1.appendChild(cellRating);
        row1.appendChild(cellReview);
        row1.appendChild(cellReviewTime);
        document.getElementById('review-table-body').appendChild(row1);

    }
}

function getFavorites(){

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('spoiledBeans-token', window.localStorage.getItem('token'));

    let url = 'http://Spoiledbeansapi-env.eba-mnv79iji.us-east-2.elasticbeanstalk.com/users/myfavorites';

    fetch(url, {
        method: 'GET',
        headers: headers
    })
        .then(response => response.json())
        .then(result => {
            addMovie(result);
        });

}

function addMovie(data){

    let favorites = data.favorites;
    for (let element of favorites) {
        //Creating elements
        let row1 = document.createElement('tr')
        let cellGenre = document.createElement('td');
        let cellDirector = document.createElement('td');
        let cellYear = document.createElement('td');
        let cellSynopsis = document.createElement('td');

        //Anchor for movie name
        let movieAnchor = document.createElement('a')
        movieAnchor.href = '../html/movie.html';
        movieAnchor.id = element.name;
        //Get name of clicked movie
        movieAnchor.addEventListener("click",() =>  grabMovie(event.srcElement.id));


        //Populating with values
        movieAnchor.innerText = element.name;
        cellDirector.innerText = element.director;
        cellGenre.innerText = element.genre;
        cellYear.innerText = element.year;
        cellSynopsis.innerText = element.synopsis;

        //Appending to html
        row1.appendChild(movieAnchor);
        row1.appendChild(cellGenre);
        row1.appendChild(cellDirector);
        row1.appendChild(cellYear);
        row1.appendChild(cellSynopsis);
        document.getElementById('movie-table-body').appendChild(row1);
    }

}
add_movie.addEventListener('click', function addMovieToFavorite(){

    let url = 'http://Spoiledbeansapi-env.eba-mnv79iji.us-east-2.elasticbeanstalk.com/users/addfavorite';
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('spoiledBeans-token', window.localStorage.getItem('token'));

    //Review data
    let movie = document.getElementById('add-movie-text').value;

    let movieObj = {
        name:movie
    };

    fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(movieObj)
    })
        .then(response => {
            document.getElementById("add-movie-text").value="";
            document.getElementById("movie-table-body").innerHTML="";
        })
        .then(() => getFavorites());
});

delete_movie.addEventListener('click', function () {
    let url = 'http://Spoiledbeansapi-env.eba-mnv79iji.us-east-2.elasticbeanstalk.com/users/deletefavorite';
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('spoiledBeans-token', window.localStorage.getItem('token'));

    //Review data
    let movie = document.getElementById('add-movie-text').value;

    let movieObj = {
        name:movie
    };

    fetch(url, {
        method: 'DELETE',
        headers: headers,
        body: JSON.stringify(movieObj)
    })
        .then(response => {
            document.getElementById("add-movie-text").value="";
            document.getElementById("movie-table-body").innerHTML="";
        })
        .then(() => getFavorites());
})

