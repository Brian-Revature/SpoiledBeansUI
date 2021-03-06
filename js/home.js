
window.onload = () => {
    document.getElementById("profile-page-redirect").addEventListener('click', profilePage);
    getMovies();
}


function getMovies() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    //headers.append('spoiledBeans-token', window.localStorage.getItem('token'));

    let url = 'http://Spoiledbeansapi-env.eba-mnv79iji.us-east-2.elasticbeanstalk.com/movies';

     fetch(url, {
                method: 'GET',
                headers: headers
            })
                .then(response => response.json())
                .then(result => {
                    addMovie(result);
            });

}



function grabMovie(clicked_id){
    window.localStorage.setItem('movie', clicked_id);
}


function addMovie(data) {

        //Iteration over movies list
        data.forEach(element => {

        //Creating elements
        let row1 = document.createElement('tr')
        let moveLink = document.createElement('a');
        let cellGenre = document.createElement('td');
        let cellDirector = document.createElement('td');
        let cellYear = document.createElement('td');
        let cellSynopsis = document.createElement('td');

        //Anchor for movie name
        let movieAnchor = document.createElement('a')
        movieAnchor.href = './html/movie.html';
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


    });

}

function addNewMovie(){

    let url = 'http://Spoiledbeansapi-env.eba-mnv79iji.us-east-2.elasticbeanstalk.com/movies';
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('spoiledBeans-token', window.localStorage.getItem('token'));

    //Review data
    let movie = document.getElementById('movie').value;
    console.log("Did the review get got?: "+ movie);

    let movieObj = {

        name:movie

    };

    fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(movieObj)
    })
        .then(response => {
            console.log("Added movie");
            console.log(response);
            document.getElementById("movie-table-body").innerHTML="";
        })

        .then(() => getMovies());

}
document.getElementById("add-movie").addEventListener('click', addNewMovie);

function profilePage(){
    if(localStorage.getItem("token")){
        window.location.href = "./html/ProfilePage.html";
    }
}

